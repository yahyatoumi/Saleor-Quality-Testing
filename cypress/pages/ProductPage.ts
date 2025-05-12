class ProductPage {
  // Selectors
  private searchInput = 'input[type="text"]';
  private searchButton = 'button[type="submit"]';

  private productCard = '[data-testid="ProductList"]';

  private variantCard = '[data-testid="VariantSelector"]';

  private productTitle = 'h1.text-3xl';
  private productPrice = '[data-testid="ProductElement_Price"]';

  private addToCartButton = 'button:contains("Add to cart"), button:contains("Add to basket"), [aria-label*="Add to cart"]';
  private quantityInput = 'input[type="number"], input.quantity-input';
  private categoryFilter = '.category-filter, .filters [aria-label*="category"]';
  private priceFilter = '.price-filter, .filters [aria-label*="price"]';
  private sortDropdown = 'select.sort-by, [aria-label*="Sort"]';
  private productDescription = '.product-description, .description';
  private productGallery = '.product-gallery, .gallery';
  private cartCounter = '.cart-counter, .cart-items-count';
  private cartIcon = '[data-testid="CartNavItem"]';
  private noResultsMessage = '.no-results, .no-products-found';


  // Navigation
  visitHomepage() {
    cy.visit('/');
    return this;
  }

  visitProductCategory(category: string) {
    cy.visit(`/category/${category}/`);
    return this;
  }

  visitProductDetails(productSlug: string) {
    cy.visit(`/default-channel/products/${productSlug}/`);
    return this;
  }

  // Actions
  search(query: string) {
    cy.get(this.searchInput).clear().type(query);
    cy.get(this.searchButton).click();
    return this;
  }

  clickProduct(index = 0) {
    cy.get(this.productCard).eq(index).click();
    return this;
  }

  addToCart() {
    cy.get(this.addToCartButton).click();
    return this;
  }

  setQuantity(quantity: number) {
    cy.get(this.quantityInput).clear().type(quantity.toString());
    return this;
  }

  selectCategory(category: string) {
    cy.get(this.categoryFilter).contains(category).click();
    return this;
  }

  setPriceRange(min: number, max: number) {
    // Implementation depends on the specific price filter UI
    cy.get(this.priceFilter).within(() => {
      cy.get('[data-test="price-min"]').clear().type(min.toString());
      cy.get('[data-test="price-max"]').clear().type(max.toString());
      cy.get('[data-test="apply-price"]').click();
    });
    return this;
  }

  sortBy(option: string) {
    cy.get(this.sortDropdown).click();
    cy.contains(option).click();
    return this;
  }

  viewCart() {
    cy.get(this.cartIcon).click();
    return this;
  }

  // Assertions
  shouldShowProducts(count: number) {
    cy.get(this.productCard).should('have.length.at.least', count);
    return this;
  }

  shouldShowNoResults() {
    cy.contains('Nothing found :(').should('be.visible');
    return this;
  }

  shouldShowProductDetails() {
    cy.get(this.productTitle).should('be.visible');
    cy.get(this.productPrice).should('be.visible');
    // cy.get(this.productDescription).should('be.visible');
    return this;
  }

  shouldUpdateCartCounter() {
    cy.get(this.cartIcon).contains("1").should('be.visible');
    // cy.get(this.cartCounter).should('not.have.text', '0');
    return this;
  }

  shouldHaveProductWithName(name: string) {
    cy.get(this.productTitle).contains(name).should('exist');
    return this;
  }
}

export default new ProductPage();
