declare namespace Cypress {
  interface Chainable {
    mockTasks(): Chainable<void>;
    mockLogin(): Chainable<void>;
    mockRegister(): Chainable<void>;
    mount: typeof mount;
  }
}
