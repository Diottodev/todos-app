"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToken } from "@/hooks/useToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

type DeleteTaskButtonProps = {
  id: string;
};

export function DeleteTaskButton({ id }: DeleteTaskButtonProps) {
  const { getToken } = useToken();
  const queryClient = useQueryClient();
  const updateTaskMutation = useMutation({
    mutationFn: async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await fetch(`${apiUrl}/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          include: "credentials",
          authorization: `Bearer ${getToken()}`,
        },
      });
      const json = await res.json();
      return json;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-tasks"] });
      toast.success("Tarefa excluída com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao excluir tarefa", {
        description:
          error instanceof Error ? error.message : "Erro desconhecido",
      });
    },
  });
  const handleDelete = () => {
    updateTaskMutation.mutate();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="hover:bg-destructive/70"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja remover essa tarefa?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente sua
            tarefa.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
