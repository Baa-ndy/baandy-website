"use client";

import { TaskCard } from "./TaskCard";
import type { TaskStatus, User } from "@/lib/db";
import type { TaskWithPeople } from "../queries";

type Member = Pick<User, "id" | "name" | "email" | "imageUrl">;

type Props = {
  status: TaskStatus;
  label: string;
  tasks: TaskWithPeople[];
  members: Member[];
};

export function Column({ status, label, tasks, members }: Props) {
  return (
    <div className="flex flex-col rounded-lg border border-ink/10 bg-paper-warm/50">
      <div className="flex items-baseline justify-between px-4 pt-4 pb-3">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">{label}</h2>
        <span className="text-xs text-ink/40">{tasks.length}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 px-3 pb-3">
        {tasks.length === 0 ? (
          <div className="rounded-md border border-dashed border-ink/15 px-3 py-6 text-center text-xs text-ink/40">
            Nothing here
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} members={members} columnStatus={status} />
          ))
        )}
      </div>
    </div>
  );
}
