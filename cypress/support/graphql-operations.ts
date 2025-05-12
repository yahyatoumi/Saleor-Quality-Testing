// GraphQL queries and mutations used for testing

export const LOGIN_USER = `
  mutation TokenAuth($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      token
      refreshToken
      errors {
        field
        message
      }
      user {
        id
        email
      }
    }
  }
`;

export const REGISTER_USER = `
  mutation RegisterAccount($email: String!, $password: String!, $redirectUrl: String!) {
    accountRegister(
      input: {
        email: $email
        password: $password
        redirectUrl: $redirectUrl
      }
    ) {
      user {
        email
        isActive
      }
      errors {
        field
        message
      }
    }
  }
`;

export const GET_PRODUCT_DETAILS = `
  query ProductDetails($slug: String!) {
    product(slug: $slug) {
      id
      name
      slug
      description
      pricing {
        priceRange {
          start {
            gross {
              amount
              currency
            }
          }
        }
      }
      category {
        name
      }
      images {
        id
        url
        alt
      }
    }
  }
`;

export const SEARCH_PRODUCTS = `
  query SearchProducts($search: String!, $first: Int!) {
    products(first: $first, filter: { search: $search }) {
      edges {
        node {
          id
          name
          slug
          thumbnail {
            url
            alt
          }
          category {
            name
          }
          pricing {
            priceRange {
              start {
                gross {
                  amount
                  currency
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const CREATE_CHECKOUT = `
  mutation CreateCheckout($email: String!, $lines: [CheckoutLineInput!]!) {
    checkoutCreate(
      input: {
        email: $email
        lines: $lines
      }
    ) {
      checkout {
        id
        token
      }
      errors {
        field
        message
      }
    }
  }
`;

export const ADD_SHIPPING_ADDRESS = `
  mutation AddShippingAddress(
    $checkoutId: ID!
    $shippingAddress: AddressInput!
  ) {
    checkoutShippingAddressUpdate(
      shippingAddress: $shippingAddress
      id: $checkoutId
    ) {
      checkout {
        id
      }
      errors {
        field
        message
      }
    }
  }
`;

export const COMPLETE_CHECKOUT = `
  mutation CompleteCheckout($checkoutId: ID!) {
    checkoutComplete(id: $checkoutId) {
      order {
        id
        number
      }
      errors {
        field
        message
      }
    }
  }
`;

export const GET_USER_ORDERS = `
  query GetUserOrders {
    me {
      orders(first: 10) {
        edges {
          node {
            id
            number
            created
            status
            total {
              gross {
                amount
                currency
              }
            }
          }
        }
      }
    }
  }
`;