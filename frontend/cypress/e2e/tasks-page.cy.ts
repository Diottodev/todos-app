/// <reference types="cypress" />

describe("TasksPage", () => {
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

  it("deve exibir a lista de tarefas", () => {
    cy.contains("Minhas tarefas").should("exist");
  });
});
