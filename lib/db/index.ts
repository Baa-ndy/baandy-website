import { createClient, type Client } from "@libsql/client";
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";
import * as schema from "./schema";

let cachedClient: Client | null = null;
let cachedDb: LibSQLDatabase<typeof schema> | null = null;

function getClient(): Client {
  if (cachedClient) return cachedClient;
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!url) {
    throw new Error(
      "TURSO_DATABASE_URL is not set. Provision a Turso DB and add the URL to .env.local.",
    );
  }
  cachedClient = createClient({ url, authToken });
  return cachedClient;
}

export const db = new Proxy({} as LibSQLDatabase<typeof schema>, {
  get(_target, prop) {
    if (!cachedDb) cachedDb = drizzle(getClient(), { schema });
    return Reflect.get(cachedDb, prop, cachedDb);
  },
});

export { schema };
export * from "./schema";
