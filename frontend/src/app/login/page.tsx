import { LoginForm } from "@/components/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entre na sua conta - Minhas tarefas",
  description: "Faça login para acessar suas tarefas",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-2 sm:px-0 bg-background">
      <LoginForm />
    </div>
  );
}
