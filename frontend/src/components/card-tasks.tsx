import React from "react";
import { TaskType, type Tasks } from "@/schemas";
import { TaskItem } from "./task-item";
import { Card } from "./ui/card";

type Props = {
  tasks: Tasks[];
};

export function CardTasks({ tasks }: Props) {
  const taskPersonal = React.useMemo(
    () =>
      tasks
        ?.filter((task) => task.type === TaskType.PERSONAL)
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
    [tasks],
  );
  const taskWork = React.useMemo(
    () =>
      tasks
        ?.filter((task) => task.type === TaskType.WORK)
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
    [tasks],
  );
  const taskStudy = React.useMemo(
    () =>
      tasks
        ?.filter((task) => task.type === TaskType.STUDY)
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
    [tasks],
  );
  return (
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
  );
}
