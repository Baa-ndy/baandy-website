import { Logo } from "@/components/ui/Logo";

interface FootColumn {
  heading: string;
  links: { label: string; href: string }[];
}

const columns: FootColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "how it works", href: "#how" },
      { label: "swaps & diaries", href: "#feed" },
      { label: "the maths", href: "#calc" },
      { label: "get the app", href: "#signup" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "why baandy", href: "#why" },
      { label: "the manifesto", href: "#why" },
      { label: "trust & safety", href: "#how" },
      { label: "join us", href: "#signup" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "terms", href: "#" },
      { label: "privacy", href: "#" },
      { label: "protection", href: "#" },
      { label: "contact", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap-wide">
        <div className="foot-top">
          <div>
            <Logo variant="footer" />
            <p className="mission">
              turn the home you already have into a passport to the world.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.heading}>
              <h6>{col.heading}</h6>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="foot-bot">
          <span>© 2026 Baandy. No money changed hands in the making of this website.</span>
          <span>made by people who&apos;d rather you didn&apos;t pay rent to a stranger.</span>
        </div>
      </div>
    </footer>
  );
}
