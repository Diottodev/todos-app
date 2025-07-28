import { withAppRouter } from "../support/mock-app-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TaskItem } from "../../src/components/task-item";
import { TaskType, Tasks } from "../../src/schemas";

const queryClient = new QueryClient();

describe("TaskItem", () => {
  const task: Tasks = {
    id: "1",
    title: "Tarefa de exemplo",
    type: TaskType.PERSONAL,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  it("deve renderizar título da tarefa", () => {
    cy.mount(
      withAppRouter(
        <QueryClientProvider client={queryClient}>
          <TaskItem {...task} />
        </QueryClientProvider>,
      ),
    );

    cy.contains(task.title).should("exist");
  });

  it("deve exibir o item da tarefa", () => {
    cy.mount(
      withAppRouter(
        <QueryClientProvider client={queryClient}>
          <TaskItem {...task} />
        </QueryClientProvider>,
      ),
    );

    cy.get('[data-testid="task-item"]').should("exist");
  });
});
