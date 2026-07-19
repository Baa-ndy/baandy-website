import { requireUser } from "@/lib/auth";
import { PortalHeader } from "@/app/progress/components/PortalHeader";
import "@/app/globals.css";

export const metadata = {
  title: "Team · Baandy portal",
};

export default async function TeamLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <PortalHeader user={user} />
      <div className="mx-auto max-w-[1400px] h-full px-6 pb-16">{children}</div>
    </div>
  );
}
