import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    video: false,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
  },
  env: {
    apiUrl: 'http://localhost:8000/graphql/',
    dashboardUrl: 'http://localhost:9000',
    adminEmail: 'admin@example.com',
    adminPassword: 'admin',
    testUserEmail: 'test-user@example.com',
    testUserPassword: 'TestUser123!',
  },
});