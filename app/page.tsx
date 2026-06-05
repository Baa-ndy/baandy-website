export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-svh max-w-6xl flex-col px-6 py-8 md:px-10 md:py-10">
      <header className="flex items-center justify-between">
        <a href="/" className="text-lg tracking-tight">
          Baandy
        </a>
        <nav className="flex items-center gap-8 text-sm text-[var(--color-muted)]">
          <a href="#manifesto" className="hover:text-[var(--color-ink)]">
            Manifesto
          </a>
          <a href="#how" className="hover:text-[var(--color-ink)]">
            How it works
          </a>
          <a
            href="#join"
            className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[var(--color-paper)] hover:opacity-90"
          >
            Join
          </a>
        </nav>
      </header>

      <section className="flex flex-1 flex-col justify-center py-24">
        <h1 className="font-serif text-6xl leading-[0.95] tracking-tight md:text-8xl lg:text-9xl">
          Trade homes.
          <br />
          Not money.
        </h1>
        <p className="mt-8 max-w-xl text-lg text-[var(--color-muted)] md:text-xl">
          Baandy is a home-swapping platform for people who&rsquo;d rather experience a place than
          pay to be in it. Hinge for travel — a fairer, almost no-cost alternative to the rental
          economy.
        </p>

        <div className="mt-10 flex items-center gap-6">
          <a
            href="#join"
            className="rounded-full bg-[var(--color-ink)] px-6 py-3 text-[var(--color-paper)] hover:opacity-90"
          >
            Get early access
          </a>
          <a href="#manifesto" className="text-sm underline underline-offset-4">
            Read the manifesto
          </a>
        </div>
      </section>

      <footer className="flex items-center justify-between border-t border-[var(--color-ink)]/10 pt-6 text-sm text-[var(--color-muted)]">
        <span>&copy; {new Date().getFullYear()} Baandy</span>
        <span>Made with intent.</span>
      </footer>
    </main>
  );
}
