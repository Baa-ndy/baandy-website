import { UserPlus } from "lucide-react";
import { getTeamMembersCall } from "./queries";
import { TeamMembersList } from "./components/TeamMembersList";
import { InviteUserModal } from "./components/InviteUserModal";

export default async function TeamPage() {
  const members = await getTeamMembersCall();

  return (
    <main className="pt-8">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink/50">Team management</p>
          <h1 className="font-display text-4xl tracking-tight mt-1">Team</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right text-xs text-ink/50">
            {members.length} {members.length === 1 ? "member" : "members"}
          </div>
          <InviteUserModal>
            <button className="flex items-center gap-2 px-4 py-2 bg-brand text-paper rounded-lg hover:bg-brand/90 transition-colors text-sm font-medium">
              <UserPlus size={16} />
              Invite User
            </button>
          </InviteUserModal>
        </div>
      </div>

      <TeamMembersList members={members} />
    </main>
  );
}
