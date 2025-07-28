import { withAppRouter } from "../support/mock-app-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CreateTaskForm } from "../../src/components/create-task-form";

const queryClient = new QueryClient();

describe("CreateTaskForm", () => {
  it("deve renderizar campo de título", () => {
    cy.mount(
      withAppRouter(
        <QueryClientProvider client={queryClient}>
          <CreateTaskForm />
        </QueryClientProvider>,
      ),
    );
    cy.contains("Criar nova tarefa").click();
    cy.get('input[name="title"]').type("Nova tarefa");
  });

  it("deve exibir botão de criar tarefa", () => {
    cy.mount(
      withAppRouter(
        <QueryClientProvider client={queryClient}>
          <CreateTaskForm />
        </QueryClientProvider>,
      ),
    );
    cy.contains("Criar nova tarefa").click();
    cy.contains("Criar tarefa").should("exist");
  });
});
