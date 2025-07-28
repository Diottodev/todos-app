/// <reference types="cypress" />

describe("RegisterForm", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("deve exibir o formulário de cadastro", () => {
    cy.get('input[name="name"]').should("be.visible");
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
  });

  it("deve cadastrar novo usuário", () => {
    cy.get('input[name="name"]').type("Novo Usuário");
    cy.get('input[name="email"]').type("novo@teste.com");
    cy.get('input[name="password"]').type("12345678");
    cy.contains("Criar").click();
    cy.url().should("not.include", "/api/register");
  });
});
