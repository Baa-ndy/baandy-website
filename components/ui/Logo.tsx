interface LogoProps {
  variant?: "default" | "footer";
}
import Image from "next/image"; 
export function Logo({ variant = "default" }: LogoProps) {
  return (
    <a
      href="#top"
      aria-label="Baandy home"
      className="flex items-center gap-2"
    >
      <Image
        src="/logo.png"
        alt="Baandy"
        width={32}
        height={32}
        className={`h-8 w-auto ${variant === "footer" ? "brightness-0 invert" : ""}`}
      />
      <span
        className={`font-display text-lg tracking-tight text-ink ${
          variant === "footer" ? "text-paper" : ""
        }`}
      >
        Baandy
      </span>
    </a>
  );
}
    


export function BaandyLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 108 108" fill="none" className={className} aria-hidden>
      <rect width="108" height="108" rx="22" fill="var(--color-brand)" />
      <path
        d="M52.03 78c-9.87 0-17.98-6.98-18.7-15.8a1.16 1.16 0 0 1 1.16-1.29h5.53c.59 0 1.08.45 1.16 1.04.62 4.53 5.25 8.06 10.85 8.06s10.23-3.53 10.86-8.06c.08-.6.57-1.04 1.16-1.04h5.52c.69 0 1.23.59 1.17 1.29C70.02 71.03 61.9 78 52.03 78Z"
        fill="var(--color-pink)"
      />
      <path
        d="m67.31 30.16-11.86 6.94c-.35.21-.57.6-.57 1.01v17.57c0 .64.52 1.17 1.16 1.17h12.77c.64 0 1.16-.53 1.16-1.17V44.56c0-.64.52-1.17 1.16-1.17h2.69c.64 0 1.16.52 1.16 1.17v11.12c0 .64.52 1.17 1.16 1.17h3.62c.64 0 1.16-.53 1.16-1.17V38.11c0-.41-.22-.8-.57-1l-11.86-6.95a1.17 1.17 0 0 0-1.17 0Zm-3.77 19.78h-2.56c-.64 0-1.16-.52-1.16-1.17v-4.21c0-.64.52-1.17 1.16-1.17h2.56c.64 0 1.16.52 1.16 1.17v4.21c0 .64-.52 1.17-1.16 1.17ZM38.43 30.16l-11.86 6.94c-.36.21-.57.6-.57 1.01v17.57c0 .64.52 1.17 1.16 1.17H39.93c.64 0 1.16-.53 1.16-1.17V44.56c0-.64.52-1.17 1.16-1.17h2.69c.64 0 1.16.52 1.16 1.17v11.12c0 .64.52 1.17 1.16 1.17h3.62c.64 0 1.16-.53 1.16-1.17V38.11c0-.41-.22-.8-.57-1l-11.86-6.95a1.17 1.17 0 0 0-1.17 0Zm-3.77 19.78h-2.56c-.64 0-1.16-.52-1.16-1.17v-4.21c0-.64.52-1.17 1.16-1.17h2.56c.64 0 1.16.52 1.16 1.17v4.21c0 .64-.52 1.17-1.16 1.17Z"
        fill="var(--color-pink)"
      />
    </svg>
  );
}