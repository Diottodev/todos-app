"use client";

import { CardTasks } from "@/components/card-tasks";
import { Header } from "@/components/ui/header";
import { SkeletonTasks } from "@/components/ui/skeleton-tasks";
import { useToken } from "@/hooks/useToken";
import type { Tasks } from "@/schemas";
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
  return (
    <>
      {query.isLoading ? (
        <SkeletonTasks />
      ) : (
        <div className="flex flex-col min-h-screen min-w-screen bg-primary/5 dark:bg-zinc-900">
          <Header />
          <CardTasks tasks={query.data as Tasks[]} />
        </div>
      )}
    </>
  );
}
