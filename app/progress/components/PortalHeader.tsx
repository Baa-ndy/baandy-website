import Link from "next/link";
import { SignOutButton } from "./SignOutButton";
import type { SessionData } from "@/lib/session";

export function PortalHeader({ user }: { user: SessionData }) {
  return (
    <header className="border-b border-ink/10 bg-paper-warm/60 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
        <Link href="/progress" className="flex items-center gap-3">
          <span className="font-display text-xl tracking-tight">Baandy</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/50">
            portal
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm text-ink/70 md:flex">
          <Link href="/progress" className="hover:text-ink">
            Board
          </Link>
          <Link href="/docs" className="hover:text-ink">
            Docs
          </Link>
          <Link href="/" className="hover:text-ink">
            Site
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden text-right text-xs text-ink/60 sm:block">
            <p className="text-ink">{user.name}</p>
            <p className="text-[10px]">{user.email}</p>
          </div>
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt=""
              className="h-8 w-8 rounded-full border border-ink/10 object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-xs font-medium text-paper">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
