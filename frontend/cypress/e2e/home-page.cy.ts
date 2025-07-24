/// <reference types="cypress" />

describe("HomePage", () => {
  beforeEach(() => {
    cy.visit("/login");
    window.localStorage.setItem(
      "user",
      JSON.stringify({ name: "Teste", email: "teste@teste.com" }),
    );
    window.localStorage.setItem("access_token", "fake-token");
  });
});
