import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";

export const TASK_STATUSES = ["todo", "in_progress", "in_review", "done", "blocked"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export const TASK_PRIORITIES = ["low", "medium", "high"] as const;
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export const TASK_AREAS = ["mobile", "backend", "website", "design", "ops", "general"] as const;
export type TaskArea = (typeof TASK_AREAS)[number];

export const USER_ROLES = ["admin", "member", "helper-bot"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const ACTIVITY_KINDS = [
  "created",
  "status_changed",
  "assigned",
  "edited",
  "deleted",
  "restored",
] as const;
export type ActivityKind = (typeof ACTIVITY_KINDS)[number];

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  imageUrl: text("image_url"),
  role: text("role", { enum: USER_ROLES }).notNull().default("member"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  lastSeenAt: integer("last_seen_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const tasks = sqliteTable(
  "tasks",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull().default(""),
    status: text("status", { enum: TASK_STATUSES }).notNull().default("todo"),
    priority: text("priority", { enum: TASK_PRIORITIES }).notNull().default("medium"),
    area: text("area", { enum: TASK_AREAS }).notNull().default("general"),
    assigneeId: text("assignee_id").references(() => users.id, { onDelete: "set null" }),
    createdById: text("created_by_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    position: integer("position").notNull().default(0),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    deletedAt: integer("deleted_at", { mode: "timestamp" }),
  },
  (table) => ({
    statusIdx: index("tasks_status_idx").on(table.status, table.deletedAt),
    assigneeIdx: index("tasks_assignee_idx").on(table.assigneeId),
    areaIdx: index("tasks_area_idx").on(table.area),
  }),
);

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;

export const taskActivity = sqliteTable(
  "task_activity",
  {
    id: text("id").primaryKey(),
    taskId: text("task_id")
      .notNull()
      .references(() => tasks.id, { onDelete: "cascade" }),
    actorId: text("actor_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    kind: text("kind", { enum: ACTIVITY_KINDS }).notNull(),
    meta: text("meta", { mode: "json" }).$type<Record<string, unknown>>(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => ({
    taskIdx: index("activity_task_idx").on(table.taskId, table.createdAt),
  }),
);

export type TaskActivity = typeof taskActivity.$inferSelect;
export type NewTaskActivity = typeof taskActivity.$inferInsert;

export const allowedEmails = sqliteTable("allowed_emails", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  invitedBy: text("invited_by")
    .notNull()
    .references(() => users.id, { onDelete: "set null" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export type AllowedEmail = typeof allowedEmails.$inferSelect;
export type NewAllowedEmail = typeof allowedEmails.$inferInsert;
