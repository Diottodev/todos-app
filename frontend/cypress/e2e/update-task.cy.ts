/// <reference types="cypress" />

describe("UpdateTask", () => {
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

  it("deve exibir botão de editar tarefa", () => {
    cy.get("button").should("be.visible");
  });

  it("deve atualizar uma tarefa", () => {
    cy.get("button:has(svg.lucide-square-pen)").first().click();
    cy.get('input[name="title"]').clear().type("Tarefa atualizada");
    cy.get('button:contains("Modificar")').click();
    cy.contains("Tarefa atualizada com sucesso!").should("be.visible");
  });
});
