"use client";

import type { User } from "@/lib/db";
import { UserCard } from "./UserCard";

type Props = {
  members: User[];
};

export function TeamMembersList({ members }: Props) {
  if (members.length === 0) {
    return (
      <div className="rounded-lg border border-ink/10 bg-paper p-12 text-center">
        <p className="text-sm text-ink/50">No team members yet. Invite someone to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {members.filter((member) => member.role !== "helper-bot").map((member) => (
        <UserCard key={member.id} user={member} />
      ))}
    </div>
  );
}
