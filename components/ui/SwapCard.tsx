import { Plate, type PlateColourway } from "./Plate";
import { SwapBadge } from "./SwapBadge";

interface SwapCardProps {
  left: PlateColourway;
  right: PlateColourway;
  route: string;
  when: string;
  note: string;
  href?: string;
}

export function SwapCard({ left, right, route, when, note, href = "#feed" }: SwapCardProps) {
  return (
    <a className="swap-card" href={href}>
      <div className="duo">
        <Plate colourway={left} />
        <Plate colourway={right} />
        <div className="mid">
          <SwapBadge size="sm" />
        </div>
      </div>
      <div className="meta">
        <span className="route">{route}</span>
        <span className="when">{when}</span>
      </div>
      <p className="note">{note}</p>
    </a>
  );
}
