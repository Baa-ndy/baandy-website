"use client";

import { useState, useEffect, useRef } from "react";
import { Fraunces, Geist } from "next/font/google";
import './globals.css';
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "SOFT"],
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function HomePage() {
  return (
    <main
      className={`${fraunces.variable} ${geist.variable} min-h-screen bg-paper text-ink font-sans antialiased`}
    >
      <Nav />
      <Hero />
      <Marquee />
      <HowItWorks />
      <Maths />
      <Swaps />
         <BaandAid />
      <Manifesto />
      <Feed />
      <Signup />
      <Footer />
    </main>
  );
}

function BaandyLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 108 108" fill="none" className={className} aria-hidden>
      <rect width="108" height="108" rx="22" fill="currentColor" />
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

function SmileArc({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 24" fill="none" className={className} aria-hidden>
      <path
        d="M2 4c14 16 42 18 58 18s44-2 58-18"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[900ms] ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function useAnimatedNumber(value: number, duration = 500) {
  const [current, setCurrent] = useState(value);
  const fromRef = useRef(value);
  const startRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (current === value) return;
    fromRef.current = current;
    startRef.current = performance.now();
    const from = fromRef.current;
    const to = value;

    const tick = (t: number) => {
      const elapsed = t - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(from + (to - from) * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return current;
}

function AppStoreBadge() {
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

function PlayStoreBadge() {
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

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/8 bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#" className="flex items-center gap-3 text-brand">
          <BaandyLogo className="h-9 w-9" />
          <span className="font-display text-2xl tracking-tight text-ink">Baandy</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-ink/70 md:flex">
          <a href="#how" className="transition hover:text-ink">How it works</a>
          <a href="#maths" className="transition hover:text-ink">The maths</a>
          <a href="#swaps" className="transition hover:text-ink">Swaps</a>
          <a href="#manifesto" className="transition hover:text-ink">Manifesto</a>
        </nav>
        <a
          href="#download"
          className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-ink"
        >
          Get the app
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-ink/8">
      <div className="mx-auto grid max-w-7xl gap-12  py-20 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-28">
        <div className="lg:col-span-7">
          <div
            className="animate-hero-rise inline-flex items-center gap-2 rounded-full border border-ink/15 px-3.5 py-1.5 text-xs uppercase tracking-[0.18em] text-ink/70"
            style={{ animationDelay: "0ms" }}
          >
            <span className="text-base">🌍</span>
            Hinge for holidays — free & ethical
          </div>

          <h1
            className="animate-hero-rise mt-8 font-display text-[clamp(3rem,8vw,7.5rem)] font-light leading-[0.92] tracking-[-0.025em] text-ink"
            style={{ animationDelay: "120ms" }}
          >
            Turn your <em className="not-italic text-brand">rent</em>
            <br />
            into{" "}
            <span className="relative inline-block">
              <span
                className="absolute -inset-x-3 inset-y-3 -rotate-[1.5deg] rounded-md lg:inset-y-5"
                aria-hidden
              />
              <span className="relative">free travel</span>
              <SmileArc className="absolute -bottom-3 left-0 h-3 w-full text-brand" />
            </span>
            .
          </h1>

          <p
            className="animate-hero-rise mt-8 max-w-xl text-lg text-ink/70 lg:text-xl"
            style={{ animationDelay: "260ms" }}
          >
            A transactionless home-swapping platform. No hosts. No fees. No
            professional landlords skimming off the top. Two people trading
            what they already have, so neither has to pay.
          </p>

          <div
            className="animate-hero-rise mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "360ms" }}
          >
            <AppStoreBadge />
            <PlayStoreBadge />
          </div>

          <div
            className="animate-hero-rise mt-10 flex items-center gap-6 text-sm text-ink/60"
            style={{ animationDelay: "460ms" }}
          >
            <div className="flex -space-x-2">
              {["#F2CBCB", "#E8A6A6", "#D8B4F8", "#FFE5C2"].map((c, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-paper"
                  style={{ background: c }}
                />
              ))}
            </div>
            <span>
              <span className="font-medium text-ink">12,400</span> swaps and zero pounds exchanged
            </span>
          </div>
        </div>

        <div
          className="animate-hero-rise lg:col-span-5"
          style={{ animationDelay: "300ms" }}
        >
          <HeroPair />
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

function HeroPair() {
  return (
    <div className="relative aspect-[4/5] w-full">
      <div className="absolute left-0 top-0 h-[68%] w-[62%] -rotate-3 overflow-hidden rounded-2xl bg-pink shadow-2xl shadow-brand/10">
        <div className="flex h-full flex-col justify-between p-4">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-brand">
            <span>Lisbon</span>
            <span>PT</span>
          </div>
          <div className="relative my-2 h-[52%] overflow-hidden rounded-xl">
            <Image
              src="/lisbon-blue.jpg"
              alt="The blue-tiled flat in Alfama"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-display text-2xl leading-tight text-ink">
              The blue-tiled flat
            </div>
            <div className="mt-1 text-sm text-ink/70">Ana, 2 bed · Alfama</div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 h-[68%] w-[62%] rotate-3 overflow-hidden rounded-2xl bg-brand shadow-2xl shadow-brand/30">
        <div className="flex h-full flex-col justify-between p-4 text-paper">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] opacity-70">
            <span>York</span>
            <span>UK</span>
          </div>
          <div className="relative my-2 h-[52%] overflow-hidden rounded-xl">
            <Image
              src="/york-cottage.jpg"
              alt="The garden cottage in Bishopthorpe"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-display text-2xl leading-tight">
              The garden cottage
            </div>
            <div className="mt-1 text-sm opacity-80">Noor, 1 bed · Bishopthorpe</div>
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-paper shadow-lg">
          <SmileArc className="h-8 w-8 text-brand" />
        </div>
      </div>
    </div>
  );
}
function Marquee() {
  const items = ["Lisbon ↔ York", "Mexico City ↔ Berlin", "Tokyo ↔ Lyon", "Bristol ↔ Marrakech", "Athens ↔ Cape Town", "Edinburgh ↔ Oaxaca"];
  return (
    <div className="overflow-hidden border-b border-ink/8 py-6">
      <div className="flex animate-[scroll_40s_linear_infinite] gap-12 whitespace-nowrap text-2xl text-ink/30 lg:text-3xl">
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="font-display italic">
            {item} <span className="not-italic text-brand">·</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes scroll { to { transform: translateX(-33.333%) } }`}</style>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      t: "Put your home in",
      d: "Five honest photos and a few honest words. Your place joins the pool. No commission, no listing fee, no upsells. Ever.",
      hint: "takes about ten minutes",
      bg: "bg-paper-warm",
      accent: "text-brand",
      dot: "bg-brand",
      muted: "text-ink/40",
      body: "text-ink/70",
    },
    {
      n: "02",
      t: "Find your pair",
      d: "Match with someone whose place excites you, and whose dates fit yours. Like dating, but for sofas and skylines.",
      hint: "average match: 2 days",
      bg: "bg-pink/50",
      accent: "text-brand",
      dot: "bg-brand",
      muted: "text-ink/45",
      body: "text-ink/75",
    },
    {
      n: "03",
      t: "Swap and go",
      d: "You stay in theirs. They stay in yours. Nobody pays anybody. The maths sorts itself.",
      hint: "12,400 swaps and counting",
      bg: "bg-brand",
      accent: "text-pink",
      dot: "bg-pink",
      muted: "text-pink/70",
      body: "text-paper/80",
      title: "text-paper",
    },
  ];
  return (
    <section id="how" className="border-b border-ink/8 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.18em] text-brand">
              How it works
            </div>
            <h2 className="mt-4 font-display text-5xl font-light leading-[1] tracking-tight text-ink lg:text-7xl">
              Three steps.
              <br />
              <em className="text-brand">Zero middlemen.</em>
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-3 lg:gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 140}>
              <div
                className={`group h-full rounded-3xl p-8 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-ink/15 lg:p-10 ${s.bg}`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`font-display text-[clamp(4rem,7vw,6rem)] font-light leading-none transition-transform duration-500 group-hover:-translate-y-1 ${s.accent}`}
                  >
                    {s.n}
                  </div>
                  <SmileArc
                    className={`mt-4 h-4 w-14 opacity-50 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 ${s.accent}`}
                  />
                </div>
                <div className="mt-12">
                  <h3
                    className={`font-display text-3xl leading-tight lg:text-4xl ${
                      s.title ?? "text-ink"
                    }`}
                  >
                    {s.t}
                  </h3>
                  <p className={`mt-4 ${s.body}`}>{s.d}</p>
                  <div
                    className={`mt-7 inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.18em] ${s.muted}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                    {s.hint}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const CITY_RATES: Record<string, number> = {
  Lisbon: 142,
  Kyoto: 188,
  "Mexico City": 95,
  Berlin: 112,
  Tokyo: 218,
  Barcelona: 165,
  "New York": 285,
  Marrakech: 88,
};

const HOME_CITIES = ["Bristol", "London", "York", "Edinburgh", "Manchester", "Glasgow"];
const NIGHT_OPTIONS = [3, 5, 7, 10, 14, 21, 30, 45];

function FancyInlineSelect({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;

    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", escHandler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", escHandler);
    };
  }, [open]);

  return (
    <span ref={ref} className="relative z-[999] inline-block align-baseline">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`cursor-pointer border-b-[3px] border-dashed pb-1 font-display italic text-brand transition-colors duration-200 focus:outline-none ${
          open ? "border-brand" : "border-pink-deep hover:border-brand"
        }`}
      >
        {value}
      </button>

      <div
        className={`absolute left-0 top-full z-[999] mt-3 origin-top-left transition-all duration-200 ease-out ${
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="min-w-[220px] rounded-2xl bg-paper p-1.5 shadow-2xl shadow-ink/25 ring-1 ring-ink/8">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`block w-full rounded-xl px-4 py-2.5 text-left font-display text-base italic transition ${
                value === opt
                  ? "bg-pink/50 text-brand"
                  : "text-ink/75 hover:bg-pink/20 hover:text-brand"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </span>
  );
}

function Maths() {
  const [home, setHome] = useState("Bristol");
  const [destination, setDestination] = useState("Kyoto");
  const [nights, setNights] = useState(10);

  const perNight = CITY_RATES[destination] ?? 140;
  const cost = nights * perNight;
  const animatedCost = useAnimatedNumber(cost);
  const animatedPerNight = useAnimatedNumber(perNight);

  return (
    <section
      id="maths"
      className="relative overflow-hidden border-b border-ink/8 bg-paper-warm py-24 lg:py-32"
    >
      <SmileArc
        className="pointer-events-none absolute -right-16 top-12 h-40 w-[28rem] -rotate-12 text-pink/40"
        aria-hidden
      />
      <SmileArc
        className="pointer-events-none absolute -left-20 bottom-16 h-32 w-[22rem] rotate-[8deg] text-brand/8"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.18em] text-brand">
            The maths nobody&apos;s trying to sell you
          </div>
        </Reveal>

        <Reveal delay={120} className="relative z-50">
          <p className="mt-10 font-display text-[clamp(2.25rem,7vw,6rem)] font-light leading-[1.05] tracking-tight text-ink">
            I live in{" "}
            <FancyInlineSelect
              value={home}
              options={HOME_CITIES}
              onChange={setHome}
            />
            ,<br />
            and I want{" "}
            <FancyInlineSelect
              value={String(nights)}
              options={NIGHT_OPTIONS.map(String)}
              onChange={(v) => setNights(Number(v))}
            />{" "}
            nights in{" "}
            <FancyInlineSelect
              value={destination}
              options={Object.keys(CITY_RATES)}
              onChange={setDestination}
            />
            .
          </p>
        </Reveal>

        <Reveal delay={220} className="relative z-10">
          <div className="mt-16 grid gap-5 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
            <div className="group relative overflow-hidden rounded-3xl bg-paper p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-ink/10 lg:p-12">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-[0.18em] text-ink/40">
                  On the other platform
                </div>
                <div className="rounded-full bg-ink/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-ink/50">
                  illustrative
                </div>
              </div>

              <div className="mt-8 font-display text-[clamp(3.5rem,10vw,8rem)] font-light leading-[0.9] text-ink/30 tabular-nums">
                <span className="relative inline-block">
                  £{animatedCost.toLocaleString()}
                  <span
                    aria-hidden
                    className="absolute left-0 right-0 top-1/2 h-[5px] -translate-y-1/2 -rotate-3 rounded-full bg-pink-deep"
                  />
                </span>
              </div>

              <div className="mt-6 flex items-baseline gap-3 text-sm text-ink/45">
                <span>{nights} nights</span>
                <span className="h-1 w-1 rounded-full bg-ink/20" />
                <span className="tabular-nums">
                  ~£{animatedPerNight}/night
                </span>
                <span className="h-1 w-1 rounded-full bg-ink/20" />
                <span>{destination}</span>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl bg-pink p-8 text-ink transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-deep/40 lg:p-12">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-[0.18em] text-ink/60">
                  On Baandy
                </div>
                <SmileArc className="h-4 w-12 text-brand transition-transform duration-500 group-hover:scale-110" />
              </div>

              <div className="mt-8 font-display text-[clamp(3.5rem,10vw,8rem)] font-light italic leading-[0.9]">
                nothing.
              </div>

              <div className="mt-6 text-sm text-ink/60">
                Forever and always. No fees later. No catch.
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <p className="font-display text-2xl font-light leading-snug text-ink lg:text-3xl">
              That number isn&apos;t the pitch — it&apos;s the proof. The radical
              thing about Baandy isn&apos;t how much you save. It&apos;s{" "}
              <em className="text-brand">how little money appears at all.</em>
            </p>

            <div className="flex items-end">
              <div className="text-sm text-ink/55">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-brand">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  Try the dashed bits
                </div>
                <p className="mt-2 max-w-xs">
                  Change your home, the nights, the destination. The number on
                  the left moves. The one on the right doesn&apos;t.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
function Swaps() {
  return (
    <section id="swaps" className="border-b border-ink/8 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="flex items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.18em] text-brand">
                This week on Baandy
              </div>
              <h2 className="mt-4 font-display text-5xl font-light leading-[1] tracking-tight text-ink lg:text-7xl">
                The pair is the <em className="text-brand">atom</em>.
              </h2>
            </div>
            <a
              href="#"
              className="hidden text-sm text-ink/60 underline-offset-4 transition hover:text-ink hover:underline md:block"
            >
              See every swap →
            </a>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <FeaturedSwap />
        </Reveal>

        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          <Reveal delay={0}>
            <SupportingPair
              a={{ city: "Oaxaca, MX", title: "the courtyard house", host: "Mateo", color: "#FFE5C2" }}
              b={{ city: "Lyon, FR", title: "the atelier above the boulangerie", host: "Camille", color: "#D8B4F8" }}
              note="three weeks · still in progress"
            />
          </Reveal>
          <Reveal delay={140}>
            <SupportingPair
              a={{ city: "Athens, GR", title: "the marble balcony", host: "Eleni", color: "#B5D9C8" }}
              b={{ city: "Edinburgh, UK", title: "the old town tenement", host: "Finlay", color: "#E8A6A6" }}
              note="ten nights · keys handed back yesterday"
            />
          </Reveal>
        </div>

        <Reveal delay={100}>
          <SwapTicker />
        </Reveal>
      </div>
    </section>
  );
}
function BaandAid() {
  const coverage = [
    "Damage to the building",
    "Damage to your contents",
    "Damage to adjacent properties",
    "Theft by guest",
    "Fire — and the re-build",
  ];
  return (
    <section
      id="baand-aid"
      className="relative border-b border-ink/8 bg-paper-warm py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-6">
            <div className="text-xs uppercase tracking-[0.18em] text-brand">
              Baand-Aid · the safety net
            </div>
            <h2 className="mt-4 font-display text-5xl font-light leading-[1] tracking-tight text-ink lg:text-7xl">
              For the <em className="text-brand">one in a thousand</em>
              <br />
              swap that goes sideways.
            </h2>
            <p className="mt-8 max-w-xl text-lg text-ink/70">
              Almost every swap ends with keys handed back, plants alive, and
              a &ldquo;let&apos;s do this again next year&rdquo; message. For
              everything else, we partnered with an insurance provider so
              your home and your stuff are covered.
            </p>
 
            <div className="mt-12 flex flex-wrap items-end gap-8">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-ink/50">
                  From
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-[clamp(4rem,7vw,6rem)] font-light leading-none text-brand">
                    £4
                  </span>
                  <span className="font-display text-2xl italic text-ink/60">
                    /night
                  </span>
                </div>
              </div>
 
              <div className="flex items-center gap-3 rounded-full bg-pink px-4 py-2 text-sm text-ink">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand/60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                </span>
                <span>Optional. Never required.</span>
              </div>
            </div>
          </Reveal>
 
          <Reveal delay={140} className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl bg-paper p-8 shadow-2xl shadow-ink/10 lg:p-10">
              <div className="flex items-baseline justify-between gap-4">
                <div className="text-xs uppercase tracking-[0.18em] text-brand">
                  What&apos;s covered
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-ink/40">
                    up to
                  </div>
                  <div className="font-display text-3xl font-light text-ink lg:text-4xl">
                    £50,000
                  </div>
                </div>
              </div>
 
              <ul className="mt-8 space-y-5 border-t border-ink/10 pt-6">
                {coverage.map((item, i) => (
                  <li
                    key={item}
                    className="group flex items-center gap-4 text-ink"
                  >
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-pink/50 transition-transform duration-300 group-hover:scale-110">
                      <SmileArc className="h-3 w-5 text-brand" />
                    </div>
                    <span className="font-display text-lg lg:text-xl">
                      {item}
                    </span>
                    <span className="ml-auto text-xs tabular-nums text-ink/30">
                      0{i + 1}
                    </span>
                  </li>
                ))}
              </ul>
 
              <div className="mt-8 border-t border-ink/10 pt-6 text-sm text-ink/55">
                Underwritten by a licensed UK insurer. Decide per swap. Cancel
                any time before the swap starts.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
 

function FeaturedSwap() {
  return (
    <div className="mt-16">
      <div className="grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
        <div
          className="group/card aspect-[4/3] overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-ink/30 lg:p-8"
          style={{ background: "#3C2415", color: "#F4F2F7" }}
        >
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] opacity-70">
              <span>Lisbon, PT</span>
              <span>Tomás&apos;s place</span>
            </div>
            <div>
              <div className="font-display text-3xl italic leading-tight lg:text-4xl">
                Tomás&apos;s flat above the tram line
              </div>
              <div className="mt-3 text-sm opacity-70">
                two beds · a balcony over the Tejo
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="group/swap flex h-14 w-14 items-center justify-center rounded-full bg-paper ring-1 ring-ink/10 transition-transform duration-500 hover:scale-110 lg:h-16 lg:w-16">
            <SmileArc className="h-6 w-6 text-brand transition-transform duration-500 group-hover/swap:scale-110" />
          </div>
        </div>

        <div
          className="group/card aspect-[4/3] overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-ink/30 lg:p-8"
          style={{ background: "#2D3825", color: "#F4F2F7" }}
        >
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] opacity-70">
              <span>Bristol, UK</span>
              <span>Maya&apos;s place</span>
            </div>
            <div>
              <div className="font-display text-3xl italic leading-tight lg:text-4xl">
                Maya&apos;s house by the water
              </div>
              <div className="mt-3 text-sm opacity-70">
                a garden, a cat called Pim
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-10 border-t border-ink/8 pt-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        <p className="font-display text-2xl font-light leading-snug text-ink lg:text-4xl">
          Maya woke up to the Tejo. Tomás woke up to the harbour. They traded
          homes for three weeks — watered each other&apos;s plants, fed each
          other&apos;s cat, and never once met.
        </p>
        <div>
          <div className="font-display text-3xl italic text-brand lg:text-4xl">
            neither paid a penny.
          </div>
          <div className="mt-3 text-sm text-ink/60">
            swap #0413 · Bristol ↔ Lisbon · May 2026
          </div>
        </div>
      </div>
    </div>
  );
}

function SupportingPair({
  a,
  b,
  note,
}: {
  a: { city: string; title: string; host: string; color: string };
  b: { city: string; title: string; host: string; color: string };
  note: string;
}) {
  return (
    <div className="rounded-3xl bg-pink/20 p-5 transition-all duration-500 hover:-translate-y-1 hover:bg-pink/30 hover:shadow-xl hover:shadow-ink/10 lg:p-6">
      <div className="grid grid-cols-2 gap-3">
        <div
          className="aspect-square overflow-hidden rounded-xl p-4"
          style={{ background: a.color, color: a.color === "#2A1458" ? "#F4F2F7" : "#14091F" }}
        >
          <div className="flex h-full flex-col justify-between">
            <div className="text-[10px] uppercase tracking-[0.18em] opacity-70">
              {a.city}
            </div>
            <div>
              <div className="font-display text-lg italic leading-tight">
                {a.title}
              </div>
              <div className="mt-1 text-xs opacity-70">{a.host}</div>
            </div>
          </div>
        </div>
        <div
          className="aspect-square overflow-hidden rounded-xl p-4"
          style={{ background: b.color, color: b.color === "#2A1458" ? "#F4F2F7" : "#14091F" }}
        >
          <div className="flex h-full flex-col justify-between">
            <div className="text-[10px] uppercase tracking-[0.18em] opacity-70">
              {b.city}
            </div>
            <div>
              <div className="font-display text-lg italic leading-tight">
                {b.title}
              </div>
              <div className="mt-1 text-xs opacity-70">{b.host}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-ink/60">
        <span className="italic">{note}</span>
        <SmileArc className="h-3 w-10 text-brand" />
      </div>
    </div>
  );
}

function SwapTicker() {
  const items = [
    { dot: true, highlight: "9 homes", rest: "opened up in Hackney" },
    { dot: true, highlight: "Sofia & Noor", rest: "just matched · Porto ↔ Bristol" },
    { dot: true, highlight: "31 swaps", rest: "happening right now" },
  ];
  return (
    <div className="mt-16 flex flex-wrap gap-x-12 gap-y-4 border-t border-ink/10 pt-8 text-sm">
      {items.map((item) => (
        <div key={item.highlight} className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
          </span>
          <span className="font-medium text-ink">{item.highlight}</span>
          <span className="text-ink/60">{item.rest}</span>
        </div>
      ))}
    </div>
  );
}

function Manifesto() {
  return (
    <section
      id="manifesto"
      className="border-b border-ink/8 bg-ink py-24 text-paper lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.22em] text-pink">
            Why Baandy exists
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mt-12 font-display text-[clamp(2.75rem,8vw,7rem)] font-light leading-[1.02] tracking-tight">
            travel shouldn&apos;t belong
            <br />
            to whoever can <em className="text-pink">afford</em> it.
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal delay={200} className="lg:col-span-6">
            <div className="space-y-6 text-paper/70 lg:text-lg lg:leading-[1.6]">
              <p>
                The short-term rental machine took homes out of the places
                people actually live, pushed up everyone&apos;s rent, and
                quietly decided that seeing the world was a thing you bought.
                Access became a function of your bank balance.
              </p>
              <p>
                Home swapping is older than all of it — our parents did it. And
                it&apos;s fairer by design: you can&apos;t take a place without
                offering your own. No professional landlords. No prices to
                compare. Just people trading the homes they already have.
              </p>
              <p>
                Remote work made it more possible than ever. We&apos;re here to
                prove it&apos;s just as easy, just as safe, and far more honest
                than renting — and to keep it free for anyone, anywhere.
              </p>
            </div>
          </Reveal>

          <Reveal delay={300} className="lg:col-span-6 lg:pt-2">
            <div className="grid grid-cols-2 gap-x-10 gap-y-14 lg:gap-x-12">
              <div>
                <div className="font-display text-[clamp(3.5rem,6vw,5.5rem)] font-light leading-none">
                  100<span className="text-[0.7em]">%</span>
                </div>
                <div className="mt-4 text-sm text-paper/60 lg:text-base lg:leading-[1.5]">
                  free, forever — money was never the point
                </div>
              </div>
              <div>
                <div className="font-display text-[clamp(3.5rem,6vw,5.5rem)] font-light leading-none">
                  2,800<span className="text-[0.7em]">+</span>
                </div>
                <div className="mt-4 text-sm text-paper/60 lg:text-base lg:leading-[1.5]">
                  homes traded, not rented, this year
                </div>
              </div>
              <div>
                <div className="font-display text-[clamp(3.5rem,6vw,5.5rem)] font-light leading-none">
                  41
                </div>
                <div className="mt-4 text-sm text-paper/60 lg:text-base lg:leading-[1.5]">
                  homes handed back to long-term renters since launch
                </div>
              </div>
              <div className="flex items-end">
                <a
                  href="#"
                  className="group inline-flex items-center gap-2 rounded-full bg-pink px-6 py-3.5 text-sm font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-paper hover:shadow-2xl hover:shadow-pink/30"
                >
                  read the whole argument
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Feed() {
  const stories = [
    {
      tag: "Story",
      title: "How two YouTube editors swapped flats for a summer",
      meta: "London ↔ Lisbon · 6 min read",
    },
    {
      tag: "Guide",
      title: "Your first swap: what to leave, what to lock away",
      meta: "Baandy guides · 4 min read",
    },
    {
      tag: "Field notes",
      title: "Why we chose pink for everything",
      meta: "From the studio · 3 min read",
    },
  ];
  return (
    <section className="border-b border-ink/8 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.18em] text-brand">The feed</div>
          <h2 className="mt-4 max-w-2xl font-display text-5xl font-light leading-[1] tracking-tight text-ink lg:text-6xl">
            Stories from the swap.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {stories.map((s, i) => (
            <Reveal key={s.title} delay={i * 130}>
              <a href="#" className="group block">
                <div className="aspect-[5/4] overflow-hidden rounded-2xl bg-ink/5 transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-pink/40" />
                <div className="mt-5 text-xs uppercase tracking-[0.18em] text-brand">
                  {s.tag}
                </div>
                <div className="mt-2 font-display text-2xl leading-tight text-ink transition group-hover:text-brand">
                  {s.title}
                </div>
                <div className="mt-2 text-sm text-ink/60">{s.meta}</div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Signup() {
  return (
    <section id="download" className="border-b border-ink/8 bg-brand py-24 text-paper lg:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <Reveal>
          <BaandyLogo className="mx-auto h-16 w-16 text-paper/10" />
          <h2 className="mt-8 font-display text-5xl font-light leading-[1] tracking-tight lg:text-7xl">
            Your next trip is <em className="text-pink">already paid for</em>.
          </h2>
          <p className="mt-6 text-lg text-paper/70">
            Get the app. Put your home in. Find your pair.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <AppStoreBadge />
            <PlayStoreBadge />
          </div>
          <div className="mt-8 text-sm text-paper/50">
            Free forever. No card. No catch. No exit strategy.
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-paper py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3 text-brand">
              <BaandyLogo className="h-9 w-9" />
              <span className="font-display text-2xl text-ink">Baandy</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-ink/60">
              Hinge for holidays. A transactionless home-swapping platform for
              people who think travel should be a trade, not a tax.
            </p>
          </div>
          {[
            { h: "Product", links: ["How it works", "The maths", "App store", "Play store"] },
            { h: "Company", links: ["Manifesto", "Studio notes", "Press", "Contact"] },
            { h: "Trust", links: ["Safety", "Privacy", "Terms", "Cookie policy"] },
          ].map((col) => (
            <div key={col.h}>
              <div className="text-xs uppercase tracking-[0.18em] text-ink/50">{col.h}</div>
              <ul className="mt-4 space-y-2 text-sm text-ink">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-brand">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-8 text-xs text-ink/50">
          <div>© Baandy {new Date().getFullYear()}. Free forever, on purpose.</div>
          <SmileArc className="h-3 w-8 text-brand" />
        </div>
      </div>
    </footer>
  );
}