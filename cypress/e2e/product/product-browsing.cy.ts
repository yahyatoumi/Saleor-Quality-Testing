import ProductPage from '../../pages/ProductPage';

describe('Product Browsing Flow', () => {
    // Load product data from fixtures
    // in real life i will be using typescript interfaces instead of any
    let productData: any;

    before(() => {
        cy.fixture('products.json').then((data) => {
            productData = data;
        });
    });

    beforeEach(() => {
        // Reset state before each test
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('TC004: Should search for products and display results', () => {
        // Using search term from fixture
        const searchTerm = productData.searchTerms.common;
        cy.log(`Searching for: ${searchTerm}`);

        ProductPage
            .visitHomepage()
            .search(searchTerm)
            .shouldShowProducts(1);

        // Verify URL contains search parameter
        cy.url().should('include', `query=${searchTerm}`);
    });

    it('TC006: Should display detailed product information', () => {
        // We'll visit a known product directly - using product from fixture
        const product = productData.testProducts[0];

        ProductPage
            .visitProductDetails(product.slug)
            .shouldShowProductDetails();

        // Verify product has essential details
        cy.get('.product-name, h1, .product-title').should('be.visible');
        cy.get('[data-testid="ProductElement_Price"]').should('be.visible');
        // cy.get('.product-description, .description').should('be.visible');

        // Check if gallery images are loading
        cy.get('.aspect-square, .overflow-hidden, .bg-neutral-50').find('img').should('be.visible');
    });

    it('Should add product to cart from product details page', () => {
        const product = productData.testProducts[0];

        ProductPage
            .visitProductDetails(product.slug)
            .addToCart()
            .shouldUpdateCartCounter();

        // Verify cart notification appears
        // cy.get('.cart-notification, .added-to-cart').should('be.visible');
    });
});