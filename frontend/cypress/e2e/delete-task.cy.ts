/// <reference types="cypress" />

describe("DeleteTask", () => {
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

  it("deve exibir botão de deletar tarefa", () => {
    cy.get(".delete-task").should("exist").and("be.visible");
  });

  it("deve deletar uma tarefa", () => {
    cy.get(".delete-task").first().click();
    cy.contains("Tarefa deletada").should("be.visible");
  });
});
