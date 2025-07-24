/// <reference types="cypress" />

describe("UpdateTask", () => {
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

  it("deve exibir botão de editar tarefa", () => {
    cy.get(".update-task").should("exist").and("be.visible");
  });

  it("deve atualizar uma tarefa", () => {
    cy.get(".update-task").first().click();
    cy.get('input[name="title"]').clear().type("Tarefa atualizada");
    cy.contains("Salvar").click();
    cy.contains("Tarefa atualizada").should("be.visible");
  });
});
