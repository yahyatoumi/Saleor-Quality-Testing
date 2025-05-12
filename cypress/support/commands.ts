// ***********************************************
// Custom commands for Saleor testing
// ***********************************************

import LoginPage from '../pages/LoginPage';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';

declare global {
    namespace Cypress {
        interface Chainable {
            loginUser(email: string, password: string): Chainable<void>;
            loginAdmin(email: string, password: string): Chainable<void>;
            createTestUser(email: string, password: string): Chainable<void>;
            addProductToCart(productSlug: string, quantity?: number): Chainable<void>;
            clearCart(): Chainable<void>;
            graphqlRequest(operation: string, variables?: any): Chainable<any>;
            saveLocalStorage(): Chainable<void>;
            restoreLocalStorage(): Chainable<void>;
        }
    }
}

// Store object to save localStorage items
const LOCAL_STORAGE_MEMORY: Record<string, unknown> = {};

// Custom command to save localStorage
Cypress.Commands.add('saveLocalStorage', () => {
    Object.keys(localStorage).forEach(key => {
        LOCAL_STORAGE_MEMORY[key] = localStorage.getItem(key);
    });
});

// Custom command to restore localStorage
Cypress.Commands.add('restoreLocalStorage', () => {
    Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
        localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key] as string);
    });
});

// Login as regular user
Cypress.Commands.add('loginUser', (email, password) => {
    LoginPage.visit().login(email, password);
    cy.url().should('include', '/account/');
});

// Login as admin user
Cypress.Commands.add('loginAdmin', (email, password) => {
    LoginPage.loginToDashboard(email, password);
    cy.url().should('include', '/dashboard/');
});

// Create a test user using GraphQL API
Cypress.Commands.add('createTestUser', (email, password) => {
    const REGISTER_CUSTOMER = `
    mutation RegisterCustomer($email: String!, $password: String!, $channel: String!) {
      accountRegister(
        input: {
          email: $email,
          password: $password,
          redirectUrl: "${Cypress.config().baseUrl}/account/confirm/",
          channel: $channel
        }
      ) {
        user {
          email
        }
        errors {
          field
          message
        }
      }
    }
  `;

    // Use the default channel slug - typically "default-channel" in Saleor
    const channelSlug = Cypress.env('channelSlug') || 'default-channel';

    cy.graphqlRequest(REGISTER_CUSTOMER, {
        email,
        password,
        channel: channelSlug
    }).then((response) => {
        // If there are errors, check if it's because the user already exists
        if (response.body.data.accountRegister.errors.length > 0) {
            cy.log(`Failed to create test user: ${JSON.stringify(response.body.data.accountRegister.errors)}`);
            const errors = response.body.data.accountRegister.errors;
            const emailExists = errors.some(error =>
                error.field === 'email' &&
                error.message.toLowerCase().includes('already exists')
            );

            // If the error is not about email already existing, fail the test
            if (!emailExists) {
                throw new Error(`Failed to create test user: ${JSON.stringify(errors)}`);
            }

            // If user already exists, we'll try to log in instead
            cy.log('Test user already exists, will use existing account');
        } else {
            cy.log('Created new test user');
        }
    });
});

// Add product to cart
Cypress.Commands.add('addProductToCart', (productSlug, quantity = 1) => {
    ProductPage.visitProductDetails(productSlug);

    if (quantity > 1) {
        ProductPage.setQuantity(quantity);
    }

    ProductPage.addToCart();
    ProductPage.shouldUpdateCartCounter();
});

// Clear shopping cart
Cypress.Commands.add('clearCart', () => {
    CartPage.visit();

    // Check if cart has items before attempting to clear
    cy.get('body').then(($body) => {
        const cartItemSelector = '.cart-item, .line-item, tr.cart-line';
        if ($body.find(cartItemSelector).length > 0) {
            // While there are items in the cart, remove the first one
            cy.get(cartItemSelector).each(($el) => {
                cy.wrap($el).find('.remove-item, button[aria-label*="Remove"]').first().click({ force: true });
                cy.wait(500); // Wait for UI to update
            });
        }
    });
});

// Make GraphQL request
Cypress.Commands.add('graphqlRequest', (operation, variables = {}) => {
    return cy.request({
        method: 'POST',
        url: Cypress.env('apiUrl'),
        body: {
            query: operation,
            variables,
        },
        headers: {
            'Content-Type': 'application/json',
        },
        failOnStatusCode: false,
    });
});