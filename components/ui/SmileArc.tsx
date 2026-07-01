
export function SmileArc({
  className = "",
  stretch = false,
}: {
  className?: string;
  stretch?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 120 56"
      fill="none"
      preserveAspectRatio={stretch ? "none" : "xMidYMid meet"}
      className={className}
      aria-hidden
    >
      <path
        d="M9 8c10 30 28 41 51 41s41-11 51-41"
        stroke="currentColor"
        strokeWidth="13"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
