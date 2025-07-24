"use client";

import { CreateTaskForm } from "@/components/create-task-form";
import { TaskItem } from "@/components/task-item";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { UserMenu } from "@/components/user-menu";
import type { Tasks } from "@/schemas";
import { TaskType } from "@/schemas";

export default function TasksPage() {
  // MOCK: Dados de tarefas para testes Cypress
  const tasks: Tasks[] = [
    {
      id: "1",
      title: "Tarefa pessoal",
      type: TaskType.PERSONAL,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Tarefa de trabalho",
      type: TaskType.WORK,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Tarefa de estudo",
      type: TaskType.STUDY,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
  const taskPersonal = tasks
    ?.filter((task) => task.type === TaskType.PERSONAL)
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  const taskWork = tasks
    ?.filter((task) => task.type === TaskType.WORK)
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  const taskStudy = tasks
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
        <div>
          <CreateTaskForm />
        </div>
      </header>
      <main className="flex flex-col items-center justify-center w-full p-8">
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
      </main>
    </div>
  );
}
