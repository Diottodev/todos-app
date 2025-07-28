/// <reference types="cypress" />

// Remove the module augmentation from the test file.
// Move the Chainable interface extension to a separate .d.ts file (see below).

// The Chainable interface extension has been moved to a separate .d.ts file.

describe("CreateTaskForm", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:8080/api/auth/login", {
      email: "nicodiottodev@gmail.com",
      password: "12345678",
    }).then((response) => {
      const authData = response.body;
      cy.visit("/tasks", {
        onBeforeLoad(win) {
          win.localStorage.setItem("user", JSON.stringify(authData.user));
          win.localStorage.setItem("auth_token", authData.access_token);
        },
      });
    });
  });

  it("deve exibir o formulário de criação de tarefa", () => {
    cy.contains("Criar").should("be.visible");
  });

  it("deve criar uma nova tarefa", () => {
    cy.contains("Criar nova tarefa").click();
    cy.get('input[name="title"]').type("Nova tarefa");
    cy.get('button[type="submit"]').click();
    cy.contains("Nova tarefa").should("be.visible");
  });
});
