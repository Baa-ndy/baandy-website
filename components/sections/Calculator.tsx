"use client";

import { useMemo, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

type Destination =
  | "lisbon"
  | "porto"
  | "barcelona"
  | "mexico city"
  | "kyoto"
  | "naples"
  | "copenhagen"
  | "new york";

const nightlyRates: Record<Destination, number> = {
  lisbon: 118,
  porto: 96,
  barcelona: 142,
  "mexico city": 88,
  kyoto: 156,
  naples: 104,
  copenhagen: 178,
  "new york": 246,
};

const fromCities = ["Bristol", "Hackney", "Porto", "Oslo"];
const toCities: { value: Destination; label: string }[] = [
  { value: "lisbon", label: "Lisbon" },
  { value: "porto", label: "Porto" },
  { value: "barcelona", label: "Barcelona" },
  { value: "mexico city", label: "Mexico City" },
  { value: "kyoto", label: "Kyoto" },
  { value: "naples", label: "Naples" },
  { value: "copenhagen", label: "Copenhagen" },
  { value: "new york", label: "New York" },
];

const chevron =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%234a1fd9' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

const selectClass =
  "appearance-none cursor-pointer bg-transparent pl-1 pr-[1.1em] text-brand border-b-2 border-dashed border-pink-deep focus:bg-pink focus:text-ink focus:outline-none";

const selectStyle = {
  backgroundImage: `url("${chevron}")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right .15em center",
  backgroundSize: "11px",
} as const;

export function Calculator() {
  const [from, setFrom] = useState(fromCities[0]);
  const [nights, setNights] = useState(12);
  const [to, setTo] = useState<Destination>("lisbon");

  const wouldveCost = useMemo(
    () => (nightlyRates[to] * nights).toLocaleString("en-GB"),
    [nights, to],
  );

  const handleNights = (raw: string) => {
    const cleaned = raw.replace(/[^0-9]/g, "");
    setNights(cleaned === "" ? 0 : Math.min(365, parseInt(cleaned, 10)));
  };

  return (
    <section id="calc" className="py-[clamp(80px,12vw,124px)]">
      <div className="mx-auto max-w-[1480px] px-6 md:px-10">
        <Reveal as="div">
          <Eyebrow>the maths nobody&apos;s trying to sell you</Eyebrow>
        </Reveal>

        <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <Reveal>
            <p className="max-w-[20ch] font-display text-[clamp(26px,3vw,46px)] font-medium leading-[1.4] tracking-[-0.01em]">
              I live in{" "}
              <select
                className={selectClass}
                style={selectStyle}
                aria-label="where you live"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              >
                {fromCities.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              , and I want{" "}
              <input
                className="w-[2.2em] border-b-2 border-dashed border-pink-deep bg-transparent text-center text-brand focus:bg-pink focus:text-ink focus:outline-none"
                type="text"
                inputMode="numeric"
                value={nights}
                onChange={(e) => handleNights(e.target.value)}
                aria-label="number of nights"
              />{" "}
              nights in{" "}
              <select
                className={selectClass}
                style={selectStyle}
                aria-label="where you want to go"
                value={to}
                onChange={(e) => setTo(e.target.value as Destination)}
              >
                {toCities.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              .
            </p>

            <div className="mt-11 grid items-center gap-10 border-t border-ink/12 pt-9 sm:grid-cols-[1fr_auto]">
              <p className="max-w-[30ch] font-display text-[clamp(22px,2.4vw,32px)] leading-[1.34]">
                A stranger&apos;s flat there would&apos;ve cost you about{" "}
                <span className="text-ink/45 line-through decoration-pink-deep decoration-[3px]">
                  £{wouldveCost}
                </span>
                . On Baandy, it costs{" "}
                <span className="font-display italic text-brand">nothing.</span>
              </p>
              <svg className="h-[150px] w-[260px]" viewBox="0 0 260 150" aria-hidden="true">
                <circle cx="36" cy="104" r="6" fill="var(--brand)" />
                <circle cx="224" cy="50" r="6" fill="var(--brand)" />
                <path
                  className="smile-stroke smile-draw"
                  d="M36 104 C 90 168, 170 168, 224 50"
                  strokeWidth="2.5"
                />
                <text x="20" y="128" fontSize="12" fill="rgba(22,17,46,.6)" className="font-body">
                  home
                </text>
                <text x="196" y="40" fontSize="12" fill="rgba(22,17,46,.6)" className="font-body">
                  away
                </text>
              </svg>
            </div>
          </Reveal>

          <Reveal>
            <p className="max-w-[46ch] text-[clamp(18px,1.5vw,22px)] leading-[1.5] text-ink/60">
              That number isn&apos;t the pitch — it&apos;s the proof. The radical thing about
              Baandy isn&apos;t how much you save. It&apos;s how little money appears at all.
            </p>
            <p className="mt-[18px] max-w-[46ch] text-[clamp(18px,1.5vw,22px)] leading-[1.5] text-ink/60">
              Illustrative comparison rents. The actual figure on your swap is, and always will
              be, <span className="font-display italic text-brand">zero</span>.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}