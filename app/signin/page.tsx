import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { BaandyLogo } from "@/components/ui/Logo";
import { SignInButton } from "./SignInButton";
import { PortalHeader } from "../progress/components/PortalHeader";
export const metadata = {
  title: "Sign in · Baandy portal",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; error?: string }>;
}) {
  const params = await searchParams;
  const user = await getCurrentUser();
  if (user) {
    redirect(params.from ?? "/progress");
  }

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <PortalHeader user={null} />
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="mb-10 flex flex-col items-center text-center">
            <BaandyLogo className="h-14 w-14 mb-6" />
            <p className="font-display text-3xl tracking-tight">Baandy Team Portal</p>
            <p className="mt-2 text-sm text-ink/60">Sign in to access the project tracker.</p>
          </div>

        {params.error ? (
          <div className="mb-6 rounded-md border border-pink-deep/40 bg-pink/20 px-4 py-3 text-sm text-ink">
            {decodeURIComponent(params.error)}
          </div>
        ) : null}

        <SignInButton redirectTo={params.from ?? "/progress"} />

        <p className="mt-8 text-center text-xs text-ink/50">
          Access is limited to team members on the allowlist. Talk to Selam if your email isn&apos;t recognised.
        </p>
        </div>
      </main>
    </div>
  );
}
