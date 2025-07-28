/// <reference types="cypress" />

describe("DeleteTask", () => {
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

  it("deve exibir botão de deletar tarefa", () => {
    cy.get("button").should("be.visible");
  });

  it("deve deletar uma tarefa", () => {
    cy.get("button:has(svg.lucide-trash2)").first().click();
    cy.get('button:contains("Excluir")').click();
    cy.contains("Tarefa removida com sucesso.").should("be.visible");
  });
});
