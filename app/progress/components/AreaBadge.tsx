import clsx from "clsx";
import type { TaskArea } from "@/lib/db";

const AREA_STYLES: Record<TaskArea, string> = {
  mobile: "bg-brand/5 text-brand/80",
  backend: "bg-pink-deep/10 text-pink-deep/90",
  website: "bg-ink/5 text-ink/55",
  design: "bg-pink/20 text-ink/70",
  ops: "bg-brand-accent/5 text-brand-accent/80",
  general: "bg-ink/[0.03] text-ink/50",
};

const AREA_LABEL: Record<TaskArea, string> = {
  mobile: "Mobile",
  backend: "Backend",
  website: "Website",
  design: "Design",
  ops: "Ops",
  general: "General",
};

export function AreaBadge({ area }: { area: TaskArea }) {
  return (
    <span
      className={clsx(
        "rounded-sm px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider",
        AREA_STYLES[area],
      )}
    >
      {AREA_LABEL[area]}
    </span>
  );
}
