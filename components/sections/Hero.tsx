
import { AppStoreBadge, PlayStoreBadge } from "@/app/progress/components/AppRedirectButtons";
import Image from "next/image";
import { SmileArc } from "../ui/SmileArc";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-ink/8">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-28">
        <div className="lg:col-span-7">
          <div
            className="animate-hero-rise inline-flex items-center gap-2 rounded-full border border-ink/15 px-3.5 py-1.5 text-xs uppercase tracking-[0.18em] text-ink/70"
            style={{ animationDelay: "0ms" }}
          >
            <span className="text-base">🌍</span>
            Hinge for holidays — free & ethical
          </div>

          <h1
            className="animate-hero-rise mt-8 font-display text-[clamp(3rem,8vw,7.5rem)] font-light leading-[0.92] tracking-[-0.025em] text-ink"
            style={{ animationDelay: "120ms" }}
          >
            Turn your <em className="not-italic text-brand">rent</em>
            <br />
            into{" "}
            <span className="relative inline-block">
              <span
                className="absolute -inset-x-3 inset-y-3 -rotate-[1.5deg] rounded-md bg-pink lg:inset-y-5"
                aria-hidden
              />
              <span className="relative">free travel</span>
              <SmileArc
                stretch
                className="absolute -bottom-5 left-0 h-4 w-full text-brand"
              />
            </span>
            .
          </h1>

          <p
            className="animate-hero-rise mt-8 max-w-xl text-lg text-ink/70 lg:text-xl"
            style={{ animationDelay: "260ms" }}
          >
            A transactionless home-swapping platform. No hosts. No fees. No
            professional landlords skimming off the top. Two people trading
            what they already have, so neither has to pay.
          </p>

          <div
            className="animate-hero-rise mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "360ms" }}
          >
            <AppStoreBadge />
            <PlayStoreBadge />
          </div>

          <div
            className="animate-hero-rise mt-10 flex items-center gap-6 text-sm text-ink/60"
            style={{ animationDelay: "460ms" }}
          >
            <div className="flex -space-x-2">
              {["#F2CBCB", "#E8A6A6", "#D8B4F8", "#FFE5C2"].map((c, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-paper"
                  style={{ background: c }}
                />
              ))}
            </div>
            <span>
              <span className="font-medium text-ink">12,400</span> swaps and zero pounds exchanged
            </span>
          </div>
        </div>

        <div
          className="animate-hero-rise lg:col-span-5"
          style={{ animationDelay: "300ms" }}
        >
          <HeroPair />
        </div>
      </div>
    </section>
  );
}


export  function HeroPair() {
  return (
    <div className="relative aspect-[4/5] w-full">
      <div className="absolute left-0 top-0 h-[68%] w-[62%] -rotate-3 overflow-hidden rounded-2xl bg-pink shadow-2xl shadow-brand/10">
        <div className="flex h-full flex-col justify-between p-4">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-brand">
            <span>Lisbon</span>
            <span>PT</span>
          </div>
          <div className="relative my-2 h-[52%] overflow-hidden rounded-xl">
            <Image
     
              src="/lisbon-blue.jpg"
              alt="The blue-tiled flat in Alfama"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-display text-2xl leading-tight text-ink">
              The blue-tiled flat
            </div>
            <div className="mt-1 text-sm text-ink/70">Ana, 2 bed · Alfama</div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 h-[68%] w-[62%] rotate-3 overflow-hidden rounded-2xl bg-brand shadow-2xl shadow-brand/30">
        <div className="flex h-full flex-col justify-between p-4 text-paper">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] opacity-70">
            <span>York</span>
            <span>UK</span>
          </div>
          <div className="relative my-2 h-[52%] overflow-hidden rounded-xl">
            <Image
              src="/york-cottage.jpg"
              alt="The garden cottage in Bishopthorpe"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-display text-2xl leading-tight">
              The garden cottage
            </div>
            <div className="mt-1 text-sm opacity-80">Noor, 1 bed · Bishopthorpe</div>
          </div>
        </div>
      </div>
   
    </div>
  );
}
export function Marquee() {
  const items = ["Lisbon ↔ York", "Mexico City ↔ Berlin", "Tokyo ↔ Lyon", "Bristol ↔ Marrakech", "Athens ↔ Cape Town", "Edinburgh ↔ Oaxaca"];
  return (
    <div className="overflow-hidden border-b border-ink/8 py-6">
      <div className="flex animate-[scroll_40s_linear_infinite] gap-12 whitespace-nowrap text-2xl text-ink/30 lg:text-3xl">
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="font-display italic">
            {item} <span className="not-italic text-brand">·</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes scroll { to { transform: translateX(-33.333%) } }`}</style>
    </div>
  );
}
