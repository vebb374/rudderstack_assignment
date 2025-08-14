# RudderStack E2E Test Automation Framework

This repository contains an end-to-end test automation framework for the RudderStack platform, built with Playwright, Cucumber.js, and TypeScript.

## 🚀 Features

-   **BDD Approach**: Uses Cucumber.js for writing tests in a human-readable Gherkin syntax.
-   **Page Object Model (POM)**: Implements the POM design pattern for maintainable and reusable UI tests.
-   **Multi-Environment Testing**: Supports testing against different environments (e.g., staging, production) using `.env` files.
-   **CI/CD Integration**: Includes a GitHub Actions workflow for automated daily test runs.
-   **Code Quality**: Enforces code quality with ESLint and Prettier.

## 🛠️ Tech Stack

-   **Browser Interaction**: [Playwright](https://playwright.dev/)
-   **Test Runner**: [Cucumber.js](https://cucumber.io/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **CI/CD**: [GitHub Actions](https://github.com/features/actions)

## 📦 Prerequisites

-   Node.js (v20 or higher)
-   npm

## ⚙️ Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/rudderstack_assignment.git
    cd rudderstack_assignment
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Install Playwright browsers:**
    ```bash
    npx playwright install --with-deps chromium
    ```

4.  **Set up environment variables:**

    Create `.env` files for each environment you want to test against. For example, for the production environment, create a `.env.production` file by copying the example file:

    ```bash
    cp .env.production.example .env.production
    ```

    Then, update the `.env.production` file with your credentials:

    ```env
    HEADLESS=true
    BASEURL="app.rudderstack.com"
    ```

## ▶️ Running Tests

You can run the tests for a specific environment using the following npm scripts:

-   **Run tests against the production environment:**
    ```bash
    npm run test:production
    ```

-   **Run tests against the staging environment:**
    ```bash
    npm run test:staging
    ```

## 📊 Test Reports

After running the tests, you can find the test reports in the `test-results` directory. The following reports are generated:

-   **Cucumber JSON Report**: `test-results/cucumber-report.json`
-   **Cucumber HTML Report**: `test-results/cucumber-report.html`

##  linting and formatting

-   **Linting**:
    ```bash
    npm run lint
    ```
-   **Formatting**:
    ```bash
    npm run format
    ```

## 📝 Test Scenarios

The test scenarios are defined in `.feature` files located in the `features` directory. The main test scenario covers the following end-to-end flow:

1.  Log in to the RudderStack application.
2.  Retrieve the Data Plane URL and a Source's Write Key from the UI.
3.  Send a `track` event to the Source using the retrieved data.
4.  Verify that the event is successfully delivered to a connected Webhook Destination by checking the event count in the UI.

## 📂 Folder Structure

The project follows a feature-centric structure, where all files related to a specific feature (e.g., login, connections) are grouped together.

```
/
├── .github/                    # GitHub Actions workflows
├── features/                   # Test implementation
│   ├── authentication/         # Authentication feature
│   ├── common/                 # Common UI components
│   ├── connections/            # Connections feature
│   └── shared/                 # Shared code (hooks, utils, etc.)
├── test-data/                  # Test data and accounts
│   ├── accounts/               # Account credentials
│   ├── factories/              # Test data factories
│   └── fixtures/               # Static test data
├── .cursor-rules/              # Cursor AI rules and guidelines
├── test-results/               # Test reports and traces
├── cucumber.js                 # Cucumber configuration
├── package.json                # Project dependencies and scripts
├── playwright.config.ts        # Playwright configuration
└── tsconfig.json               # TypeScript configuration
```

