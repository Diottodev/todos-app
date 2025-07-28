import { withAppRouter } from "../support/mock-app-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UpdateTask } from "../../src/components/update-task";
import { TaskType, Tasks } from "../../src/schemas";

const queryClient = new QueryClient();

describe("UpdateTask", () => {
  const task: Tasks = {
    id: "1",
    title: "Tarefa para atualizar",
    type: TaskType.PERSONAL,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  it("deve renderizar campos de edição", () => {
    cy.mount(
      withAppRouter(
        <QueryClientProvider client={queryClient}>
          <UpdateTask {...task} />
        </QueryClientProvider>,
      ),
    );
    cy.get("button:has(svg.lucide-square-pen)").first().click();
    cy.get('input[data-slot="form-control"]')
      .first()
      .get('input[name="title"]');
  });

  it("deve exibir botão de modificar", () => {
    cy.mount(
      withAppRouter(
        <QueryClientProvider client={queryClient}>
          <UpdateTask {...task} />
        </QueryClientProvider>,
      ),
    );
    cy.get("button:has(svg.lucide-square-pen)").first().click();
    cy.contains("Modificar").should("exist");
  });
});
