import { useState } from "react";
import { Reveal } from "../ui/Reveal";
import { SmileArc } from "../ui/SmileArc";

export function FAQ() {
  const items = [
    {
      q: "Is it really free?",
      a: "YES! We want everyone to be able to Baandy! Signing up for the app is totally free and you’ll be able to complete your swaps without paying a penny for the app or your accommodation. Unlike other home swapping apps you won’t need to buy tokens to swap or pay a fee for each swap. We will be introducing a premium version of the app for our most avid swappers but we promise to keep the free version so you’ll always be able to Baandy for free.",
    },
    {
      q: "What's the catch?",
      a: "Genuinely, there isn't one - we want to ensure people can take advantage of increased work flexibility to live and work from anywhere. We want people to travel more - but with care, really immersing themselves in the place they visit.",
    },
    {
      q: "Is home swapping safe?",
      a: "Home swapping has been around since 1952 and is having a quiet boom. You'll see profiles, photos, and reviews before you ever agree to a swap. For total peace of mind, Baand-Aid covers your home and contents up to £50,000 — from £4 a night. Optional, never required.",
    },
    {
      q: "Why do I want to baandy?",
      a:`If you want to make the most of your work/life flexibility and travel more, without using up all your annual leave or using up all your travel budget, baandy is for you. You’ll get your own personal guide to your new destination so you can experience the real essence of a place - where to go for pizza, the best bar to go to on a Tuesday night, and where to find those vintage pieces you love without paying tourist prices. 

We are bringing together a community who care about travel consciously and carefully, about understanding the places and people you are visiting. People who don’t want to live small lives.`
   
    },
  
  ];
  return (
    <section id="faq" className="border-b border-ink/8 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <div className="text-xs uppercase tracking-[0.18em] text-brand">
              Common questions
            </div>
            <h2 className="mt-4 font-display text-5xl font-light leading-[1] tracking-tight text-ink lg:text-6xl">
              You ask.
              <br />
              <em className="text-brand">We answer.</em>
            </h2>
            <p className="mt-6 text-ink/60">
              Still got questions? Email us at{" "}
              <a
                href="mailto:hello@baandy.co.uk"
                className="text-brand underline decoration-pink-deep decoration-2 underline-offset-4 transition hover:decoration-brand"
              >
                hello@baandy.co.uk
              </a>{" "}
              and we&apos;ll get back to you within a day.
            </p>
          </Reveal>

          <div className="lg:col-span-8">
            <div className="border-t border-ink/10">
              {items.map((item, i) => (
                <Reveal key={item.q} delay={i * 60}>
                  <FAQItem q={item.q} a={item.a} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-ink/10">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-6 py-6 text-left transition lg:py-8"
      >
        <span
          className={`font-display text-xl leading-tight transition-colors duration-300 lg:text-2xl ${
            open ? "text-brand" : "text-ink group-hover:text-brand"
          }`}
        >
          {q}
        </span>
        <span
          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            open
              ? "-rotate-12 scale-110 bg-brand text-pink"
              : "bg-pink/40 text-brand group-hover:bg-pink"
          }`}
          aria-hidden
        >
          <SmileArc className="h-3 w-5" />
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out ${
          open
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-6 pr-12 text-ink/70 lg:pb-8 lg:text-lg">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}
