"use client";

import { RiLoader2Line } from "@remixicon/react";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatedCard } from "@/components/ui/animated-card";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginSchema, type LoginFormData } from "@/schemas";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  Form,
} from "./ui/form";
import { redirect, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Logo } from "./ui/logo";
import { useToken } from "@/hooks/useToken";
import { useSession } from "@/hooks/useSession";

export function LoginForm() {
  const { user } = useSession();
  const { getToken } = useToken();
  if (user?.id && getToken()) {
    redirect("/tasks");
  }
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });
  const router = useRouter();
  const { setToken } = useToken();
  const emailLoginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      return json;
    },
    onSuccess: (data) => {
      if (!data.access_token) {
        toast.error(data.message || "Erro ao fazer login");
        return;
      }
      toast.success("Login realizado com sucesso!");
      setToken(data.access_token);
      router.push("/tasks");
    },
    onError: (error) => {
      toast.error("Erro ao fazer login com email", {
        description:
          error instanceof Error ? error.message : "Erro desconhecido",
      });
    },
  });
  const onSubmit = (data: LoginFormData) => {
    emailLoginMutation.mutate(data);
  };
  return (
    <AnimatedCard className="mx-auto w-full max-w-md p-2 sm:p-8 shadow-lg rounded-xl bg-white dark:bg-zinc-900">
      <CardHeader className="flex flex-col items-center justify-center gap-2 pb-0">
        <Logo className="w-24 h-24" />
        <CardTitle className="text-center font-bold text-xl sm:text-3xl text-primary">
          Entrar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 pt-0">
        <Form {...loginForm}>
          <form
            className="w-full grid gap-3 sm:gap-4"
            onSubmit={loginForm.handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Digite seu email"
                      {...field}
                      className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Digite sua senha"
                      {...field}
                      className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full py-2 rounded-lg font-semibold text-sm sm:text-base bg-primary dark:text-secondary text-white hover:bg-primary/90 transition disabled:opacity-60"
              disabled={
                emailLoginMutation.isPending || loginForm.formState.isSubmitting
              }
            >
              {emailLoginMutation.isPending ||
              loginForm.formState.isSubmitting ? (
                <>
                  <RiLoader2Line className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center text-muted-foreground text-sm">
          Não tem uma conta?{" "}
          <a
            className="underline underline-offset-4 hover:text-primary transition"
            href="/register"
          >
            Criar conta
          </a>
        </div>
      </CardContent>
    </AnimatedCard>
  );
}
