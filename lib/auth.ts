import "server-only";
import { redirect } from "next/navigation";
import { readSession, type SessionData } from "@/lib/session";

export async function requireUser(): Promise<SessionData> {
  const session = await readSession();
  if (!session) redirect("/signin");
  return session;
}

export async function getCurrentUser(): Promise<SessionData | null> {
  return readSession();
}
