import Link from "next/link";
import { cn } from "@/lib/utils";

type BtnVariant = "primary" | "ghost" | "pink";
type BtnSize = "default" | "lg";

interface BtnProps {
  href: string;
  variant?: BtnVariant;
  size?: BtnSize;
  children: React.ReactNode;
  className?: string;
}

const variantClass: Record<BtnVariant, string> = {
  primary: "btn-primary",
  ghost: "btn-ghost",
  pink: "btn-pink",
};

export function Btn({ href, variant = "primary", size = "default", children, className }: BtnProps) {
  const classes = cn("btn", variantClass[variant], size === "lg" && "btn-lg", className);
  const isExternal = href.startsWith("http");
  if (isExternal) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    );
  }
  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
}
