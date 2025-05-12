class LoginPage {
  // Selectors
  private emailInput = 'input[type="email"], input[name="email"]';
  private passwordInput = 'input[type="password"], input[name="password"]';
  private signInButton = 'button:contains("Log In"), button:contains("Sign In"), button:contains("Login"), button.login-button, button[type="submit"]:contains("Log")';
  private forgotPasswordLink = 'a[href*="forgot-password"], a[href*="reset-password"]';
  private registerLink = 'a[href*="register"], a[href*="signup"]';
  private errorMessage = '.alert-error, .error-message, [role="alert"]';
  private userMenuButton = '.rounded-full, button[aria-haspopup="menu"]';
  
  private logoutButton = 'button:contains("Log Out")';

  // Navigation
  visit() {
    cy.visit('/account/login/');
    return this;
  }

  visitDashboard() {
    cy.visit(`${Cypress.env('dashboardUrl')}/login/`);
    return this;
  }

  // Actions
  fillEmail(email: string) {
    cy.get(this.emailInput).first().clear().type(email);
    return this;
  }

  fillPassword(password: string) {
    cy.get(this.passwordInput).first().clear().type(password);
    return this;
  }

  clickSignIn() {
    // First try to find the specific button by its text content
    cy.contains('button', 'Log In').click({ force: true });
    return this;
  }

  clickForgotPassword() {
    cy.get(this.forgotPasswordLink).first().click();
    return this;
  }

  clickRegister() {
    cy.get(this.registerLink).first().click();
    return this;
  }

  openUserMenu() {
    cy.get(this.userMenuButton).first().click();
    return this;
  }

  logout() {
    this.openUserMenu();
    cy.get(this.logoutButton).click();
    return this;
  }

  // Login methods
  login(email: string, password: string) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.clickSignIn();
    return this;
  }

  loginToDashboard(email: string, password: string) {
    this.visitDashboard();
    this.fillEmail(email);
    this.fillPassword(password);
    this.clickSignIn();
    return this;
  }

  // Assertions
  shouldShowErrorMessage() {
    cy.get(this.errorMessage).should('be.visible');
    return this;
  }

  shouldBeRedirectedToAccount() {
    cy.url().should('include', '/account/');
    return this;
  }

  shouldBeRedirectedToDashboard() {
    cy.url().should('include', '/dashboard/');
    return this;
  }

  shouldBeLoggedIn() {
    // Check for user menu button
    cy.get(this.userMenuButton).should('be.visible');
    // Open it and check for user email and logout option
    this.openUserMenu();
    cy.contains('Log Out').should('be.visible');
    return this;
  }
}

export default new LoginPage();