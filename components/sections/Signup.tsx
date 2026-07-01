import { AppStoreBadge, PlayStoreBadge } from "@/app/progress/components/AppRedirectButtons";
import { BaandyLogo } from "../ui/Logo";
import { Reveal } from "../ui/Reveal";

export function Signup() {
  return (
    <section id="download" className="border-b border-ink/8 bg-brand py-24 text-paper lg:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <Reveal>
          <BaandyLogo className="mx-auto h-16 w-16 text-paper/10" />
          <h2 className="mt-8 font-display text-5xl font-light leading-[1] tracking-tight lg:text-7xl">
            Your next trip is <em className="text-pink">already paid for</em>.
          </h2>
          <p className="mt-6 text-lg text-paper/70">
            Get the app. Put your home in. Find your pair.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <AppStoreBadge />
            <PlayStoreBadge />
          </div>
          <div className="mt-8 text-sm text-paper/50">
            Free forever. No card. No catch. No exit strategy.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
