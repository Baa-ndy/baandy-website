import { Reveal } from "../ui/Reveal";
import { SmileArc } from "../ui/SmileArc";

export function HowItWorks() {
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
            <Reveal key={s.n} delay={i * 140} className="h-full">
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