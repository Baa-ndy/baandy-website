import { cn } from "@/lib/utils";

export type PlateColourway =
  | "lisbon"
  | "porto"
  | "bristol"
  | "hackney"
  | "oaxaca"
  | "kyoto"
  | "naples"
  | "oslo";

interface PlateProps {
  colourway: PlateColourway;
  pin?: string;
  caption?: string;
  glow?: boolean;
  image?: string;
  imageAlt?: string;
  className?: string;
}

export function Plate({ colourway, pin, caption, glow = false, image, imageAlt = "", className }: PlateProps) {
  return (
    <div className={cn("plate relative overflow-hidden", `h-${colourway}`, className)}>
      {image && (
        <>
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(26,22,51,0.35) 0%, rgba(26,22,51,0) 28%, rgba(26,22,51,0) 65%, rgba(26,22,51,0.45) 100%)" }}
          />
        </>
      )}
      {glow && <span className="glow" />}
      {pin && <span className="pin relative z-10">{pin}</span>}
      {caption && <span className="cap relative z-10">{caption}</span>}
    </div>
  );
}