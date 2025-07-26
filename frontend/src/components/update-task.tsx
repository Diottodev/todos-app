"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateTaskSchema, type UpdateTaskFormData } from "@/schemas";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  Form,
} from "./ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./ui/dialog";
import { Edit } from "lucide-react";
import { DialogHeader, DialogFooter } from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useToken } from "@/hooks/useToken";

export function UpdateTask({ id, title, type }: UpdateTaskFormData) {
  const updateTaskForm = useForm<UpdateTaskFormData>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      id,
      title,
      type: type ?? "PERSONAL",
    },
  });
  const { token } = useToken();
  const query = useQueryClient();
  const updateTaskMutation = useMutation({
    mutationFn: async (data: UpdateTaskFormData) => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await fetch(`${apiUrl}/tasks/${id}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      return json;
    },
    onSuccess: (data) => {
      if (!data.id) {
        toast.error(data.message || "Erro ao atualizar tarefa");
        return;
      }
      toast.success("Tarefa atualizada com sucesso!");
      query.invalidateQueries({ queryKey: ["get-tasks"] });
    },
    onError: (error) => {
      toast.error("Erro ao atualizar tarefa", {
        description:
          error instanceof Error ? error.message : "Erro desconhecido",
      });
    },
  });
  const onSubmit = (data: UpdateTaskFormData) => {
    updateTaskMutation.mutate(data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" className="hover:bg-primary/70">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Editar tarefa</DialogTitle>
          <DialogDescription>
            Modifique informações da sua tarefa
          </DialogDescription>
        </DialogHeader>
        <Form {...updateTaskForm}>
          <form
            className="w-full grid gap-4"
            onSubmit={updateTaskForm.handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <FormField
              control={updateTaskForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Título
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Digite o título da tarefa"
                      {...field}
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={updateTaskForm.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Tipo</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tipo da tarefa</SelectLabel>
                          <SelectItem value="WORK">trabalho</SelectItem>
                          <SelectItem value="PERSONAL">pessoal</SelectItem>
                          <SelectItem value="STUDY">estudos</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button
                  type="submit"
                  disabled={
                    updateTaskForm.formState.isSubmitting ||
                    updateTaskMutation.isPending
                  }
                  className="w-full py-2 rounded-lg font-semibold text-base bg-primary text-white hover:bg-primary/90 transition disabled:opacity-60"
                >
                  Modificar
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
