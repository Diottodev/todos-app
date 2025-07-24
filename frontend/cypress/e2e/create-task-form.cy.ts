/// <reference types="cypress" />

// Remove the module augmentation from the test file.
// Move the Chainable interface extension to a separate .d.ts file (see below).

// The Chainable interface extension has been moved to a separate .d.ts file.

describe("CreateTaskForm", () => {
  beforeEach(() => {
    cy.mockTasks();
    cy.visit("/tasks");
    window.localStorage.setItem(
      "user",
      JSON.stringify({ name: "Teste", email: "teste@teste.com" }),
    );
    window.localStorage.setItem("access_token", "fake-token");
  });

  it("deve exibir o formulário de criação de tarefa", () => {
    cy.contains("Criar").should("be.visible");
  });

  it("deve criar uma nova tarefa", () => {
    cy.get('input[name="title"]').type("Nova tarefa");
    cy.contains("Criar").click();
    cy.contains("Nova tarefa").should("be.visible");
  });
});
