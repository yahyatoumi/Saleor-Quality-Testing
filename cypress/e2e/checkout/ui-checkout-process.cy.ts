import ProductPage from '../../pages/ProductPage';
import CartPage from '../../pages/CartPage';
import CheckoutPage from '../../pages/CheckoutPage';

describe('Checkout Process Flow', () => {
    // Load test data from fixtures
    // in real life i will be using typescript interfaces
    let testUsers: any;
    let productData: any;
    let paymentMethods: any;

    before(() => {
        // Load fixtures
        cy.fixture('test-users.json').then((userData) => {
            testUsers = userData;
        });

        cy.fixture('products.json').then((data) => {
            productData = data;
        });

        cy.fixture('payment-methods.json').then((data) => {
            paymentMethods = data;
        });
    });

    beforeEach(() => {
        // Reset state before each test
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.clearCart(); // Custom command to clear cart

        // Add a product to the cart for testing checkout flow
        cy.addProductToCart(productData.testProducts[0].slug);
    });

    it('TC005: Should add product to cart successfully', () => {
        // This tests our setup worked properly
        CartPage
            .visit()
            .shouldHaveItems(1);
    });
});