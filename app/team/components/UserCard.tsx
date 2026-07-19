"use client";

import { Mail, Shield, Edit2 } from "lucide-react";
import type { User } from "@/lib/db";
import { EditUserModal } from "./EditUserModal";

type Props = {
  user: User;
};

export function UserCard({ user }: Props) {
  return (
    <div className="rounded-lg border border-ink/10 bg-paper p-6 hover:border-ink/20 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {!user.imageUrl && (
            <div className="w-10 h-10 rounded-full mb-3 bg-ink/20 flex items-center justify-center">
              <span className="text-xs font-bold text-ink/50">{user.name.charAt(0)}</span>
            </div>
          )}
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={user.name}
              className="w-10 h-10 rounded-full mb-3 object-cover"
            />
          ): ( <div className="w-10 h-10 rounded-full mb-3 bg-ink/20 flex items-center justify-center">
              <span className="text-xs font-bold text-ink/50">{user.name.charAt(0)}</span>
            </div>
          )}
          <h3 className="font-semibold text-sm truncate">{user.name}</h3>
          <a
            href={`mailto:${user.email}`}
            className="flex items-center gap-1 text-xs text-ink/50 hover:text-ink/70 truncate mt-1"
          >
            <Mail size={12} />
            <span className="truncate">{user.email}</span>
          </a>
        </div>
        <EditUserModal user={user}>
          <button className="p-2 hover:bg-ink/5 rounded-lg transition-colors text-ink/50 hover:text-ink">
            <Edit2 size={16} />
          </button>
        </EditUserModal>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Shield size={14} className="text-ink/50" />
        <span className="text-xs font-medium text-ink/70 capitalize">{user.role}</span>
      </div>

      <div className="mt-3 text-xs text-ink/40">
        Joined {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
      </div>
    </div>
  );
}
