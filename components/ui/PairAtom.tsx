import { Plate, type PlateColourway } from "./Plate";
import { SwapBadge } from "./SwapBadge";

interface PairSide {
  colourway: PlateColourway;
  pin: string;
  caption: string;
  title: string;
  subtitle: string;
  image?: string;
  imageAlt?: string;
}

interface PairAtomProps {
  left: PairSide;
  right: PairSide;
  tale: string;
  kicker: string;
  meta: string;
}

export function PairAtom({ left, right, tale, kicker, meta }: PairAtomProps) {
  return (
    <div className="pair pair-default">
      <div className="pair-grid">
        <div>
          <Plate colourway={left.colourway} pin={left.pin} caption={left.caption} image={left.image} imageAlt={left.imageAlt} />
          <div className="home-name">
            <b>{left.title}</b>
            <span>{left.subtitle}</span>
          </div>
        </div>
        <div>
          <Plate colourway={right.colourway} pin={right.pin} caption={right.caption} image={right.image} imageAlt={right.imageAlt} />
          <div className="home-name">
            <b>{right.title}</b>
            <span>{right.subtitle}</span>
          </div>
        </div>
      </div>
      <div className="pair-connector">
        <SwapBadge />
      </div>
      <div className="pair-story">
        <p className="tale">{tale}</p>
        <div />
        <div className="kicker">
          <span className="big">{kicker}</span>
          <small>{meta}</small>
        </div>
      </div>
    </div>
  );
}