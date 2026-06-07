"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  as?: "div" | "section" | "header" | "article";
  className?: string;
  rise?: boolean;
  once?: boolean;
  threshold?: number;
}

export function Reveal({
  children,
  as: Tag = "div",
  className,
  rise = true,
  once = true,
  threshold = 0.15,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, threshold]);

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      className={cn(rise && "rise", inView && "in-view", className)}
    >
      {children}
    </Tag>
  );
}
