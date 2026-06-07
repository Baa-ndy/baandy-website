import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

interface Step {
  n: string;
  title: string;
  body: string;
}

interface Trust {
  icon: React.ReactNode;
  title: string;
  body: string;
}

const steps: Step[] = [
  {
    n: "01",
    title: "open up your home",
    body: "Show it like it's yours — the books, the light, the cat. Not a listing. A portrait.",
  },
  {
    n: "02",
    title: "find your match",
    body: "Both sides have to want it: the dates, the place, the vibe. Like Hinge, for holidays.",
  },
  {
    n: "03",
    title: "agree the swap",
    body: "Message, plan, sort the keys and the plants. We handle the protection in the background.",
  },
  {
    n: "04",
    title: "trade places",
    body: "You go there. They come here. Two homes lived in, loved, and handed back.",
  },
];

const trustCards: Trust[] = [
  {
    icon: (
      <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Everyone is verified",
    body: "ID-checked members, real reviews from both sides of every past swap. You know who's coming.",
  },
  {
    icon: (
      <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M3 10l9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <path d="M9 21v-7h6v7" />
      </svg>
    ),
    title: "Your home is covered",
    body: "Damage protection on every confirmed swap, no deposit to chase, no awkward bond conversations.",
  },
  {
    icon: (
      <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Real humans, when it matters",
    body: "A small team that actually answers — because letting someone into your home is a big deal, and we know it.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="how section-pad">
      <div className="wrap-wide">
        <Reveal className="section-head" as="div">
          <div>
            <Eyebrow>how it works</Eyebrow>
            <h2 className="display" style={{ margin: "14px 0 0" }}>
              two homes, <em>finding</em> each other.
            </h2>
          </div>
          <p className="lede muted" style={{ maxWidth: "34ch" }}>
            You can&apos;t take a place without offering your own. The swap is reciprocal by
            design — that&apos;s the whole point, and the reason it stays free.
          </p>
        </Reveal>

        <Reveal className="loop-wrap">
          <svg className="loop-arc" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
            <path
              className="smile-stroke smile-draw"
              d="M40 30 C 320 150, 880 150, 1160 30"
              strokeWidth="2.5"
            />
          </svg>
          <div className="loop-steps">
            {steps.map((s) => (
              <div className="step" key={s.n}>
                <div className="n">{s.n}</div>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="trust-row" as="div">
          {trustCards.map((t) => (
            <div className="trust" key={t.title}>
              {t.icon}
              <h5>{t.title}</h5>
              <p>{t.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
