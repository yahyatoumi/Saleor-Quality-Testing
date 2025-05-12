import LoginPage from '../../pages/LoginPage';
import RegistrationPage from '../../pages/RegistrationPage';

describe('User Authentication Flow', () => {
    // Use fixtures to load test data
    // in real life i will be using typescript interfaces
    let testUsers: any;

    before(() => {
        // Load test users from fixture
        cy.fixture('test-users.json').then((userData) => {
            testUsers = userData;
            // Add a timestamp to all email addresses to ensure uniqueness for each test run
            const timestamp = Date.now();
            testUsers.newUser.email = `new-user-${timestamp}@example.com`;
            testUsers.customer.email = `test-customer-${timestamp}@example.com`;
        });
    });

    beforeEach(() => {
        // Clear cookies and local storage before each test
        cy.clearCookies();
        cy.clearLocalStorage();
    });


    it('TC001: Should login successfully with valid credentials', () => {
        // Then try to login with that user
        LoginPage
            .visit()
            .login(testUsers.admin.email, testUsers.admin.password)
            .shouldBeLoggedIn();

        // Verify user account info is visible in user menu
        cy.contains(testUsers.admin.email).should('be.visible');
    });

    // Fails because the application does not allow using user crediantials thats just registerd with the api
    it('TC002 (Will FAILE): because the application does not allow using user crediantials thats just registerd with the api', () => {
        // First create a test user via API to ensure it exists
        cy.createTestUser(testUsers.customer.email, testUsers.customer.password);

        // Then try to login with that user
        LoginPage
            .visit()
            .login(testUsers.costumer.email, testUsers.costumer.password)
            .shouldBeLoggedIn();

        // Verify user account info is visible in user menu
        cy.contains(testUsers.admin.email).should('be.visible');
    });

    it('TC003: Should be able to logout after login', () => {
        // First create and login with a test user
        cy.createTestUser(testUsers.customer.email, testUsers.customer.password);

        LoginPage
            .visit()
            .login(testUsers.admin.email, testUsers.admin.password)
            .shouldBeLoggedIn();

        // Now logout
        LoginPage.logout();

        // Verify login button is visible again
        cy.contains('button', 'Log In').should('be.visible');
    });

    it('TC004: Admin should be able to login', () => {
        LoginPage
            .visit()
            .login(testUsers.admin.email, testUsers.admin.password)
            .shouldBeLoggedIn();

        // Verify admin email is visible in user menu
        LoginPage.openUserMenu();
        cy.contains(testUsers.admin.email).should('be.visible');
    });
});