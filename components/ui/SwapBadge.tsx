import { SwapGlyph } from "./SwapGlyph";

interface SwapBadgeProps {
  size?: "lg" | "sm";
  className?: string;
}

export function SwapBadge({ size = "lg", className }: SwapBadgeProps) {
  const cls = size === "sm" ? "swap-chip" : "swap-badge";
  return (
    <span className={cls} style={{ color: "var(--brand)" }}>
      <SwapGlyph className={className} />
    </span>
  );
}
