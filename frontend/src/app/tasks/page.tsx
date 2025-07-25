"use client";

import { CreateTaskForm } from "@/components/create-task-form";
import { TaskItem } from "@/components/task-item";
import ThemeToggle from "@/components/theme-toggle";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { Skeleton } from "@/components/ui/skeleton";
import { UserMenu } from "@/components/user-menu";
import { useToken } from "@/hooks/useToken";
import type { Tasks } from "@/schemas";
import { TaskType } from "@/schemas";
import { useQuery } from "@tanstack/react-query";

export default function TasksPage() {
  const { getToken } = useToken();
  const query = useQuery<Tasks[]>({
    queryKey: ["get-tasks"],
    queryFn: async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await fetch(`${apiUrl}/tasks`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken() || ""}`,
        },
      });
      if (!res.ok) {
        throw new Error("Falha ao buscar tarefas");
      }
      const json = await res.json();
      return json as Tasks[];
    },
    enabled: !!getToken(),
  });

  const taskPersonal = query.data
    ?.filter((task) => task.type === TaskType.PERSONAL)
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  const taskWork = query.data
    ?.filter((task) => task.type === TaskType.WORK)
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  const taskStudy = query.data
    ?.filter((task) => task.type === TaskType.STUDY)
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

  return (
    <div className="flex flex-col min-h-screen bg-primary/5 dark:bg-zinc-900">
      <header className="flex  w-screen items-center justify-evenly p-4 bg-white dark:bg-zinc-900 shadow-md">
        <UserMenu />
        <div className="flex items-center gap-4">
          <Logo className="w-18 h-18" />
          <h1 className="text-4xl text-primary font-bold">Minhas Tarefas</h1>
        </div>
        <div className="flex items-center gap-4">
          <CreateTaskForm />
          <ThemeToggle />
        </div>
      </header>
      <main className="flex flex-col items-center justify-center w-full p-8">
        {query.isLoading ? (
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="h-12 w-48" />
            <Skeleton className="h-12 w-48" />
            <Skeleton className="h-12 w-48" />
            <Skeleton className="h-12 w-48" />
          </div>
        ) : (
          <>
            <Card className="mx-auto w-full max-w-2xl p-4 sm:p-8 rounded-xl bg-white dark:bg-zinc-900">
              <h2 className="text-2xl font-bold mb-4">Tarefas Pessoais</h2>
              {taskPersonal?.length ? (
                taskPersonal.map((task) => <TaskItem key={task.id} {...task} />)
              ) : (
                <p className="text-muted-foreground">
                  Nenhuma tarefa pessoal encontrada
                </p>
              )}
            </Card>
            <Card className="mx-auto w-full max-w-2xl p-4 sm:p-8 shadow-lg rounded-xl bg-white dark:bg-zinc-900 mt-6">
              <h2 className="text-2xl font-bold mb-4">Tarefas de Trabalho</h2>
              {taskWork?.length ? (
                taskWork.map((task) => <TaskItem key={task.id} {...task} />)
              ) : (
                <p className="text-muted-foreground">
                  Nenhuma tarefa de trabalho encontrada
                </p>
              )}
            </Card>
            <Card className="mx-auto w-full max-w-2xl p-4 sm:p-8 shadow-lg rounded-xl bg-white dark:bg-zinc-900 mt-6">
              <h2 className="text-2xl font-bold mb-4">Tarefas de Estudo</h2>
              {taskStudy?.length ? (
                taskStudy.map((task) => <TaskItem key={task.id} {...task} />)
              ) : (
                <p className="text-muted-foreground">
                  Nenhuma tarefa de estudo encontrada
                </p>
              )}
            </Card>
          </>
        )}
      </main>
    </div>
  );
}
