import { RegisterForm } from "@/components/register-form";

export const metadata = {
  title: "Register",
  description: "Formulário para criar uma nova conta",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-2 sm:px-0 bg-background">
      <RegisterForm />
    </div>
  );
}
