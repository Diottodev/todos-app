import { LoginForm } from "@/components/login-form";

export const metadata = {
  title: "Login",
  description: "Formulário para entrar na aplicação",
};

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <LoginForm />
    </div>
  );
}
