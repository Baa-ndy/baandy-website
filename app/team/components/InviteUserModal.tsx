"use client";

import { useState, ReactNode, FormEvent } from "react";
import { X } from "lucide-react";
import { inviteUser } from "../actions";

type Props = {
  children: ReactNode;
};

export function InviteUserModal({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"member" | "admin">("admin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const result = await inviteUser({ email, role });
    if (!result.ok) {
      setError(result.error);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setEmail("");
    setRole("member");
    setTimeout(() => {
      setIsOpen(false);
      setSuccess(false);
    }, 1500);
  }

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{children}</div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-paper rounded-lg p-8 w-full max-w-md shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Invite User</h2>
              <button
                onClick={() => setIsOpen(false)}
                disabled={loading}
                className="p-2 hover:bg-ink/5 rounded-lg transition-colors text-ink/50 hover:text-ink disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-ink/80">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full px-3 py-2 border border-ink/10 rounded-lg focus:border-ink/30 focus:outline-none bg-paper text-sm"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-ink/80">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as "member" | "admin")}
                  className="w-full px-3 py-2 border border-ink/10 rounded-lg focus:border-ink/30 focus:outline-none bg-paper text-sm"
                  disabled={loading}
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {error && <p className="text-sm text-pink-deep">{error}</p>}
              {success && <p className="text-sm text-green-600">User invited successfully!</p>}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={loading}
                  className="flex-1 px-4 py-2 border border-ink/10 rounded-lg hover:bg-ink/5 transition-colors text-sm font-medium text-ink/70 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-brand text-paper rounded-lg hover:bg-brand/90 transition-colors text-sm font-medium disabled:opacity-60"
                >
                  {loading ? "Inviting…" : "Send Invite"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
