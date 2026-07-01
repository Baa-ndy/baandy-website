"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import type { TaskStatus, User } from "@/lib/db";
import type { TaskWithPeople } from "../queries";
import { Column } from "./Column";
import { TaskCard } from "./TaskCard";
import { NewTaskModal } from "./NewTaskModal";
import { FilterBar, type Filters } from "./FilterBar";

type Member = Pick<User, "id" | "name" | "email" | "imageUrl">;

type Props = {
  columns: { status: TaskStatus; tasks: TaskWithPeople[] }[];
  blocked: TaskWithPeople[];
  members: Member[];
};

const STATUS_LABEL: Record<TaskStatus, string> = {
  todo: "To do",
  in_progress: "In progress",
  in_review: "In review",
  done: "Done",
  blocked: "Blocked",
};

export function Board({ columns, blocked, members }: Props) {
  const [filters, setFilters] = useState<Filters>({ assigneeId: null, area: null });
  const [createOpen, setCreateOpen] = useState(false);

  const filtered = useMemo(() => {
    return columns.map((col) => ({
      ...col,
      tasks: col.tasks.filter((t) => {
        if (filters.assigneeId && t.assigneeId !== filters.assigneeId) return false;
        if (filters.area && t.area !== filters.area) return false;
        return true;
      }),
    }));
  }, [columns, filters]);

  const filteredBlocked = useMemo(() => {
    return blocked.filter((t) => {
      if (filters.assigneeId && t.assigneeId !== filters.assigneeId) return false;
      if (filters.area && t.area !== filters.area) return false;
      return true;
    });
  }, [blocked, filters]);

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <FilterBar filters={filters} onChange={setFilters} members={members} />
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-medium text-paper transition hover:bg-brand-deep"
        >
          <Plus className="h-4 w-4" /> New task
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {filtered.map((col) => (
          <Column
            key={col.status}
            status={col.status}
            label={STATUS_LABEL[col.status]}
            tasks={col.tasks}
            members={members}
          />
        ))}
      </div>

      {filteredBlocked.length > 0 ? (
        <div className="mt-10">
          <div className="mb-3 flex items-baseline gap-3">
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-pink-deep">
              {STATUS_LABEL.blocked}
            </h2>
            <span className="text-xs text-ink/40">{filteredBlocked.length}</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBlocked.map((task) => (
              <TaskCard key={task.id} task={task} members={members} />
            ))}
          </div>
        </div>
      ) : null}

      <NewTaskModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        members={members}
      />
    </>
  );
}
