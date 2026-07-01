import { useRef, useState, useEffect } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
  as
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?:string
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[900ms] ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function useAnimatedNumber(value: number, duration = 500) {
  const [current, setCurrent] = useState(value);
  const fromRef = useRef(value);
  const startRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (current === value) return;
    fromRef.current = current;
    startRef.current = performance.now();
    const from = fromRef.current;
    const to = value;

    const tick = (t: number) => {
      const elapsed = t - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(from + (to - from) * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return current;
}