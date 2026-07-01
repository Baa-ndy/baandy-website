"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signOutOfFirebase } from "@/lib/firebase/client";

export function SignOutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSignOut() {
    setError(null);
    startTransition(async () => {
      try {
        await fetch("/api/auth/signout", { method: "POST" });
        await signOutOfFirebase().catch(() => undefined);
        router.replace("/signin");
        router.refresh();
      } catch {
        setError("Sign-out failed.");
      }
    });
  }

  return (
    <div className="flex flex-col items-end">
      <button
        type="button"
        onClick={handleSignOut}
        disabled={isPending}
        className="text-xs text-ink/60 underline-offset-2 hover:text-ink hover:underline disabled:opacity-50"
      >
        {isPending ? "Signing out…" : "Sign out"}
      </button>
      {error ? <p className="mt-1 text-[10px] text-pink-deep">{error}</p> : null}
    </div>
  );
}
