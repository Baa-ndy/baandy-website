import clsx from "clsx";
import type { TaskArea } from "@/lib/db";

const AREA_STYLES: Record<TaskArea, string> = {
  mobile: "bg-brand/10 text-brand",
  backend: "bg-pink-deep/15 text-pink-deep",
  website: "bg-ink/8 text-ink/70",
  design: "bg-pink/30 text-ink",
  ops: "bg-brand-accent/10 text-brand-accent",
  general: "bg-ink/5 text-ink/60",
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
