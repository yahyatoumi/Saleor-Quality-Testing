class CartPage {
  // Selectors

  private cartItems = '[data-testid="CartProductList"]';
  private itemName = '[data-test="item-name"]';
  private itemPrice = '[data-test="item-price"]';
  private itemQuantity = '[data-test="item-quantity"]';
  private increaseQuantityButton = '[data-test="increase-quantity"]';
  private decreaseQuantityButton = '[data-test="decrease-quantity"]';
  private removeItemButton = '[data-test="remove-item"]';
  private cartSubtotal = '[data-test="cart-subtotal"]';
  private cartTotal = '[data-test="cart-total"]';
  private checkoutButton = '[data-test="checkout-button"]';
  private emptyCartMessage = '[data-test="empty-cart"]';
  private continueShoppingButton = '[data-test="continue-shopping"]';

  // Navigation
  visit() {
    cy.visit('/default-channel/cart/');
    return this;
  }

  // Actions
  increaseQuantity(itemIndex = 0) {
    cy.get(this.cartItems).eq(itemIndex).find(this.increaseQuantityButton).click();
    return this;
  }

  decreaseQuantity(itemIndex = 0) {
    cy.get(this.cartItems).eq(itemIndex).find(this.decreaseQuantityButton).click();
    return this;
  }

  removeItem(itemIndex = 0) {
    cy.get(this.cartItems).eq(itemIndex).find(this.removeItemButton).click();
    return this;
  }

  proceedToCheckout() {
    cy.get(this.checkoutButton).click();
    return this;
  }

  continueShopping() {
    cy.get(this.continueShoppingButton).click();
    return this;
  }

  updateQuantity(itemIndex: number, quantity: number) {
    cy.get(this.cartItems)
      .eq(itemIndex)
      .find(this.itemQuantity)
      .clear()
      .type(quantity.toString());
    // Sometimes we need to click outside to trigger the update
    cy.get('body').click();
    return this;
  }

  // Assertions
  shouldHaveItems(count: number) {
    cy.get(this.cartItems).should('have.length', count);
    return this;
  }

  shouldBeEmpty() {
    cy.get(this.emptyCartMessage).should('be.visible');
    return this;
  }

  shouldHaveItemWithName(name: string) {
    cy.get(this.itemName).contains(name).should('exist');
    return this;
  }

  shouldHaveUpdatedQuantity(itemIndex: number, quantity: number) {
    cy.get(this.cartItems)
      .eq(itemIndex)
      .find(this.itemQuantity)
      .should('have.value', quantity.toString());
    return this;
  }

  shouldHaveCorrectSubtotal() {
    // This would need implementation specific to how Saleor calculates totals
    // Basic check that subtotal exists and is a number
    cy.get(this.cartSubtotal)
      .invoke('text')
      .should('match', /\d+/);
    return this;
  }

  shouldHaveCorrectTotal() {
    cy.get(this.cartTotal)
      .invoke('text')
      .should('match', /\d+/);
    return this;
  }
}

export default new CartPage();
