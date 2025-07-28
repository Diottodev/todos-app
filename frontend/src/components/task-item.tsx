import type { Tasks } from "@/schemas";
import { UpdateTaskStatus } from "./update-task-status";
import { cn } from "@/lib/utils";

export function TaskItem({ ...props }: Tasks) {
  return (
    <div
      data-testid="task-item"
      className={cn(
        "flex w-full items-center justify-between gap-4 rounded-lg px-4 py-2 transition-all duration-300 hover:bg-muted",
        props.completed && "opacity-75 hover:opacity-100",
      )}
    >
      <UpdateTaskStatus {...props} />
    </div>
  );
}
