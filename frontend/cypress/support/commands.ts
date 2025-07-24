/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add("mockTasks", () => {
  cy.intercept("GET", /\/tasks$/, {
    statusCode: 200,
    body: [
      { id: "1", title: "Tarefa mock", completed: false, type: "PERSONAL" },
      { id: "2", title: "Tarefa 2", completed: true, type: "WORK" },
    ],
  }).as("getTasks");
});

Cypress.Commands.add("mockLogin", () => {
  cy.intercept("POST", /\/auth\/login$/, {
    // (Already moved above, so remove this duplicate)   body: { access_token: 'fake-token', user: { name: 'Novo Usuário', email: 'novo@teste.com' } }
  }).as("login");
});
