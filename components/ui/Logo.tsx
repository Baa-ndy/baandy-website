interface LogoProps {
  variant?: "default" | "footer";
}

export function Logo({ variant = "default" }: LogoProps) {
  return (
    <a
      href="#top"
      aria-label="Baandy home"
      className="flex items-center gap-2"
    >
      <img
        src="/logo.png"
        alt="Baandy"
        className={`h-8 w-auto ${variant === "footer" ? "brightness-0 invert" : ""}`}
      />
    </a>
  );
}