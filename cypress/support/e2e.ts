// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Prevent uncaught exceptions from failing tests
Cypress.on('uncaught:exception', (err) => {
    // returning false here prevents Cypress from failing the test
    return false;
});

// Log environment info before tests run
before(() => {
    cy.log(`Running tests against: ${Cypress.config().baseUrl}`);
});

// Clean up after tests
afterEach(() => {
    // Clear local storage, cookies etc.
    cy.clearLocalStorage();
    cy.clearCookies();
});