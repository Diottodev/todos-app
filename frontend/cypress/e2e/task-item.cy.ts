/// <reference types="cypress" />

describe("TaskItem", () => {
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
        {
          id: 1,
          title: "Tarefa mock",
          description: "Descrição",
          status: "Pendente",
        },
      ]),
    );
  });

  it("deve exibir o título e descrição da tarefa", () => {
    cy.get(".task-item").first().should("be.visible");
    cy.get(".task-item .title").should("exist");
    cy.get(".task-item .description").should("exist");
  });

  it("deve marcar tarefa como concluída", () => {
    cy.get(".task-item .checkbox").first().click();
    cy.contains("Tarefa concluída").should("be.visible");
  });
});
