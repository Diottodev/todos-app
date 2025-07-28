import { withAppRouter } from "../support/mock-app-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DeleteTaskButton } from "../../src/components/delete-task";
import { TaskType, Tasks } from "../../src/schemas";

const queryClient = new QueryClient();

describe("DeleteTask", () => {
  const task: Tasks = {
    id: "1",
    title: "Tarefa para deletar",
    type: TaskType.PERSONAL,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  it("deve renderizar botão de deletar", () => {
    cy.mount(
      withAppRouter(
        <QueryClientProvider client={queryClient}>
          <DeleteTaskButton {...task} />
        </QueryClientProvider>,
      ),
    );
    cy.get("button:has(svg.lucide-trash2)").should("exist");
  });
});
