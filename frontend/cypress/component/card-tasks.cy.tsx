import { withAppRouter } from "../support/mock-app-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CardTasks } from "../../src/components/card-tasks";
import { TaskType, Tasks } from "../../src/schemas";

const queryClient = new QueryClient();

describe("CardTasks", () => {
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
          <CardTasks tasks={[task]} />
        </QueryClientProvider>,
      ),
    );

    cy.contains(task.title).should("exist");
  });
});
