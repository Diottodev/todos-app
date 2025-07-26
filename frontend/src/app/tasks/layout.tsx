"use client";

import { Header } from "@/components/ui/header";
import { useSession } from "@/hooks/useSession";
import { useToken } from "@/hooks/useToken";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, user } = useSession();
  const { token } = useToken();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

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

  if (!user && !token) {
    redirect("/login");
  }

  return (
    <>
      <div className="flex flex-col min-h-screen min-w-screen bg-primary/5 dark:bg-zinc-900">
        <Header />
        {children}
      </div>
    </>
  );
}
