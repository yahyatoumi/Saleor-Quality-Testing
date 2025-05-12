# Saleor E-commerce Testing Project

This repository contains automated tests for the Saleor e-commerce platform, a modern headless commerce solution built with Python, Django, and GraphQL.

## 📋 Project Overview

As part of a QA testing assessment, this project demonstrates comprehensive test automation for critical user flows in the Saleor e-commerce platform:

- User authentication (register/login/logout)
- Product browsing and search
- Shopping cart operations
- Checkout process

The automation is built using Cypress with TypeScript, implementing the Page Object Model design pattern to provide a maintainable and scalable test suite.

## 🔍 Why Saleor?

Saleor was selected for this assessment because:

1. **Complete E-commerce Solution**: Both frontend and backend components with authentic user flows
2. **Modern Tech Stack**: Django/Python backend, GraphQL API, React frontend
3. **Complex User Flows**: Includes authentication, product browsing, cart management, and checkout
4. **GraphQL API**: Allows for thorough testing of both UI and API endpoints

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v14+)
- npm and pnpm
- Git
- Docker and Docker Compose (for running Saleor)

### Step 1: Install Saleor Backend

1. Follow the official Saleor Docker Compose setup:
   ```
   https://docs.saleor.io/setup/docker-compose
   ```
   - Follow the guide for installation
   - Populate the database with sample data
   - Create an admin account with email: `admin@admin.com` and password: `admin`
     (Or use custom credentials and update them in cypress.config.js)
   - Run the app with docker compose

### Step 2: Install Storefront

1. Clone the Saleor Storefront repository:
   ```
   https://github.com/saleor/storefront
   ```
   - Follow the README guide
   - Make sure port 3000 is free as Cypress expects the app to run on this port
   - Configure the Storefront to connect to your local Saleor API:
     - Set the environment variable to point to `http://localhost:8000/graphql/`

### Step 3: Verify Services

Once running, verify you can access:
- Storefront at http://localhost:3000
- Dashboard at http://localhost:9000
- GraphQL API at http://localhost:8000/graphql/

### Step 4: Set Up Test Project

1. Clone the repository:
   ```bash
   git clone https://github.com/yahyatoumi/Saleor-Quality-Testing.git
   cd saleor-qa-automation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Verify Cypress installation:
   ```bash
   npx cypress verify
   ```

4. Run the tests:
   ```bash
   npx cypress open
   ```

Once Cypress opens, you can select individual test files to run or run the entire test suite.

## 🧪 Running Tests

### Open Cypress Test Runner

```
npx cypress open
```

### Run All Tests Headlessly

```
npm test
```

### Run Specific Test Suites

```
npm run test:auth      # Authentication tests
npm run test:product   # Product browsing tests 
npm run test:checkout  # Checkout process tests
```

## 📁 Project Structure

```
├── cypress/
│   ├── e2e/              # Test specifications
│   │   ├── auth/         # Authentication tests
│   │   ├── product/      # Product browsing tests
│   │   └── checkout/     # Checkout process tests
│   ├── fixtures/         # Test data
│   │   ├── test-users.json        # User credentials
│   │   ├── products.json          # Product data
│   │   └── payment-methods.json   # Payment method data
│   ├── support/          # Custom commands and utilities
│   │   ├── commands.ts            # Custom Cypress commands
│   │   ├── e2e.ts                 # Support file
│   │   └── api-helper.ts          # API testing utility
│   │   └── graphql-operations.ts          # API testing utility
│   └── pages/            # Page objects
├── QA_DOCUMENTATION.md   # Detailed testing approach and methodology
├── BUG_REPORTS.md        # Documentation of discovered issues
├── cypress.config.ts     # Cypress configuration
└── package.json          # Project dependencies
```

## 🔍 Test Coverage

The automated test suite validates these critical user flows:

### 1. User Authentication
- Login with superuser credentials
- Attempt to create and login with API-created users
- Log out successfully after login
- Verify admin login functionality

### 2. Product Browsing
- Add products to cart
- Search for existing products
- Display complete product details
- Add product variants to cart from product details page

### 3. Checkout Process
- Add products to cart
- Update product quantities
- Remove products from cart
- Complete checkout flow (where supported)

## 📝 Known Issues

Several issues were identified during testing. See [BUG_REPORTS.md](./BUG_REPORTS.md) for details on:

1. User authentication issues with API-created accounts
2. Post-login redirection not working as expected
3. Missing user registration UI in storefront

For complete test findings and recommendations, refer to the [QA Documentation](./QA_DOCUMENTATION.md).

## 🔄 Troubleshooting

If you encounter issues running the tests:

1. Verify Saleor and Storefront are running on the expected ports
2. Check network connectivity to the services
3. Ensure you're using the correct admin credentials
4. Try reinstalling Cypress if you experience tool-related issues:
   ```
   npm install cypress --save-dev
   ```

## 📚 Additional Documentation

For detailed information about:
- Testing approach and methodology
- Test case details
- Bug reports and recommendations

See the [QA Documentation](./QA_DOCUMENTATION.md).

## 📝 Author

Yahya Toumi

## 📄 License

MIT