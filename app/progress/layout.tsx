import { requireUser } from "@/lib/auth";
import { PortalHeader } from "./components/PortalHeader";

export const metadata = {
  title: "Progress · Baandy portal",
};

export default async function ProgressLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <PortalHeader user={user} />
      <div className="mx-auto max-w-[1400px] h-full px-6 pb-16">{children}</div>
    </div>
  );
}
