import z from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .regex(emailRegex, "Email inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .regex(emailRegex, "Email inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export type UpdateTaskStatusData = {
  id: string;
  title: string;
  completed: boolean;
};

export enum TaskType {
  PERSONAL = "PERSONAL",
  WORK = "WORK",
  STUDY = "STUDY",
}

export type Tasks = {
  id: string;
  title: string;
  type: TaskType;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export const taskSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  type: z.enum(TaskType),
});

export const updateTaskSchema = taskSchema.extend({
  id: z.string().min(1, "ID é obrigatório"),
});

export type UpdateTaskFormData = z.infer<typeof updateTaskSchema>;

export type TaskFormData = z.infer<typeof taskSchema>;
