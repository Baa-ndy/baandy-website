import { SmileArc } from "./SmileArc";

interface EyebrowProps {
  children: React.ReactNode;
  withSmile?: boolean;
  className?: string;
}

export function Eyebrow({ children, withSmile = false, className }: EyebrowProps) {
  return (
    <span className={className ? `eyebrow ${className}` : "eyebrow"}>
      {withSmile && <SmileArc />}
      {children}
    </span>
  );
}
