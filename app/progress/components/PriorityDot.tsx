import clsx from "clsx";
import type { TaskPriority } from "@/lib/db";

const STYLE: Record<TaskPriority, { dot: string; label: string }> = {
  low: { dot: "bg-ink/30", label: "Low priority" },
  medium: { dot: "bg-brand/70", label: "Medium priority" },
  high: { dot: "bg-pink-deep", label: "High priority" },
};

export function PriorityDot({ priority }: { priority: TaskPriority }) {
  const { dot, label } = STYLE[priority];
  return (
    <span
      title={label}
      className={clsx("mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full", dot)}
      aria-label={label}
    />
  );
}
