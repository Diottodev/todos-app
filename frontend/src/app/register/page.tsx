import { RegisterForm } from "@/components/register-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crie sua conta - Minhas tarefas",
  description: "Formulário de registro para criar uma nova conta",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-2 sm:px-0 bg-background">
      <RegisterForm />
    </div>
  );
}
