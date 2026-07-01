import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { SignInButton } from "./SignInButton";
import '../../app/globals.css';
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
    <main className="min-h-screen bg-paper text-ink flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p className="font-display text-3xl tracking-tight">Baandy portal</p>
          <p className="mt-2 text-sm text-ink/60">Sign in to access the team tracker.</p>
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
  );
}
