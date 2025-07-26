"use client";

import { CardTasks } from "@/components/card-tasks";
import { useSession } from "@/hooks/useSession";
import { useToken } from "@/hooks/useToken";
import type { Tasks } from "@/schemas";
import { useSuspenseQuery } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import React, { Suspense } from "react";
import Loading from "./loading";

export default function TasksPage() {
  const { user } = useSession();
  const { token } = useToken();
  const router = useRouter();
  React.useEffect(() => {
    if (!token && !user?.id) {
      redirect("/login");
    }
  }, [user, token, router]);
  const query = useSuspenseQuery<Tasks[]>({
    queryKey: ["get-tasks"],
    queryFn: async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await fetch(`${apiUrl}/tasks`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Falha ao buscar tarefas");
      }
      const json = await res.json();
      return json as Tasks[];
    },
  });
  return (
    <Suspense fallback={<Loading />}>
      <CardTasks tasks={query.data as Tasks[]} />
    </Suspense>
  );
}
