import { PairAtom } from "@/components/ui/PairAtom";
import { Reveal } from "@/components/ui/Reveal";

interface HomePortrait {
  colourway: "lisbon" | "porto" | "bristol" | "hackney" | "oaxaca" | "kyoto" | "naples" | "oslo";
  pin: string;
  caption: string;
  title: string;
  subtitle: string;
  image?: string;
  imageAlt?: string;
}

interface Swap {
  left: HomePortrait;
  right: HomePortrait;
  tale: string;
  kicker: string;
  meta: string;
}

const swaps: Swap[] = [
  {
    left: {
      colourway: "lisbon",
      pin: "Alfama · Lisbon",
      caption: "Tomás's place",
      title: "Tomás's flat above the tram line",
      subtitle: "two beds · a balcony over the Tejo",
    },
    right: {
      colourway: "bristol",
      pin: "Harbourside · Bristol",
      caption: "Maya's place",
      title: "Maya's house by the water",
      subtitle: "a garden, a cat called Pim",
    },
    tale: "Maya woke up to the Tejo. Tomás woke up to the harbour. They traded homes for three weeks — watered each other's plants, fed each other's cat, and never once met.",
    kicker: "neither paid a penny.",
    meta: "swap #0413 · Bristol ↔ Lisbon · May 2026",
  },
  {
    left: {
      colourway: "kyoto",
      pin: "Gion · Kyoto",
      caption: "Aiko's place",
      title: "Aiko's machiya near the river",
      subtitle: "tatami, a courtyard maple",
    },
    right: {
      colourway: "hackney",
      pin: "London Fields · Hackney",
      caption: "Jordan's place",
      title: "Jordan's flat off the park",
      subtitle: "a wall of records, a dog called Biscuit",
    },
    tale: "Jordan woke to temple bells in Gion; Aiko woke to the 38 bus and the lido. Three weeks each — Jordan learned to fold the futon, Aiko fell for the park, and Biscuit got walked twice a day by someone new.",
    kicker: "not a penny between them.",
    meta: "swap #0561 · Hackney ↔ Kyoto · March 2026",
  },
];

export function Swaps() {
  return (
    <section id="swaps" className="w-full">
      <div className="mx-auto w-full max-w-6xl space-y-24 px-6 py-20 md:space-y-32 md:py-28">
        {swaps.map((swap) => (
          <Reveal key={swap.meta}>
            <PairAtom {...swap} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}