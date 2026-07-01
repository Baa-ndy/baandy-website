"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import {
  TASK_AREAS,
  TASK_PRIORITIES,
  TASK_STATUSES,
  type TaskArea,
  type TaskPriority,
  type TaskStatus,
  type User,
} from "@/lib/db";
import { FormSelect } from "@/components/ui/CustomInlineSelect";
import { createTask } from "../actions";

type Member = Pick<User, "id" | "name" | "email" | "imageUrl">;

export function NewTaskModal({
  open,
  onClose,
  members,
}: {
  open: boolean;
  onClose: () => void;
  members: Member[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [area, setArea] = useState<TaskArea>("general");
  const [assigneeId, setAssigneeId] = useState<string>("");

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setTitle("");
      setDescription("");
      setStatus("todo");
      setPriority("medium");
      setArea("general");
      setAssigneeId("");
      setError(null);
    }
  }, [open]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title required.");
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await createTask({
        title: title.trim(),
        description,
        status,
        priority,
        area,
        assigneeId: assigneeId || null,
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.refresh();
      onClose();
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-lg border border-ink/10 bg-paper shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <h2 className="font-display text-lg">New task</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-ink/50 hover:bg-ink/5 hover:text-ink"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-ink/60">
              Title
            </label>
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs doing?"
              className="mt-1.5 w-full rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm text-ink outline-none placeholder:text-ink/30 focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-ink/60">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional — markdown supported."
              rows={3}
              className="mt-1.5 w-full resize-none rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm text-ink outline-none placeholder:text-ink/30 focus:border-brand"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <FormSelect
              label="Status"
              value={status}
              onChange={(v) => setStatus(v as TaskStatus)}
              options={TASK_STATUSES.map((s) => ({ value: s, label: s.replace("_", " ") }))}
            />
            <FormSelect
              label="Priority"
              value={priority}
              onChange={(v) => setPriority(v as TaskPriority)}
              options={TASK_PRIORITIES.map((p) => ({ value: p, label: p }))}
            />
            <FormSelect
              label="Area"
              value={area}
              onChange={(v) => setArea(v as TaskArea)}
              options={TASK_AREAS.map((a) => ({ value: a, label: a }))}
            />
            <FormSelect
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

          <div className="flex items-center justify-end gap-2 border-t border-ink/10 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-3 py-2 text-sm text-ink/70 hover:text-ink"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-paper hover:bg-brand-deep disabled:opacity-60"
            >
              {isPending ? "Creating…" : "Create task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

