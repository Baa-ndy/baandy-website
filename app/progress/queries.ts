import "server-only";
import { and, asc, eq, isNull, or } from "drizzle-orm";
import { db, tasks, users, taskActivity, type Task, type User } from "@/lib/db";

export type TaskWithPeople = Task & {
  assignee: Pick<User, "id" | "name" | "imageUrl"> | null;
  createdBy: Pick<User, "id" | "name" | "imageUrl">;
};

export async function getActiveTasks(): Promise<TaskWithPeople[]> {
  const assignee = { id: users.id, name: users.name, imageUrl: users.imageUrl };
  const rows = await db
    .select({
      task: tasks,
      assignee,
    })
    .from(tasks)
    .leftJoin(users, eq(tasks.assigneeId, users.id))
    .where(isNull(tasks.deletedAt))
    .orderBy(asc(tasks.position), asc(tasks.createdAt))
    .all();

  if (rows.length === 0) return [];

  const creatorIds = Array.from(new Set(rows.map((r) => r.task.createdById)));
  const creators = await db
    .select({ id: users.id, name: users.name, imageUrl: users.imageUrl })
    .from(users)
    .where(or(...creatorIds.map((id) => eq(users.id, id))))
    .all();

  const creatorMap = new Map(creators.map((c) => [c.id, c]));

  return rows.map((row) => ({
    ...row.task,
    assignee: row.assignee && row.assignee.id ? row.assignee : null,
    createdBy:
      creatorMap.get(row.task.createdById) ??
      { id: row.task.createdById, name: "Unknown", imageUrl: null },
  }));
}

export async function getTeamMembers(): Promise<Pick<User, "id" | "name" | "email" | "imageUrl">[]> {
  return db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      imageUrl: users.imageUrl,
    })
    .from(users)
    .orderBy(asc(users.name))
    .all();
}

export async function getTaskActivity(taskId: string) {
  return db
    .select({
      activity: taskActivity,
      actor: { id: users.id, name: users.name, imageUrl: users.imageUrl },
    })
    .from(taskActivity)
    .innerJoin(users, eq(taskActivity.actorId, users.id))
    .where(eq(taskActivity.taskId, taskId))
    .orderBy(asc(taskActivity.createdAt))
    .all();
}

export async function getTaskById(id: string): Promise<TaskWithPeople | null> {
  const row = await db
    .select({
      task: tasks,
      assignee: { id: users.id, name: users.name, imageUrl: users.imageUrl },
    })
    .from(tasks)
    .leftJoin(users, eq(tasks.assigneeId, users.id))
    .where(and(eq(tasks.id, id), isNull(tasks.deletedAt)))
    .get();

  if (!row) return null;

  const creator = await db
    .select({ id: users.id, name: users.name, imageUrl: users.imageUrl })
    .from(users)
    .where(eq(users.id, row.task.createdById))
    .get();

  return {
    ...row.task,
    assignee: row.assignee && row.assignee.id ? row.assignee : null,
    createdBy: creator ?? { id: row.task.createdById, name: "Unknown", imageUrl: null },
  };
}
