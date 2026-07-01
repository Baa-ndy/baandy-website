"use client";

import { TASK_AREAS, type TaskArea, type User } from "@/lib/db";
import clsx from "clsx";

type Member = Pick<User, "id" | "name" | "email" | "imageUrl">;

export type Filters = {
  assigneeId: string | null;
  area: TaskArea | null;
};

const AREA_LABEL: Record<TaskArea, string> = {
  mobile: "Mobile",
  backend: "Backend",
  website: "Website",
  design: "Design",
  ops: "Ops",
  general: "General",
};

export function FilterBar({
  filters,
  onChange,
  members,
}: {
  filters: Filters;
  onChange: (filters: Filters) => void;
  members: Member[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={filters.assigneeId ?? ""}
        onChange={(e) =>
          onChange({ ...filters, assigneeId: e.target.value === "" ? null : e.target.value })
        }
        className="rounded-md border border-ink/15 bg-paper px-3 py-1.5 text-sm text-ink"
      >
        <option value="">All assignees</option>
        {members.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>

      <div className="flex flex-wrap items-center gap-1">
        <button
          type="button"
          onClick={() => onChange({ ...filters, area: null })}
          className={clsx(
            "rounded-sm px-2 py-1 font-mono text-[10px] uppercase tracking-wider",
            filters.area === null ? "bg-ink text-paper" : "bg-ink/5 text-ink/60 hover:bg-ink/10",
          )}
        >
          All
        </button>
        {TASK_AREAS.map((area) => (
          <button
            key={area}
            type="button"
            onClick={() => onChange({ ...filters, area })}
            className={clsx(
              "rounded-sm px-2 py-1 font-mono text-[10px] uppercase tracking-wider",
              filters.area === area
                ? "bg-ink text-paper"
                : "bg-ink/5 text-ink/60 hover:bg-ink/10",
            )}
          >
            {AREA_LABEL[area]}
          </button>
        ))}
      </div>
    </div>
  );
}
