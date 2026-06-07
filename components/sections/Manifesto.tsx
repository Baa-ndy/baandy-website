import { Btn } from "@/components/ui/Btn";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

interface Stat {
  num: string;
  lbl: string;
}

const stats: Stat[] = [
  { num: "100%", lbl: "free, forever — money was never the point" },
  { num: "2,800+", lbl: "homes traded, not rented, this year" },
  { num: "41", lbl: "homes handed back to long-term renters since launch" },
];

export function Manifesto() {
  return (
    <section id="why" className="night">
      <div className="wrap-wide manifesto">
        <Reveal as="div">
          <Eyebrow>why baandy exists</Eyebrow>
        </Reveal>
        <Reveal as="div">
          <h2 className="big" style={{ margin: "22px 0 0" }}>
            travel shouldn&apos;t belong to whoever can <em>afford</em> it.
          </h2>
        </Reveal>
        <div className="manifesto-cols">
          <Reveal>
            <p>
              The short-term rental machine took homes out of the places people actually live,
              pushed up everyone&apos;s rent, and quietly decided that seeing the world was a
              thing you bought. Access became a function of your bank balance.
            </p>
            <p>
              Home swapping is older than all of it — our parents did it. And it&apos;s fairer by
              design: you can&apos;t take a place without offering your own. No professional
              landlords. No prices to compare. Just people trading the homes they already have.
            </p>
            <p>
              Remote work made it more possible than ever. We&apos;re here to prove it&apos;s
              just as easy, just as safe, and far more honest than renting — and to keep it free
              for anyone, anywhere.
            </p>
          </Reveal>
          <Reveal>
            <div className="stat-row">
              {stats.map((s) => (
                <div className="stat" key={s.num}>
                  <div className="num">{s.num}</div>
                  <div className="lbl">{s.lbl}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 34 }}>
              <Btn href="#why" variant="pink" size="lg">
                read the whole argument
              </Btn>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
