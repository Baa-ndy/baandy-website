import { Logo } from "@/components/ui/Logo";
import { Btn } from "@/components/ui/Btn";
import { AppStoreButtons } from "../ui/AppStoreButtons";

export function Nav() {
  return (
    <header className="nav">
      <div className="wrap-wide nav-inner">
        <Logo />
        <nav className="nav-links">
          <a href="#how">how it works</a>
          <a href="#feed">swaps</a>
          <a href="#why">why baandy</a>
          <a href="#calc">the maths</a>
        </nav>
      <div className="flex items-center gap-3">
  <a href="#" className="text-sm font-medium text-ink/70 transition hover:text-ink">log in</a>
  <AppStoreButtons size="sm" />
</div>
      </div>
    </header>
  );
}
