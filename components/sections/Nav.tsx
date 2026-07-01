import { BaandyLogo } from "../ui/Logo";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/8 bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#" className="flex items-center gap-3 text-brand">
          <BaandyLogo className="h-9 w-9" />
          <span className="font-display text-2xl tracking-tight text-ink">Baandy</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-ink/70 lg:flex">
          <a href="#how" className="transition hover:text-ink">How it works</a>
          <a href="#maths" className="transition hover:text-ink">The maths</a>
          <a href="#swaps" className="transition hover:text-ink">Swaps</a>
          <a href="#baand-aid" className="transition hover:text-ink">Baand-Aid</a>
          <a href="#faq" className="transition hover:text-ink">FAQ</a>
        </nav>
        <a
          href="#download"
          className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-ink"
        >
          Get the app
        </a>
      </div>
    </header>
  );
}