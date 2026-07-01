import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, users, type UserRole } from "@/lib/db";
import { verifyIdToken } from "@/lib/firebase/admin";
import { isAllowed, writeSession } from "@/lib/session";

export async function POST(req: Request) {
  let body: { idToken?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const idToken = body.idToken;
  if (!idToken) {
    return NextResponse.json({ error: "Missing idToken." }, { status: 400 });
  }

  let decoded;
  try {
    decoded = await verifyIdToken(idToken);
  } catch (err) {
    console.error("verifyIdToken failed:", err);
    return NextResponse.json({ error: "Invalid token." }, { status: 401 });
  }

  const email = decoded.email?.toLowerCase();
  if (!email) {
    return NextResponse.json({ error: "Token has no email." }, { status: 400 });
  }
  if (!isAllowed(email)) {
    return NextResponse.json(
      { error: "This email is not on the portal allowlist." },
      { status: 403 },
    );
  }

  const name = decoded.name ?? email.split("@")[0];
  const imageUrl = decoded.picture ?? null;

  const existing = await db.select().from(users).where(eq(users.id, decoded.uid)).get();

  let role: UserRole;
  if (existing) {
    role = existing.role;
    await db
      .update(users)
      .set({ email, name, imageUrl, lastSeenAt: new Date() })
      .where(eq(users.id, decoded.uid))
      .run();
  } else {
    const userCount = await db.$count(users);
    role = userCount === 0 ? "admin" : "member";
    await db
      .insert(users)
      .values({ id: decoded.uid, email, name, imageUrl, role })
      .run();
  }

  await writeSession({ uid: decoded.uid, email, name, imageUrl, role });

  return NextResponse.json({ ok: true });
}
