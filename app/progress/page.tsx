import { TASK_STATUSES, type TaskStatus } from "@/lib/db";
import { getActiveTasks, getTeamMembers } from "./queries";
import { Board } from "./components/Board";

const VISIBLE_STATUSES: TaskStatus[] = TASK_STATUSES.filter((s) => s !== "blocked");

export default async function ProgressPage() {
  const [tasks, members] = await Promise.all([getActiveTasks(), getTeamMembers()]);

  const grouped: Record<TaskStatus, typeof tasks> = {
    todo: [],
    in_progress: [],
    in_review: [],
    done: [],
    blocked: [],
  };
  for (const task of tasks) grouped[task.status].push(task);

  const blockedCount = grouped.blocked.length;

  return (
    <main className="pt-8">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink/50">Team board</p>
          <h1 className="font-display text-4xl tracking-tight mt-1">Progress</h1>
        </div>
        <div className="text-right text-xs text-ink/50">
          {tasks.length} active {tasks.length === 1 ? "task" : "tasks"}
          {blockedCount > 0 ? <> · {blockedCount} blocked</> : null}
        </div>
      </div>

      <Board
        columns={VISIBLE_STATUSES.map((status) => ({ status, tasks: grouped[status] }))}
        blocked={grouped.blocked}
        members={members}
      />
    </main>
  );
}
