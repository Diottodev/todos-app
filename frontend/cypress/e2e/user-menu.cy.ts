/// <reference types="cypress" />

describe("UserMenu", () => {
  beforeEach(() => {
    cy.visit("/");
    // Simula usuário logado
    window.localStorage.setItem(
      "user",
      JSON.stringify({
        name: "Nicolas Teste",
        email: "nicolas@teste.com",
      }),
    );
    window.localStorage.setItem("access_token", "fake-token");
  });

  it("deve exibir o nome e email do usuário", () => {
    cy.get(".fixed").should("exist").click();
    cy.contains("Nicolas Teste").should("be.visible");
    cy.contains("nicolas@teste.com").should("be.visible");
  });

  it("deve realizar logout ao clicar em Sair", () => {
    cy.get(".fixed").should("exist").click();
    cy.contains("Sair").should("be.visible").click();
    cy.url().should("include", "/login");
  });

  it("deve exibir o avatar com as iniciais do usuário", () => {
    cy.get(".fixed").should("exist").click();
    cy.get(".h-14.w-14.border-2 .bg-secondary").should("contain", "NT");
  });

  it("deve abrir e fechar o dropdown do menu do usuário", () => {
    cy.get(".fixed").should("exist").click();
    cy.contains("Nicolas Teste").should("be.visible");
    cy.get("body").click(0, 0); // Fecha o dropdown
    cy.contains("Nicolas Teste").should("not.exist");
  });

  it("deve exibir fallback de avatar se não houver imagem", () => {
    cy.get(".fixed").should("exist").click();
    cy.get(".h-10.w-10").should("contain", "NT");
  });
});

it("não deve exibir o menu se não houver usuário logado", () => {
  window.localStorage.removeItem("user");
  window.localStorage.removeItem("access_token");
  cy.visit("/");
  cy.get(".fixed").should("not.exist");
});
