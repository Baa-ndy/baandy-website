import { Reveal } from "../ui/Reveal";

export function Feed() {
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



