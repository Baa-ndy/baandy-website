import { Reveal } from "../ui/Reveal";

export function Manifesto() {
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
