import { withAppRouter } from "../support/mock-app-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UpdateTaskStatus } from "../../src/components/update-task-status";
import { TaskType, Tasks } from "../../src/schemas";

const queryClient = new QueryClient();

describe("UpdateTaskStatus", () => {
  const task: Tasks = {
    id: "1",
    title: "Tarefa para status",
    type: TaskType.PERSONAL,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  it("deve renderizar botão de status", () => {
    cy.mount(
      withAppRouter(
        <QueryClientProvider client={queryClient}>
          <UpdateTaskStatus {...task} />
        </QueryClientProvider>,
      ),
    );

    cy.get("button").should("exist");
  });
});
