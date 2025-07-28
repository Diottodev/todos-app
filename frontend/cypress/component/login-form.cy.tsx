import { withAppRouter } from "../support/mock-app-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoginForm } from "../../src/components/login-form";

const queryClient = new QueryClient();

describe("LoginForm", () => {
  it("deve renderizar campos de email e senha", () => {
    cy.mount(
      withAppRouter(
        <QueryClientProvider client={queryClient}>
          <LoginForm />
        </QueryClientProvider>,
      ),
    );

    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");
  });

  it("deve exibir botão de entrar", () => {
    cy.mount(
      withAppRouter(
        <QueryClientProvider client={queryClient}>
          <LoginForm />
        </QueryClientProvider>,
      ),
    );

    cy.contains("Entrar").should("exist");
  });
});
