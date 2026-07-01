import { useState } from "react";
import { CustomInlineSelect } from "../ui/CustomInlineSelect";
import { useAnimatedNumber, Reveal } from "../ui/Reveal";
import { SmileArc } from "../ui/SmileArc";

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



export function Maths() {
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
      className="relative border-b border-ink/8 bg-paper-warm py-24 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <SmileArc
          stretch
          className="absolute -right-16 top-12 h-40 w-[28rem] -rotate-12 text-pink/40"
        />
        <SmileArc
          stretch
          className="absolute -left-20 bottom-16 h-32 w-[22rem] rotate-[8deg] text-brand/8"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.18em] text-brand">
            The maths nobody&apos;s trying to sell you
          </div>
        </Reveal>

        <Reveal delay={120} className="relative z-30">
          <p className="mt-10 font-display text-[clamp(2.25rem,7vw,6rem)] font-light leading-[1.05] tracking-tight text-ink">
            I live in{" "}
            <CustomInlineSelect
              value={home}
              options={HOME_CITIES}
              onChange={setHome}
            />
            ,<br />
            and I want{" "}
            <CustomInlineSelect
              value={String(nights)}
              options={NIGHT_OPTIONS.map(String)}
              onChange={(v) => setNights(Number(v))}
            />{" "}
            nights in{" "}
            <CustomInlineSelect
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

