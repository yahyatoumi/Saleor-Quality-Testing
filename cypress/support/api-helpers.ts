import * as operations from './graphql-operations';

class ApiHelper {
  private token: string | null = null;

  /**
   * Executes a GraphQL operation with the provided variables
   */
  executeOperation(operation: string, variables: object = {}) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `JWT ${this.token}`;
    }

    return cy.request({
      method: 'POST',
      url: Cypress.env('apiUrl'),
      body: {
        query: operation,
        variables,
      },
      headers,
      failOnStatusCode: false,
    });
  }

  /**
   * Logs in a user and stores the JWT token
   */
  login(email: string, password: string) {
    return this.executeOperation(operations.LOGIN_USER, {
      email,
      password,
    }).then((response) => {
      if (
        response.body.data?.tokenCreate?.token &&
        !response.body.data.tokenCreate.errors?.length
      ) {
        this.token = response.body.data.tokenCreate.token;
      }
      return response;
    });
  }

  /**
   * Registers a new user account
   */
  registerUser(email: string, password: string) {
    return this.executeOperation(operations.REGISTER_USER, {
      email,
      password,
      redirectUrl: `${Cypress.config().baseUrl}/account/confirm/`,
    });
  }

  /**
   * Gets product details by slug
   */
  getProductDetails(slug: string) {
    return this.executeOperation(operations.GET_PRODUCT_DETAILS, {
      slug,
    });
  }

  /**
   * Searches for products
   */
  searchProducts(searchTerm: string, limit = 20) {
    return this.executeOperation(operations.SEARCH_PRODUCTS, {
      search: searchTerm,
      first: limit,
    });
  }

  /**
   * Creates a checkout session
   * 
   * @param email Customer email
   * @param lines Array of checkout lines with variant ID and quantity
   */
  createCheckout(email: string, lines: Array<{ variantId: string; quantity: number }>) {
    return this.executeOperation(operations.CREATE_CHECKOUT, {
      email,
      lines,
    });
  }

  /**
   * Adds shipping address to checkout
   */
  addShippingAddress(checkoutId: string, address: {
    firstName: string;
    lastName: string;
    streetAddress1: string;
    city: string;
    postalCode: string;
    country: string;
    phone?: string;
  }) {
    return this.executeOperation(operations.ADD_SHIPPING_ADDRESS, {
      checkoutId,
      shippingAddress: address,
    });
  }

  /**
   * Completes checkout
   */
  completeCheckout(checkoutId: string) {
    return this.executeOperation(operations.COMPLETE_CHECKOUT, {
      checkoutId,
    });
  }

  /**
   * Gets user orders
   */
  getUserOrders() {
    return this.executeOperation(operations.GET_USER_ORDERS);
  }

  /**
   * Clears the stored token
   */
  clearToken() {
    this.token = null;
  }
}

export default new ApiHelper();