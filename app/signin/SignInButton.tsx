"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/lib/firebase/client";

export function SignInButton({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignIn() {
    setError(null);
    setLoading(true);
    try {
      const idToken = await signInWithGoogle();
      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Sign-in failed.");
        setLoading(false);
        return;
      }
      router.replace(redirectTo);
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Sign-in failed.";
      if (!message.includes("popup-closed-by-user")) {
        setError(message);
      }
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleSignIn}
        disabled={loading}
        className="w-full rounded-md bg-brand px-4 py-3 text-sm font-medium text-paper transition hover:bg-brand-deep disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Continue with Google"}
      </button>
      {error ? <p className="text-sm text-pink-deep">{error}</p> : null}
    </div>
  );
}
