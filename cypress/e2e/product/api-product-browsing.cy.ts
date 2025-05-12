import apiHelpers from '@support/api-helpers';

describe('Product Api test', () => {
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


    it('get product details', () => {
        const slug = 'apple-juice'; // Replace with a valid product slug

        apiHelpers.getProductDetails(slug).then((response) => {
            console.log(response.body);
            expect(response.body.data.product).to.exist;
            expect(response.body.data.product.slug).to.equal(slug);
        });
    });

    it('create new product', () => {
        // const slug = 'apple-juice'; // Replace with a valid product slug

        // apiHelpers.getProductDetails(slug).then((response) => {
        //     console.log(response.body);
        //     expect(response.body.data.product).to.exist;
        //     expect(response.body.data.product.slug).to.equal(slug);
        // });
    });
});