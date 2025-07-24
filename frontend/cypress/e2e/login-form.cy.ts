/// <reference types="cypress" />

describe("LoginForm", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("deve exibir o formulário de login", () => {
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
  });

  it("deve logar com credenciais válidas", () => {
    cy.get('input[name="email"]').type("nicolas@teste.com");
    cy.get('input[name="password"]').type("123456");
    cy.contains("Entrar").click();
    cy.url().should("not.include", "/login");
  });
});
