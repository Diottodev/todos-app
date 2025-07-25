import { LoginForm } from "@/components/login-form";

export const metadata = {
  title: "Login",
  description: "Formulário para entrar na aplicação",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-2 sm:px-0 bg-background">
      <LoginForm />
    </div>
  );
}
