import "server-only";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

let adminApp: App | null = null;

function getServiceAccount() {
  const raw = process.env.FIREBASE_ADMIN_CREDENTIALS;
  if (!raw) {
    throw new Error("FIREBASE_ADMIN_CREDENTIALS is not set.");
  }
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error("FIREBASE_ADMIN_CREDENTIALS is not valid JSON.");
  }
}

export function getAdminApp(): App {
  if (adminApp) return adminApp;
  const existing = getApps().find((a) => a.name === "baandy-portal");
  if (existing) {
    adminApp = existing;
    return adminApp;
  }
  adminApp = initializeApp({ credential: cert(getServiceAccount()) }, "baandy-portal");
  return adminApp;
}

export async function verifyIdToken(idToken: string) {
  return getAuth(getAdminApp()).verifyIdToken(idToken, true);
}
