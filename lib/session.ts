import "server-only";
import { cookies } from "next/headers";
import { getIronSession, type SessionOptions } from "iron-session";
import type { UserRole } from "@/lib/db/schema";

export type SessionData = {
  uid: string;
  email: string;
  name: string;
  imageUrl: string | null;
  role: UserRole;
};

const cookieName = "baandy_portal_session";

function getSessionOptions(): SessionOptions {
  const password = process.env.NEXT_SESSION_SECRET;

  if (!password || password.length < 32) {
    throw new Error("SESSION_SECRET must be set and at least 32 characters.");
  }
  return {
    password,
    cookieName,
    cookieOptions: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    },
  };
}

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<Partial<SessionData>>(cookieStore, getSessionOptions());
}

export async function readSession(): Promise<SessionData | null> {
  const session = await getSession();
  if (!session.uid) return null;
  return session as SessionData;
}

export async function writeSession(data: SessionData): Promise<void> {
  const session = await getSession();
  session.uid = data.uid;
  session.email = data.email;
  session.name = data.name;
  session.imageUrl = data.imageUrl;
  session.role = data.role;
  await session.save();
}

export async function destroySession(): Promise<void> {
  const session = await getSession();
  session.destroy();
}

export function getAllowedEmails(): string[] {
  const raw = process.env.ALLOWED_EMAILS;
  if (!raw) return [];
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAllowed(email: string): boolean {
  return getAllowedEmails().includes(email.toLowerCase());
}
