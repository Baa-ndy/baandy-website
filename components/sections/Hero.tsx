"use client";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { PairAtom } from "@/components/ui/PairAtom";
import { Reveal } from "@/components/ui/Reveal";
import { AppStoreButtons } from "../ui/AppStoreButtons";

function AppleGlyph() {
  return (
    <svg viewBox="0 0 384 512" className="h-7 w-7 fill-white" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zM262.1 104.5c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 512 512" className="h-6 w-6" aria-hidden="true">
      <polygon points="60,52 60,256 285,256" fill="#34A853" />
      <polygon points="60,256 60,460 285,256" fill="#FBBC04" />
      <polygon points="60,52 285,256 468,256" fill="#EA4335" />
      <polygon points="60,460 285,256 468,256" fill="#4285F4" />
    </svg>
  );
}

function StoreButton({ href, top, main, glyph }: { href: string; top: string; main: string; glyph: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-3 rounded-2xl bg-ink px-5 py-3 text-white shadow-sticker transition-all duration-150 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-sticker-press active:translate-x-[5px] active:translate-y-[5px] active:shadow-none"
    >
      {glyph}
      <span className="flex flex-col leading-tight">
        <span className="font-sans text-[11px] text-white/70">{top}</span>
        <span className="font-sans text-lg font-semibold tracking-tight">{main}</span>
      </span>
    </a>
  );
}

export function Hero() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
        <div className="grid items-center gap-14 md:grid-cols-[1.05fr_1fr] md:gap-16">
         <Reveal as="div">
  <Eyebrow>like airbnb — but free &amp; ethical</Eyebrow>
</Reveal>
<Reveal>
  <h1 className="mt-4 max-w-[14ch] font-display text-[clamp(46px,6.6vw,104px)] font-medium leading-[0.97] tracking-[-0.018em]">
    turn your rent into <em className="italic">free travel</em>.
  </h1>
</Reveal>
<Reveal>
  <div className="mt-7 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
    <p className="max-w-[46ch] text-[clamp(18px,1.5vw,22px)] leading-[1.5] text-ink/60">
      You stay in someone&apos;s home while they stay in yours. No money changes hands, no
      landlords get richer. The home you already have is the only ticket you need.
    </p>
    <AppStoreButtons />
  </div>
</Reveal>
        </div>
      </div>
    </section>
  );
}