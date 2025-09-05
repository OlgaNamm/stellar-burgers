import type {} from './commands';
// cypress/support/commands.ts
Cypress.Commands.add('setAuthTokens', () => {
  window.localStorage.setItem('accessToken', 'test-access-token');
  cy.setCookie('refreshToken', 'test-refresh-token');
});

