import { Reveal } from "../ui/Reveal";
import { SmileArc } from "../ui/SmileArc";

export function Swaps() {
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
          <Reveal delay={0} className="h-full">
            <SupportingPair
              a={{ city: "Oaxaca, MX", title: "the courtyard house", host: "Mateo", color: "#FFE5C2" }}
              b={{ city: "Lyon, FR", title: "the atelier above the boulangerie", host: "Camille", color: "#D8B4F8" }}
              note="three weeks · still in progress"
            />
          </Reveal>
          <Reveal delay={140} className="h-full">
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

export function FeaturedSwap() {
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
export function SupportingPair({
  a,
  b,
  note,
}: {
  a: { city: string; title: string; host: string; color: string };
  b: { city: string; title: string; host: string; color: string };
  note: string;
}) {
  return (
    <div className="h-full rounded-3xl bg-pink/20 p-5 transition-all duration-500 hover:-translate-y-1 hover:bg-pink/30 hover:shadow-xl hover:shadow-ink/10 lg:p-6">
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

export function SwapTicker() {
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