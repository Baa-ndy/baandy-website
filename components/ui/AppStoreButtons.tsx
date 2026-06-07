const APP_STORE_URL = "https://apps.apple.com/app/baandy";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.baandy.app";

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M17.05 12.04c-.03-2.07 1.69-3.06 1.77-3.11-.97-1.41-2.47-1.6-3-1.62-1.27-.13-2.49.75-3.14.75-.65 0-1.65-.73-2.71-.71-1.39.02-2.68.81-3.4 2.06-1.45 2.51-.37 6.23 1.04 8.27.69 1 1.51 2.12 2.58 2.08 1.04-.04 1.43-.67 2.69-.67 1.25 0 1.61.67 2.71.65 1.12-.02 1.83-1.02 2.51-2.02.79-1.15 1.12-2.27 1.14-2.33-.03-.01-2.18-.84-2.2-3.32zM15.03 5.5c.57-.7.96-1.66.85-2.62-.82.03-1.83.55-2.42 1.24-.53.62-.99 1.6-.87 2.55.91.07 1.86-.46 2.44-1.17z"
      />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path fill="currentColor" d="M5 4l13 8-13 8z" />
    </svg>
  );
}

type Props = { className?: string; size?: "default" | "sm" };

export function AppStoreButtons({ className = "", size = "default" }: Props) {
  if (size === "sm") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download on the App Store"
          className="grid h-10 w-10 place-items-center rounded-full bg-ink text-paper transition hover:bg-brand"
        >
          <AppleIcon className="h-5 w-5" />
        </a>
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get it on Google Play"
          className="grid h-10 w-10 place-items-center rounded-full bg-ink text-paper transition hover:bg-brand"
        >
          <PlayIcon className="h-5 w-5" />
        </a>
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 rounded-2xl bg-ink px-5 py-3 text-paper transition hover:bg-brand"
      >
        <AppleIcon className="h-7 w-7" />
        <span className="flex flex-col leading-none">
          <span className="text-[10px] uppercase tracking-[0.14em] text-paper/70">Download on the</span>
          <span className="font-display text-lg">App Store</span>
        </span>
      </a>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 rounded-2xl bg-ink px-5 py-3 text-paper transition hover:bg-brand"
      >
        <PlayIcon className="h-7 w-7" />
        <span className="flex flex-col leading-none">
          <span className="text-[10px] uppercase tracking-[0.14em] text-paper/70">Get it on</span>
          <span className="font-display text-lg">Google Play</span>
        </span>
      </a>
    </div>
  );
}