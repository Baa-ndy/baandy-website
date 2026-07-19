"use client";

import { useState, ReactNode, FormEvent } from "react";
import { X } from "lucide-react";
import type { User } from "@/lib/db";
import { editUser } from "../actions";

type Props = {
  user: User;
  children: ReactNode;
};

export function EditUserModal({ user, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState<User["role"]>(user.role);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const changes: Record<string, unknown> = {};
    if (name !== user.name) changes.name = name;
    if (role !== user.role) changes.role = role;

    if (Object.keys(changes).length === 0) {
      setLoading(false);
      return;
    }

    const result = await editUser({ userId: user.id, ...changes });
    if (!result.ok) {
      setError(result.error);
      setLoading(false);
      return;
    }

    setSuccess(true);
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
              <h2 className="text-xl font-semibold">Edit User</h2>
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
                  value={user.email}
                  disabled
                  className="w-full px-3 py-2 border border-ink/10 rounded-lg bg-ink/5 text-sm text-ink/50 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-ink/80">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-ink/10 rounded-lg focus:border-ink/30 focus:outline-none bg-paper text-sm"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-ink/80">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as User["role"])}
                  className="w-full px-3 py-2 border border-ink/10 rounded-lg focus:border-ink/30 focus:outline-none bg-paper text-sm"
                  disabled={loading}
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {error && <p className="text-sm text-pink-deep">{error}</p>}
              {success && <p className="text-sm text-green-600">User updated successfully!</p>}

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
                  {loading ? "Saving…" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
