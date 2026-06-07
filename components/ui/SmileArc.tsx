interface SmileArcProps {
  width?: number;
  height?: number;
  className?: string;
  strokeWidth?: number;
  draw?: boolean;
}

export function SmileArc({
  width = 22,
  height = 14,
  className,
  strokeWidth = 2.4,
  draw = false,
}: SmileArcProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 14"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2 3 Q11 16 20 3"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        className={draw ? "smile-draw" : undefined}
      />
    </svg>
  );
}
