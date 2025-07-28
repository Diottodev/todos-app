/// <reference types="cypress" />

describe("CardTasks Component", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/tasks").as("getTasks");
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
    cy.visit("/tasks");
    cy.wait("@getTasks");
  });

  it("deve exibir os títulos dos grupos de tarefas", () => {
    cy.contains("h2", "Tarefas Pessoais", { timeout: 10000 }).should(
      "be.visible",
    );
    cy.contains("h2", "Tarefas de Trabalho", { timeout: 10000 }).should(
      "be.visible",
    );
    cy.contains("h2", "Tarefas de Estudo", { timeout: 10000 }).should(
      "be.visible",
    );
  });

  it("deve exibir título e descrição da primeira tarefa", () => {
    cy.get('[data-testid="task-item"]', { timeout: 10000 })
      .first()
      .within(() => {
        cy.get('[data-testid="task-title"]').should("be.visible");
      });
  });

  it("deve marcar a primeira tarefa como concluída", () => {
    cy.contains("Criar nova tarefa").click();
    cy.get('input[name="title"]').type("Nova tarefa");
    cy.get('button[type="submit"]').click();
    cy.contains("Nova tarefa").should("be.visible");
    cy.get('[data-testid="task-checkbox"]').first().click();
    cy.contains("Tarefa concluída!").should("be.visible");
  });
});
