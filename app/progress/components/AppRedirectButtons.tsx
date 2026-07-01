export function AppStoreBadge() {
  return (
    <a
      href="#"
      className="group inline-flex items-center gap-3 rounded-2xl bg-ink px-5 py-3.5 text-paper transition hover:bg-brand"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
        <path d="M17.05 12.04c-.03-2.86 2.34-4.23 2.44-4.3-1.33-1.95-3.4-2.22-4.13-2.25-1.76-.18-3.43 1.04-4.32 1.04-.9 0-2.27-1.02-3.74-.99-1.92.03-3.7 1.12-4.69 2.83-2 3.47-.51 8.6 1.44 11.41.95 1.38 2.08 2.92 3.55 2.87 1.43-.06 1.97-.93 3.7-.93 1.72 0 2.21.93 3.73.9 1.54-.03 2.51-1.4 3.45-2.79 1.09-1.6 1.54-3.15 1.56-3.23-.03-.01-2.99-1.15-3.02-4.56ZM14.2 3.62c.79-.96 1.32-2.29 1.18-3.62-1.14.05-2.52.76-3.34 1.71-.73.85-1.37 2.21-1.2 3.51 1.27.1 2.57-.65 3.36-1.6Z" />
      </svg>
      <div className="text-left leading-none">
        <div className="text-[10px] opacity-70">Download on the</div>
        <div className="text-base font-medium">App Store</div>
      </div>
    </a>
  );
}

export function PlayStoreBadge() {
  return (
    <a
      href="#"
      className="group inline-flex items-center gap-3 rounded-2xl border border-ink/15 bg-paper px-5 py-3.5 text-ink transition hover:border-ink/40 hover:bg-ink/5"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        <path d="M3.6 1.84c-.36.38-.57.97-.57 1.74v16.84c0 .77.21 1.36.57 1.74l.06.05L13.04 12v-.18L3.66 1.79l-.06.05Z" fill="#00C3F1" />
        <path d="m16.16 15.09-3.12-3.09v-.18l3.12-3.09.07.04 3.69 2.07c1.05.59 1.05 1.55 0 2.14l-3.69 2.07-.07.04Z" fill="#FFD500" />
        <path d="M16.23 15.05 13.04 12 3.6 21.42c.35.37.92.41 1.57.05l11.06-6.42Z" fill="#FF3946" />
        <path d="M16.23 8.95 5.17 2.53c-.65-.36-1.22-.32-1.57.05L13.04 12l3.19-3.05Z" fill="#00E472" />
      </svg>
      <div className="text-left leading-none">
        <div className="text-[10px] opacity-70">Get it on</div>
        <div className="text-base font-medium">Google Play</div>
      </div>
    </a>
  );
}

