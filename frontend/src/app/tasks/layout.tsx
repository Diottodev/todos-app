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
  const { user, loading } = useSession();
  const { getToken } = useToken();
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Carregando...
      </div>
    );
  }
  if (!user || !getToken()) {
    redirect("/login");
    return null;
  }
  return <>{children}</>;
}
