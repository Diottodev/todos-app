/* eslint-disable @typescript-eslint/no-namespace */
// cypress/support/component.ts
import { mount } from "cypress/react";
Cypress.Commands.add("mount", mount);
// suporte ao TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}
