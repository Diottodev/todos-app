import { CreateTaskForm } from "../create-task-form";
import ThemeToggle from "../theme-toggle";
import { UserMenu } from "../user-menu";
import { Logo } from "./logo";

export function Header() {
  return (
    <header className="flex  w-screen items-center justify-evenly p-4 bg-white dark:bg-zinc-900 shadow-md">
      <UserMenu />
      <div className="flex items-center gap-4">
        <Logo className="w-18 h-18" />
        <h1 className="text-4xl text-primary font-bold">Minhas Tarefas</h1>
      </div>
      <div className="flex items-center gap-4">
        <CreateTaskForm />
        <ThemeToggle />
      </div>
    </header>
  );
}
