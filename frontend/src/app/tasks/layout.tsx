"use client";

import { useSession } from "@/hooks/useSession";
import { useToken } from "@/hooks/useToken";
import { redirect } from "next/navigation";
import React from "react";

export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useSession();
  const { getToken } = useToken();
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-background to-muted p-4">
        <div className="flex space-x-2 mb-4">
          <span
            className="block w-3 h-3 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></span>
          <span
            className="block w-3 h-3 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></span>
          <span
            className="block w-3 h-3 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></span>
        </div>
        <span className="text-lg font-semibold">
          Carregando suas tarefas...
        </span>
      </div>
    );
  }
  if (!getToken()) {
    redirect("/login");
    return null;
  }
  return <>{children}</>;
}
