/// <reference types="cypress" />

describe("TasksPage", () => {
  beforeEach(() => {
    cy.visit("/tasks");
    window.localStorage.setItem(
      "user",
      JSON.stringify({ name: "Teste", email: "teste@teste.com" }),
    );
    window.localStorage.setItem("access_token", "fake-token");
    window.localStorage.setItem(
      "tasks",
      JSON.stringify([
        { id: 1, title: "Tarefa 1" },
        { id: 2, title: "Tarefa 2" },
      ]),
    );
  });

  it("deve exibir a lista de tarefas", () => {
    cy.get(".task-item").should("exist");
  });
});
