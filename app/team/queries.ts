import { db, users, type User } from "@/lib/db";
import { asc, eq } from "drizzle-orm";

export async function getTeamMembersCall(): Promise<User[]> {
 const teamMembers = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        imageUrl: users.imageUrl,
        role: users.role,
      createdAt: users.createdAt,
      lastSeenAt: users.lastSeenAt,

      })
      .from(users)
      .orderBy(asc(users.name))
      .all();
  
    
  
      return teamMembers;
  

  


}
export async function getUserById(id: string): Promise<User | undefined> {

  return db.query.users.findFirst({
    where: (users) => eq(users.id, id),
  });

}
