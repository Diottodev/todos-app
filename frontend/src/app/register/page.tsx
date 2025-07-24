import { RegisterForm } from "@/components/register-form";

export const metadata = {
  title: "Register",
  description: "Formulário para criar uma nova conta",
};

export default function RegisterPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <RegisterForm />
    </div>
  );
}
