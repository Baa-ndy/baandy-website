import { BaandyLogo } from "../ui/Logo";
import { SmileArc } from "../ui/SmileArc";

export function Footer() {
  return (
    <footer className="bg-paper py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3 text-brand">
              <BaandyLogo className="h-9 w-9" />
              <span className="font-display text-2xl text-ink">Baandy</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-ink/60">
              Hinge for holidays. A transactionless home-swapping platform for
              people who think travel should be a trade, not a tax.
            </p>
          </div>
          {[
            { h: "Product", links: ["How it works", "The maths", "FAQ", "App store"] },
            { h: "Trust", links: ["Baand-Aid", "Safety", "Privacy", "Terms"] },
            { h: "Company", links: ["Manifesto", "Studio notes", "Press", "Contact"] },
          ].map((col) => (
            <div key={col.h}>
              <div className="text-xs uppercase tracking-[0.18em] text-ink/50">{col.h}</div>
              <ul className="mt-4 space-y-2 text-sm text-ink">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-brand">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-8 text-xs text-ink/50">
          <div>© Baandy {new Date().getFullYear()}. Free forever, on purpose.</div>
          <SmileArc className="h-3 w-8 text-brand" />
        </div>
      </div>
    </footer>
  );
}