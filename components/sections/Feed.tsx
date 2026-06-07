import { Eyebrow } from "@/components/ui/Eyebrow";
import { Btn } from "@/components/ui/Btn";
import { Reveal } from "@/components/ui/Reveal";
import { SwapCard } from "@/components/ui/SwapCard";
import type { PlateColourway } from "@/components/ui/Plate";

interface TickerItem {
  bold: string;
  rest: string;
}

interface SwapEntry {
  left: PlateColourway;
  right: PlateColourway;
  route: string;
  when: string;
  note: string;
}

const tickerItems: TickerItem[] = [
  { bold: "14 people", rest: "arriving in Lisbon this week" },
  { bold: "9 homes", rest: "opened up in Hackney" },
  { bold: "Sofia & Noor", rest: "just matched · Porto ↔ Bristol" },
  { bold: "31 swaps", rest: "happening right now" },
  { bold: "2 homes", rest: "returned to long-term renters this month" },
];

const swaps: SwapEntry[] = [
  {
    left: "bristol",
    right: "porto",
    route: "Bristol ↔ Porto",
    when: "3 weeks",
    note: "A terrace by the river for a tiled flat in the old town.",
  },
  {
    left: "hackney",
    right: "oaxaca",
    route: "Hackney ↔ Oaxaca",
    when: "a month",
    note: "Two desks, fast wifi, and a courtyard full of jacaranda.",
  },
  {
    left: "kyoto",
    right: "naples",
    route: "Kyoto ↔ Naples",
    when: "10 nights",
    note: "A machiya with a tea room for a flat under Vesuvius.",
  },
  {
    left: "oslo",
    right: "lisbon",
    route: "Oslo ↔ Lisbon",
    when: "2 weeks",
    note: "Fjord light traded for a balcony over the Tejo.",
  },
  {
    left: "porto",
    right: "hackney",
    route: "Porto ↔ Hackney",
    when: "3 weeks",
    note: "Sofia & Noor — matched on Tuesday, swapping in June.",
  },
  {
    left: "naples",
    right: "oslo",
    route: "Naples ↔ Oslo",
    when: "a fortnight",
    note: "Sun for snow. Both families, both with kids, both delighted.",
  },
];

export function Feed() {
  const tickerLoop = [...tickerItems, ...tickerItems];

  return (
    <section id="feed" className="section-pad">
      <div className="wrap-wide">
        <Reveal className="ticker">
          <div className="ticker-track">
            {tickerLoop.map((item, i) => (
              <span className="item" key={i}>
                <span className="dot" /> <b>{item.bold}</b> {item.rest}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal className="section-head" as="div">
          <div>
            <Eyebrow>this week on baandy</Eyebrow>
            <h2 className="display" style={{ margin: "14px 0 0" }}>
              real swaps, <em>really</em> happening.
            </h2>
          </div>
          <Btn href="#feed" variant="ghost">browse every swap</Btn>
        </Reveal>

        <div className="feed-grid">
          {swaps.map((s) => (
            <Reveal key={s.route}>
              <SwapCard {...s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
