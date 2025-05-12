class CheckoutPage {
  // Selectors
  private emailInput = '[data-test="checkout-email"]';
  private firstNameInput = '[data-test="checkout-first-name"]';
  private lastNameInput = '[data-test="checkout-last-name"]';
  private addressInput = '[data-test="checkout-address"]';
  private cityInput = '[data-test="checkout-city"]';
  private postalCodeInput = '[data-test="checkout-postal-code"]';
  private countrySelect = '[data-test="checkout-country"]';
  private phoneInput = '[data-test="checkout-phone"]';
  private shippingMethodOption = '[data-test="shipping-method-option"]';
  private paymentMethodOption = '[data-test="payment-method-option"]';
  private cardNumberInput = '[data-test="card-number"]';
  private cardExpiryInput = '[data-test="card-expiry"]';
  private cardCvcInput = '[data-test="card-cvc"]';
  private billingAddressSameCheckbox = '[data-test="billing-same-as-shipping"]';
  private termsCheckbox = '[data-test="terms-checkbox"]';
  private placeOrderButton = '[data-test="place-order-button"]';
  private continueToShippingButton = '[data-test="continue-to-shipping-button"]';
  private continueToPaymentButton = '[data-test="continue-to-payment-button"]';
  private orderSummaryItem = '[data-test="order-summary-item"]';
  private orderTotal = '[data-test="order-total"]';
  private errorMessage = '[data-test="error-message"]';
  private orderConfirmation = '[data-test="order-confirmation"]';
  private orderNumber = '[data-test="order-number"]';

  // Navigation
  visit() {
    cy.visit('/checkout/');
    return this;
  }

  // Actions
  fillEmailAddress(email: string) {
    cy.get(this.emailInput).clear().type(email);
    return this;
  }

  fillShippingAddress({
    firstName,
    lastName,
    address,
    city,
    postalCode,
    country,
    phone,
  }: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  }) {
    cy.get(this.firstNameInput).clear().type(firstName);
    cy.get(this.lastNameInput).clear().type(lastName);
    cy.get(this.addressInput).clear().type(address);
    cy.get(this.cityInput).clear().type(city);
    cy.get(this.postalCodeInput).clear().type(postalCode);
    cy.get(this.countrySelect).select(country);
    cy.get(this.phoneInput).clear().type(phone);
    return this;
  }

  continueToShipping() {
    cy.get(this.continueToShippingButton).click();
    cy.get(this.shippingMethodOption).should('be.visible'); // Wait for shipping page to load
    return this;
  }

  selectShippingMethod(index = 0) {
    cy.get(this.shippingMethodOption).eq(index).click();
    return this;
  }

  continueToPayment() {
    cy.get(this.continueToPaymentButton).click();
    cy.get(this.paymentMethodOption).should('be.visible'); // Wait for payment page to load
    return this;
  }

  selectPaymentMethod(method: string) {
    cy.get(this.paymentMethodOption).contains(method).click();
    return this;
  }

  fillCreditCardDetails(cardNumber: string, expiry: string, cvc: string) {
    // Note: For real implementation, need to handle iframes if payment form is in iframe
    cy.get(this.cardNumberInput).clear().type(cardNumber);
    cy.get(this.cardExpiryInput).clear().type(expiry);
    cy.get(this.cardCvcInput).clear().type(cvc);
    return this;
  }

  agreeToTerms() {
    cy.get(this.termsCheckbox).check();
    return this;
  }

  placeOrder() {
    cy.get(this.placeOrderButton).click();
    return this;
  }

  completeCheckout({
    email,
    firstName,
    lastName,
    address,
    city,
    postalCode,
    country,
    phone,
    shippingMethodIndex = 0,
    paymentMethod = 'Credit Card',
    cardNumber = '4242424242424242',
    cardExpiry = '12/25',
    cardCvc = '123',
  }: {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
    shippingMethodIndex?: number;
    paymentMethod?: string;
    cardNumber?: string;
    cardExpiry?: string;
    cardCvc?: string;
  }) {
    this.fillEmailAddress(email);
    this.fillShippingAddress({
      firstName,
      lastName,
      address,
      city,
      postalCode,
      country,
      phone,
    });
    this.continueToShipping();
    this.selectShippingMethod(shippingMethodIndex);
    this.continueToPayment();
    this.selectPaymentMethod(paymentMethod);
    
    if (paymentMethod === 'Credit Card') {
      this.fillCreditCardDetails(cardNumber, cardExpiry, cardCvc);
    }
    
    this.agreeToTerms();
    this.placeOrder();
    return this;
  }

  // Assertions
  shouldShowOrderConfirmation() {
    cy.get(this.orderConfirmation).should('be.visible');
    cy.get(this.orderNumber).should('be.visible');
    return this;
  }

  shouldShowPaymentError() {
    cy.get(this.errorMessage).should('be.visible');
    cy.get(this.errorMessage).should('contain', 'payment');
    return this;
  }

  shouldShowValidationError() {
    cy.get(this.errorMessage).should('be.visible');
    return this;
  }

  shouldHaveCorrectOrderSummary(itemCount: number) {
    cy.get(this.orderSummaryItem).should('have.length', itemCount);
    cy.get(this.orderTotal).should('be.visible');
    return this;
  }
}

export default new CheckoutPage();
