"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useToken } from "@/hooks/useToken";
import { cn } from "@/lib/utils";
import type { Tasks, TaskType, UpdateTaskStatusData } from "@/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UpdateTask } from "./update-task";
import { DeleteTaskButton } from "./delete-task";

export function UpdateTaskStatus({ id, title, completed, type }: Tasks) {
  const { token } = useToken();
  const queryClient = useQueryClient();
  const updateTaskMutation = useMutation({
    mutationFn: async (data: UpdateTaskStatusData) => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await fetch(`${apiUrl}/tasks/${id}/complete`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      return json;
    },
    onSuccess: (data) => {
      if (!data.id) {
        toast.error(data.message || "Erro ao atualizar status da tarefa");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["get-tasks"] });
    },
    onError: () => {
      toast.error("Erro ao atualizar status da tarefa");
    },
  });
  const handleMutate = (data: UpdateTaskStatusData) => {
    updateTaskMutation.mutate(data);
  };
  return (
    <div
      className="flex items-center w-full justify-between gap-2 cursor-pointer"
      onClick={() => handleMutate({ id, title, completed: !completed })}
    >
      <div className="flex items-center gap-2">
        <Checkbox key={id} className="h-5 w-5" checked={completed} />
        <span
          className={cn(
            "cursor-pointer text-lg text-accent-foreground",
            completed && "text-muted-foreground line-through",
          )}
        >
          {title}
        </span>
      </div>
      <div
        className="flex items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        {!completed && (
          <UpdateTask id={id} title={title} type={type as TaskType} />
        )}
        <DeleteTaskButton id={id} />
      </div>
    </div>
  );
}
