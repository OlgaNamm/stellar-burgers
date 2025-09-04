declare namespace Cypress {
  interface Chainable {
    setAuthTokens(): void;
    intercept(method: string, url: string, response?: any): Chainable;
  }
}
