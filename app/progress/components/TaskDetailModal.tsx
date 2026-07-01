"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Trash2 } from "lucide-react";
import clsx from "clsx";
import {
  TASK_AREAS,
  TASK_PRIORITIES,
  TASK_STATUSES,
  type TaskArea,
  type TaskPriority,
  type TaskStatus,
  type User,
} from "@/lib/db";
import type { TaskWithPeople } from "../queries";
import { editTask, deleteTask, updateTaskStatus } from "../actions";
import { AreaBadge } from "./AreaBadge";

type Member = Pick<User, "id" | "name" | "email" | "imageUrl">;

const STATUS_LABEL: Record<TaskStatus, string> = {
  todo: "To do",
  in_progress: "In progress",
  in_review: "In review",
  done: "Done",
  blocked: "Blocked",
};

export function TaskDetailModal({
  task,
  members,
  onClose,
}: {
  task: TaskWithPeople;
  members: Member[];
  onClose: () => void;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [priority, setPriority] = useState<TaskPriority>(task.priority);
  const [area, setArea] = useState<TaskArea>(task.area);
  const [assigneeId, setAssigneeId] = useState<string>(task.assigneeId ?? "");
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  function save() {
    setError(null);
    startTransition(async () => {
      const titleChanged = title.trim() !== task.title;
      const descChanged = description !== task.description;
      const prioChanged = priority !== task.priority;
      const areaChanged = area !== task.area;
      const assigneeChanged = (assigneeId || null) !== (task.assigneeId ?? null);

      if (titleChanged || descChanged || prioChanged || areaChanged || assigneeChanged) {
        const res = await editTask({
          taskId: task.id,
          title: titleChanged ? title.trim() : undefined,
          description: descChanged ? description : undefined,
          priority: prioChanged ? priority : undefined,
          area: areaChanged ? area : undefined,
          assigneeId: assigneeChanged ? assigneeId || null : undefined,
        });
        if (!res.ok) {
          setError(res.error);
          return;
        }
      }

      if (status !== task.status) {
        const res = await updateTaskStatus({ taskId: task.id, status });
        if (!res.ok) {
          setError(res.error);
          return;
        }
      }

      router.refresh();
      onClose();
    });
  }

  function handleDelete() {
    startTransition(async () => {
      const res = await deleteTask({ taskId: task.id });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      router.refresh();
      onClose();
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/40 px-4 py-16 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-lg border border-ink/5 bg-paper shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-ink/5 px-6 py-4">
          <div className="flex items-center gap-3">
            <AreaBadge area={task.area} />
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink/40">
              created by {task.createdBy.name}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-ink/50 hover:bg-ink/5 hover:text-ink"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-5 px-6 py-6">
          <div>
            <label className="block text-[10px] font-medium uppercase tracking-wider text-ink/50">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-ink/8 bg-paper px-3 py-2 text-lg font-medium text-ink outline-none focus:border-brand/40"
            />
          </div>

          <div>
            <label className="block text-[10px] font-medium uppercase tracking-wider text-ink/50">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={8}
              className="mt-1.5 w-full resize-none rounded-md border border-ink/8 bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-brand/40"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Status"
              value={status}
              onChange={(v) => setStatus(v as TaskStatus)}
              options={TASK_STATUSES.map((s) => ({ value: s, label: STATUS_LABEL[s] }))}
            />
            <Select
              label="Priority"
              value={priority}
              onChange={(v) => setPriority(v as TaskPriority)}
              options={TASK_PRIORITIES.map((p) => ({ value: p, label: p }))}
            />
            <Select
              label="Area"
              value={area}
              onChange={(v) => setArea(v as TaskArea)}
              options={TASK_AREAS.map((a) => ({ value: a, label: a }))}
            />
            <Select
              label="Assignee"
              value={assigneeId}
              onChange={setAssigneeId}
              options={[
                { value: "", label: "Unassigned" },
                ...members.map((m) => ({ value: m.id, label: m.name })),
              ]}
            />
          </div>

          {error ? <p className="text-sm text-pink-deep">{error}</p> : null}
        </div>

        <div className="flex items-center justify-between border-t border-ink/5 px-6 py-4">
          <button
            type="button"
            onClick={() => (confirmDelete ? handleDelete() : setConfirmDelete(true))}
            className={clsx(
              "inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm",
              confirmDelete
                ? "bg-pink-deep text-paper"
                : "text-ink/60 hover:bg-ink/5 hover:text-ink",
            )}
          >
            <Trash2 className="h-3.5 w-3.5" />
            {confirmDelete ? "Confirm delete" : "Delete"}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-3 py-2 text-sm text-ink/70 hover:text-ink"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={save}
              disabled={isPending}
              className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-paper hover:bg-brand-deep disabled:opacity-60"
            >
              {isPending ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-[10px] font-medium uppercase tracking-wider text-ink/50">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-md border border-ink/8 bg-paper px-2 py-1.5 text-sm capitalize"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
