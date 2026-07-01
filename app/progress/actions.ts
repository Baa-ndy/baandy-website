"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import {
  db,
  tasks,
  taskActivity,
  TASK_STATUSES,
  TASK_PRIORITIES,
  TASK_AREAS,
  type TaskStatus,
} from "@/lib/db";
import { requireUser } from "@/lib/auth";

const createTaskSchema = z.object({
  title: z.string().min(1, "Title required.").max(200),
  description: z.string().max(10000).default(""),
  status: z.enum(TASK_STATUSES).default("todo"),
  priority: z.enum(TASK_PRIORITIES).default("medium"),
  area: z.enum(TASK_AREAS).default("general"),
  assigneeId: z.string().nullable().default(null),
});

export type ActionResult<T = unknown> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export async function createTask(input: unknown): Promise<ActionResult<{ id: string }>> {
  const user = await requireUser();
  const parsed = createTaskSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const id = randomUUID();
  const data = parsed.data;

  await db
    .insert(tasks)
    .values({
      id,
      title: data.title.trim(),
      description: data.description,
      status: data.status,
      priority: data.priority,
      area: data.area,
      assigneeId: data.assigneeId,
      createdById: user.uid,
    })
    .run();

  await db
    .insert(taskActivity)
    .values({
      id: randomUUID(),
      taskId: id,
      actorId: user.uid,
      kind: "created",
      meta: { title: data.title, status: data.status },
    })
    .run();

  revalidatePath("/progress");
  return { ok: true, data: { id } };
}

const updateStatusSchema = z.object({
  taskId: z.string().uuid(),
  status: z.enum(TASK_STATUSES),
});

export async function updateTaskStatus(input: unknown): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = updateStatusSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid input." };
  }

  const existing = await db.select().from(tasks).where(eq(tasks.id, parsed.data.taskId)).get();
  if (!existing || existing.deletedAt) {
    return { ok: false, error: "Task not found." };
  }
  if (existing.status === parsed.data.status) {
    return { ok: true, data: null };
  }

  await db
    .update(tasks)
    .set({ status: parsed.data.status, updatedAt: new Date() })
    .where(eq(tasks.id, parsed.data.taskId))
    .run();

  await db
    .insert(taskActivity)
    .values({
      id: randomUUID(),
      taskId: parsed.data.taskId,
      actorId: user.uid,
      kind: "status_changed",
      meta: { from: existing.status as TaskStatus, to: parsed.data.status },
    })
    .run();

  revalidatePath("/progress");
  revalidatePath(`/progress/${parsed.data.taskId}`);
  return { ok: true, data: null };
}

const editTaskSchema = z.object({
  taskId: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(10000).optional(),
  priority: z.enum(TASK_PRIORITIES).optional(),
  area: z.enum(TASK_AREAS).optional(),
  assigneeId: z.string().nullable().optional(),
});

export async function editTask(input: unknown): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = editTaskSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid input." };
  }
  const { taskId, ...changes } = parsed.data;

  const existing = await db.select().from(tasks).where(eq(tasks.id, taskId)).get();
  if (!existing || existing.deletedAt) {
    return { ok: false, error: "Task not found." };
  }

  const diff: Record<string, { from: unknown; to: unknown }> = {};
  for (const [key, value] of Object.entries(changes)) {
    if (value === undefined) continue;
    const before = (existing as Record<string, unknown>)[key];
    if (before !== value) diff[key] = { from: before, to: value };
  }
  if (Object.keys(diff).length === 0) {
    return { ok: true, data: null };
  }

  await db
    .update(tasks)
    .set({ ...changes, updatedAt: new Date() })
    .where(eq(tasks.id, taskId))
    .run();

  await db
    .insert(taskActivity)
    .values({
      id: randomUUID(),
      taskId,
      actorId: user.uid,
      kind: Object.prototype.hasOwnProperty.call(diff, "assigneeId") ? "assigned" : "edited",
      meta: diff,
    })
    .run();

  revalidatePath("/progress");
  revalidatePath(`/progress/${taskId}`);
  return { ok: true, data: null };
}

const taskIdSchema = z.object({ taskId: z.string().uuid() });

export async function deleteTask(input: unknown): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = taskIdSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid input." };
  }

  const existing = await db.select().from(tasks).where(eq(tasks.id, parsed.data.taskId)).get();
  if (!existing) return { ok: false, error: "Task not found." };
  if (existing.deletedAt) return { ok: true, data: null };

  await db
    .update(tasks)
    .set({ deletedAt: new Date(), updatedAt: new Date() })
    .where(eq(tasks.id, parsed.data.taskId))
    .run();

  await db
    .insert(taskActivity)
    .values({
      id: randomUUID(),
      taskId: parsed.data.taskId,
      actorId: user.uid,
      kind: "deleted",
    })
    .run();

  revalidatePath("/progress");
  return { ok: true, data: null };
}

export async function restoreTask(input: unknown): Promise<ActionResult> {
  const user = await requireUser();
  if (user.role !== "admin") {
    return { ok: false, error: "Only admins can restore deleted tasks." };
  }
  const parsed = taskIdSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid input." };
  }

  await db
    .update(tasks)
    .set({ deletedAt: null, updatedAt: new Date() })
    .where(eq(tasks.id, parsed.data.taskId))
    .run();

  await db
    .insert(taskActivity)
    .values({
      id: randomUUID(),
      taskId: parsed.data.taskId,
      actorId: user.uid,
      kind: "restored",
    })
    .run();

  revalidatePath("/progress");
  return { ok: true, data: null };
}
