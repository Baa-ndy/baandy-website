import { Reveal } from "../ui/Reveal";
import { SmileArc } from "../ui/SmileArc";

export function BaandAid() {
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