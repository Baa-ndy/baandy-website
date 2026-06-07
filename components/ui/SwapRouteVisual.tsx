interface SwapRouteVisualProps {
  origin: string;
  destination: string;
  nights: number;
}

export function SwapRouteVisual({
  origin,
  destination,
  nights,
}: SwapRouteVisualProps) {
  return (
    <div className="relative mx-auto min-h-[31rem] w-full max-w-[42rem] overflow-hidden rounded-[2.5rem] border border-[#19142f]/10 bg-[#f1edf3] shadow-[0_35px_100px_rgba(25,20,47,0.14)] sm:min-h-[38rem] lg:min-h-[43rem]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.95),transparent_32%),radial-gradient(circle_at_85%_88%,rgba(239,223,232,0.9),transparent_40%)]"
      />

      <article className="absolute left-4 top-4 z-10 aspect-[4/3] w-[68%] overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,#e4aa71_0%,#c78349_52%,#895734_100%)] p-5 shadow-[0_24px_60px_rgba(25,20,47,0.2)] sm:left-7 sm:top-7 sm:p-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/90">
          <span className="h-2.5 w-2.5 rounded-full border-2 border-white/60 bg-[#f5c4c8]" />
          {destination}
        </div>

        <div className="absolute inset-x-5 bottom-5 rounded-[1.25rem] border border-white/20 bg-black/10 p-4 text-white backdrop-blur-md sm:inset-x-6 sm:bottom-6">
          <p className="font-[family-name:var(--font-display)] text-2xl leading-tight">
            morning light and unfamiliar streets
          </p>

          <p className="mt-2 text-sm text-white/75">
            your home for {nights} nights
          </p>
        </div>
      </article>

      <article className="absolute bottom-4 right-4 z-10 aspect-[4/3] w-[68%] overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,#b9c1aa_0%,#8c9c82_48%,#506552_100%)] p-5 shadow-[0_24px_60px_rgba(25,20,47,0.24)] sm:bottom-7 sm:right-7 sm:p-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/90">
          <span className="h-2.5 w-2.5 rounded-full border-2 border-white/60 bg-[#f5c4c8]" />
          {origin}
        </div>

        <div className="absolute inset-x-5 bottom-5 rounded-[1.25rem] border border-white/20 bg-black/10 p-4 text-white backdrop-blur-md sm:inset-x-6 sm:bottom-6">
          <p className="font-[family-name:var(--font-display)] text-2xl leading-tight">
            your place, making their trip possible
          </p>

          <p className="mt-2 text-sm text-white/75">
            traded, never rented
          </p>
        </div>
      </article>

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 h-full w-full text-[var(--brand)]"
        viewBox="0 0 620 680"
        fill="none"
      >
        <path
          d="M170 225C205 380 405 420 455 505"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray="8 12"
          strokeLinecap="round"
        />

        <circle cx="170" cy="225" r="8" fill="currentColor" />
        <circle cx="455" cy="505" r="8" fill="currentColor" />
      </svg>

      <div className="absolute left-1/2 top-[49%] z-30 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#19142f]/10 bg-white px-6 py-4 text-center shadow-[0_16px_45px_rgba(25,20,47,0.18)]">
        <p className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.18em] text-[#827d8c]">
          accommodation
        </p>

        <p className="mt-1 font-[family-name:var(--font-display)] text-4xl italic leading-none text-[var(--brand)]">
          £0
        </p>
      </div>

      <div className="absolute bottom-4 left-4 z-30 rounded-full border border-white/40 bg-white/75 px-4 py-2 text-xs font-medium text-[#514c60] shadow-sm backdrop-blur-md sm:bottom-7 sm:left-7">
        {origin} ↔ {destination}
      </div>
    </div>
  );
}