"use client";

import { TASK_AREAS, type TaskArea, type User } from "@/lib/db";
import clsx from "clsx";
import { FormSelect } from "@/components/ui/CustomInlineSelect";

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
    <div className="flex flex-wrap items-center gap-4">
      <div className="w-48">
        <FormSelect
          value={filters.assigneeId ?? ""}
          onChange={(v) =>
            onChange({ ...filters, assigneeId: v === "" ? null : v })
          }
          options={[
            { value: "", label: "All assignees" },
            ...members.map((m) => ({ value: m.id, label: m.name })),
          ]}
        />
      </div>

      <div className="flex flex-wrap items-center gap-1">
        <button
          type="button"
          onClick={() => onChange({ ...filters, area: null })}
          className={clsx(
            "rounded-sm px-2 py-1 font-mono text-[10px] uppercase tracking-wider",
            filters.area === null ? "bg-pink text-ink" : "bg-ink/5 text-ink/60 hover:bg-ink/10",
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
                ? "bg-pink text-ink"
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
