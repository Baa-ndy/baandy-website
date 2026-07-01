import clsx from "clsx";
import type { TaskPriority } from "@/lib/db";

const STYLE: Record<TaskPriority, { className: string; label: string }> = {
  low: { className: "text-ink/35", label: "Low" },
  medium: { className: "text-ink/50", label: "Med" },
  high: { className: "text-pink-deep", label: "High" },
};

export function PriorityLabel({ priority }: { priority: TaskPriority }) {
  const { className, label } = STYLE[priority];
  if (priority === "low") return null;
  return (
    <span
      title={`${label} priority`}
      className={clsx("shrink-0 font-mono text-[10px] uppercase tracking-wider", className)}
    >
      {label}
    </span>
  );
}
