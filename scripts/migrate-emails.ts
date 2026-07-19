import "dotenv/config";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import * as schema from "@/lib/db/schema";

const url = 'libsql://baandy-portal-selam-kd.aws-eu-west-1.turso.io';
const authToken = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODI3NDUyMzcsImlkIjoiMDE5ZjEzYzgtZjgwMS03NDk0LWEwYWItZmZmOTM4YmY1MWRiIiwia2lkIjoiaUkwWFpRRjNGRlVrM1ZXWi1kX0diNmhLTzVYU0ZYY3JNSkRiUDhIbFdoayIsInJpZCI6ImVlMTkxMmU0LWY0NzQtNGFiYy1hYTkwLTY5Nzg2MGI5NzRjYSJ9.udWOTw1SSi2te-ZyIBPQU0jYBoWGvHqe2BYLs6jgGz8GUxsqqlb01d8xqwAcAZLlYefiIGDEsNmVAHj4lQeZAw'


const ALLOWED_EMAILS='selam.kd.dev@gmail.com,philippe@baandy.co.uk,jesse@baandy.co.uk,marija.skramic@homeservefinance.com'

if (!url) {
  throw new Error("TURSO_DATABASE_URL is required");
}

const client = createClient({ url, authToken });
const db = drizzle(client, { schema });

function getAllowedEmails(): string[] {
  const raw = ALLOWED_EMAILS;
  if (!raw) return [];
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

async function migrateEmails() {
  const emails = getAllowedEmails();
  if (emails.length === 0) {
    console.log("No emails in ALLOWED_EMAILS env var to migrate");
    return;
  }

  console.log(`Migrating ${emails.length} emails from ALLOWED_EMAILS...`);

  for (const email of emails) {
    const existing = await db
      .select()
      .from(schema.allowedEmails)
      .where(eq(schema.allowedEmails.email, email))
      .get();

    if (existing) {
      console.log(`✓ ${email} already in allowlist`);
      continue;
    }

    const firstAdmin = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.role, "admin"))
      .get();

    const invitedBy = firstAdmin?.id || "system";

    await db
      .insert(schema.allowedEmails)
      .values({
        id: randomUUID(),
        email,
        invitedBy,
      })
      .run();

    console.log(`✓ Added ${email} to allowlist`);
  }

  console.log("Migration complete!");
}

migrateEmails().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
