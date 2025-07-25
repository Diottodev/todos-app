"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { taskSchema, type Tasks, type TaskType } from "@/schemas";
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
import { DialogHeader, DialogFooter } from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useToken } from "@/hooks/useToken";

export function CreateTaskForm() {
  const createTaskForm = useForm<Pick<Tasks, "title" | "type">>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      type: "PERSONAL" as TaskType,
    },
  });
  const query = useQueryClient();
  const { getToken } = useToken();
  const createTaskMutation = useMutation({
    mutationFn: async (data: Pick<Tasks, "title" | "type">) => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await fetch(`${apiUrl}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      return json;
    },
    onSuccess: (data) => {
      if (!data.id) {
        toast.error(data.message || "Erro ao criar tarefa");
        return;
      }
      toast.success("Tarefa criada com sucesso!");
      createTaskForm.reset();
      query.invalidateQueries({ queryKey: ["get-tasks"] });
    },
    onError: () => {
      createTaskForm.reset();
      toast.error("Erro ao criar tarefa");
    },
  });
  const onSubmit = (data: Pick<Tasks, "title" | "type">) => {
    createTaskMutation.mutate(data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Criar nova tarefa</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-lg sm:max-w-[625px] p-2 sm:p-6">
        <DialogHeader>
          <DialogTitle>Criar tarefa</DialogTitle>
          <DialogDescription>Preencha os campos necessários</DialogDescription>
        </DialogHeader>
        <Form {...createTaskForm}>
          <form
            className="w-full grid gap-3 sm:gap-4"
            onSubmit={createTaskForm.handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <FormField
              control={createTaskForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Título*
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Digite o título da tarefa"
                      {...field}
                      className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={createTaskForm.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Tipo</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full text-sm sm:text-base">
                        <SelectValue placeholder="Selecione um tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="WORK">Trabalho</SelectItem>
                          <SelectItem value="PERSONAL">Pessoal</SelectItem>
                          <SelectItem value="STUDY">Estudos</SelectItem>
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
                    createTaskForm.formState.isSubmitting ||
                    createTaskMutation.isPending
                  }
                  className="w-full py-2 rounded-lg font-semibold text-sm sm:text-base bg-primary text-white hover:bg-primary/90 transition disabled:opacity-60"
                >
                  Criar tarefa
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
