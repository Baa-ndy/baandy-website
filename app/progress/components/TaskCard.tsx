"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import { TASK_STATUSES, type TaskStatus, type User } from "@/lib/db";
import type { TaskWithPeople } from "../queries";
import { updateTaskStatus } from "../actions";
import { TaskDetailModal } from "./TaskDetailModal";
import { AreaBadge } from "./AreaBadge";
import { PriorityLabel } from "./PriorityLabel";

type Member = Pick<User, "id" | "name" | "email" | "imageUrl">;

type Props = {
  task: TaskWithPeople;
  members: Member[];
  columnStatus?: TaskStatus;
};

const STATUS_LABEL: Record<TaskStatus, string> = {
  todo: "To do",
  in_progress: "In progress",
  in_review: "In review",
  done: "Done",
  blocked: "Blocked",
};

export function TaskCard({ task, members, columnStatus }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isBlocked = task.status === "blocked";

  function move(next: TaskStatus) {
    setMenuOpen(false);
    if (next === task.status) return;
    startTransition(async () => {
      const result = await updateTaskStatus({ taskId: task.id, status: next });
      if (result.ok) router.refresh();
    });
  }

  return (
    <>
      <article
        className={clsx(
          "group relative cursor-pointer rounded-md border border-ink/5 bg-paper px-3 py-3 text-left text-sm shadow-sm transition hover:bg-paper-warm/40",
          isPending && "opacity-60",
          isBlocked && "border-pink-deep/30 bg-pink/10",
        )}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="block w-full text-left"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="flex-1 font-medium leading-snug text-ink">{task.title}</p>
            <PriorityLabel priority={task.priority} />
          </div>

          {task.description ? (
            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-ink/55">
              {task.description}
            </p>
          ) : null}

          <div className="mt-3 flex items-center justify-between gap-2">
            <AreaBadge area={task.area} />
            {task.assignee ? (
              task.assignee.imageUrl ? (
                <img
                  src={task.assignee.imageUrl}
                  alt={task.assignee.name}
                  title={task.assignee.name}
                  className="h-5 w-5 rounded-full object-cover ring-1 ring-ink/5"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-medium text-paper"
                  title={task.assignee.name}
                >
                  {task.assignee.name.charAt(0).toUpperCase()}
                </div>
              )
            ) : (
              <span className="text-[10px] text-ink/40">Unassigned</span>
            )}
          </div>
        </button>

        <div className="mt-2 flex items-center justify-end">
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-ink/50 hover:bg-ink/5 hover:text-ink"
            >
              {columnStatus ? STATUS_LABEL[columnStatus] : STATUS_LABEL[task.status]}
              <ChevronDown className="h-3 w-3" />
            </button>
            {menuOpen ? (
              <div className="absolute right-0 z-10 mt-1 w-36 rounded-md border border-ink/5 bg-paper py-1 shadow-lg">
                {TASK_STATUSES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => move(s)}
                    className={clsx(
                      "block w-full px-3 py-1.5 text-left text-xs text-ink/80 hover:bg-ink/5",
                      s === task.status && "font-medium text-brand",
                    )}
                  >
                    {STATUS_LABEL[s]}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </article>

      {open ? (
        <TaskDetailModal
          task={task}
          members={members}
          onClose={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      ) : null}
    </>
  );
}
