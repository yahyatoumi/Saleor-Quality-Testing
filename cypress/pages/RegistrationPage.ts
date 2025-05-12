class RegistrationPage {
  // Selectors
  private emailInput = '[data-test="email"]';
  private passwordInput = '[data-test="password"]';
  private confirmPasswordInput = '[data-test="confirm-password"]';
  private registerButton = '[data-test="register-button"]';
  private errorMessage = '[data-test="error-message"]';
  private successMessage = '[data-test="success-message"]';
  private loginLink = '[data-test="login-link"]';

  // Navigation
  visit() {
    cy.visit('/account/register/');
    return this;
  }

  // Actions
  fillEmail(email: string) {
    cy.get(this.emailInput).clear().type(email);
    return this;
  }

  fillPassword(password: string) {
    cy.get(this.passwordInput).clear().type(password);
    return this;
  }

  fillConfirmPassword(password: string) {
    cy.get(this.confirmPasswordInput).clear().type(password);
    return this;
  }

  clickRegister() {
    cy.get(this.registerButton).click();
    return this;
  }

  clickLoginLink() {
    cy.get(this.loginLink).click();
    return this;
  }

  // Register method
  register(email: string, password: string) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.fillConfirmPassword(password);
    this.clickRegister();
    return this;
  }

  // Assertions
  shouldShowErrorMessage() {
    cy.get(this.errorMessage).should('be.visible');
    return this;
  }

  shouldShowSuccessMessage() {
    cy.get(this.successMessage).should('be.visible');
    return this;
  }

  shouldBeRedirectedToAccount() {
    cy.url().should('include', '/account/');
    return this;
  }

  shouldShowEmailValidationError() {
    cy.get(this.emailInput).parent().should('contain', 'valid email');
    return this;
  }

  shouldShowPasswordValidationError() {
    cy.get(this.passwordInput).parent().should('contain', 'password');
    return this;
  }

  shouldShowPasswordMismatchError() {
    cy.get(this.confirmPasswordInput).parent().should('contain', 'match');
    return this;
  }
}

export default new RegistrationPage();
