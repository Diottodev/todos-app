/* eslint-disable @typescript-eslint/no-unused-expressions */
/// <reference types="cypress" />

describe("UserMenu", () => {
  beforeEach(() => {
    cy.viewport(1280, 800);
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

  it("deve exibir o nome e email do usuário", () => {
    cy.viewport(1280, 800);
    cy.get("span[data-slot=avatar]").should("contain", "T").first().click();
    cy.get('[data-slot="avatar-fallback"]').should("be.visible");
    cy.get("div").should("contain.text", "teste");
  });

  it("deve realizar logout ao clicar em Sair", () => {
    cy.viewport(1280, 800);
    cy.get('[data-slot="avatar-fallback"]:visible').click();
    cy.contains("Sair").click();
    cy.url().should("include", "/login");
    cy.contains("Logout realizado com sucesso").should("be.visible");
    cy.window().should((win) => {
      expect(win.localStorage.getItem("auth_token")).to.be.null;
    });
  });

  it("deve abrir e fechar o dropdown do menu do usuário", () => {
    cy.viewport(1280, 800);
    cy.get('[data-slot="avatar-fallback"]:visible').first().click();
    cy.get('[data-slot="dropdown-menu-content"]', { timeout: 5000 }).should(
      "be.visible",
    );
    cy.get("body").click(0, 0, { force: true });
    cy.get('[data-slot="dropdown-menu-content"]').should("not.exist");
  });
});
