import apiHelpers from '@support/api-helpers';
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

    it('should register a new user', () => {
        const email = `test-user-${Date.now()}@example.com`;
        const password = 'SecurePassword123!';

        apiHelpers.registerUser(email, password).then((response) => {
            expect(response.body.data.accountRegister.errors).to.have.length(0);
            expect(response.body.data.accountRegister.user.email).to.equal(email);
        });
    });
});