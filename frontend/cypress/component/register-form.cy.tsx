import { withAppRouter } from "../support/mock-app-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RegisterForm } from "../../src/components/register-form";

const queryClient = new QueryClient();

describe("RegisterForm", () => {
  it("deve renderizar campos de nome, email e senha", () => {
    cy.mount(
      withAppRouter(
        <QueryClientProvider client={queryClient}>
          <RegisterForm />
        </QueryClientProvider>,
      ),
    );

    cy.get('input[name="name"]').should("exist");
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");
  });

  it("deve exibir botão de criar conta", () => {
    cy.mount(
      withAppRouter(
        <QueryClientProvider client={queryClient}>
          <RegisterForm />
        </QueryClientProvider>,
      ),
    );

    cy.contains("Criar conta").should("exist");
  });
});
