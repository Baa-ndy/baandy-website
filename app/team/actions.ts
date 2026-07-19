"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { db, users, allowedEmails } from "@/lib/db";
import { requireUser } from "@/lib/auth";

export type ActionResult<T = unknown> =
  | { ok: true; data: T }
  | { ok: false; error: string };

const inviteUserSchema = z.object({
  email: z.string().email("Valid email required.").toLowerCase(),
  role: z.enum(["member", "admin"]).default("admin"),
});

export async function inviteUser(input: unknown): Promise<ActionResult> {
  const user = await requireUser();
  if (user.role !== "admin") {
    return { ok: false, error: "Only admins can invite users." };
  }

  const parsed = inviteUserSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const email = parsed.data.email.toLowerCase();

  const existing = await db
    .select()
    .from(allowedEmails)
    .where(eq(allowedEmails.email, email))
    .get();

  if (existing) {
    return { ok: false, error: "This email has already been invited." };
  }

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .get();

  if (existingUser) {
    return { ok: false, error: "This email is already a member." };
  }

  await db
    .insert(allowedEmails)
    .values({
      id: randomUUID(),
      email,
      invitedBy: user.uid,
    })
    .run();

  revalidatePath("/team");
  return { ok: true, data: null };
}

const editUserSchema = z.object({
  userId: z.string(),
  name: z.string().min(1).max(200).optional(),
  role: z.enum(["member", "admin"]).optional(),
});

export async function editUser(input: unknown): Promise<ActionResult> {
  const user = await requireUser();




  const parsed = editUserSchema.safeParse(input);
  if (!parsed.success) { 

    console.log("Validation failed:", parsed.error.issues);
    return { ok: false, error: "Invalid input." };
  }

  const { userId, ...changes } = parsed.data;

  const existing = await db.select().from(users).where(eq(users.id, userId)).get();
  if (!existing) {
    return { ok: false, error: "User not found." };
  }

  if (Object.keys(changes).length === 0) {
    return { ok: true, data: null };
  }

  await db
    .update(users)
    .set({ ...changes })
    .where(eq(users.id, userId))
    .run();

  revalidatePath("/team");
  return { ok: true, data: null };
}
