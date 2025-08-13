# RudderStack E2E Test Automation Plan

## 1. Introduction

This document outlines the test plan for the RudderStack SDET assignment. The goal is to create a robust, maintainable, and automated test framework to validate a critical end-to-end user flow on the RudderStack platform. The framework will be built using Playwright, Cucumber.js, and TypeScript, following best practices in software testing and automation.

## 2. Scope

### 2.1. In Scope

The automation will cover the following core functionalities as specified in the assignment:
- **User Authentication**: Logging into the RudderStack application.
- **Data Retrieval from UI**:
    - Reading and storing the Data Plane URL from the Connections page.
    - Reading and storing the Write Key for a pre-configured HTTP Source.
- **API Interaction**:
    - Sending a `track` event to the HTTP Source endpoint using the retrieved Data Plane URL and Write Key.
- **Event Verification in UI**:
    - Navigating to a pre-configured Webhook Destination.
    - Accessing the "Events" tab.
    - Reading and verifying the count of "Delivered" and "Failed" events.

### 2.2. Out of Scope

The following items are considered out of scope for this assignment:
- The manual setup process (account creation, source/destination configuration).
- Comprehensive testing of all RudderStack features.
- UI/UX testing, including visual regression and responsive design validation.
- Performance, load, or stress testing.
- Security testing beyond basic credential management.
- Testing across multiple browser types (the framework will target a single browser, e.g., Chromium).
- Compatibility testing with different operating systems.

## 3. Test Strategy & Approach

### 3.1. Automation Framework

- **Core Library**: Playwright for browser interaction.
- **Test Runner**: Cucumber.js for Behavior-Driven Development (BDD).
- **Language**: TypeScript for type safety and improved maintainability.

### 3.2. Design Pattern

- **Page Object Model (POM)**: The framework will use the POM pattern to separate UI elements and interaction logic from the test cases. This enhances reusability and makes maintenance easier. Each page (e.g., Login, Connections, Destination) will have its own POM class.

### 3.3. Test Data Management

#### 3.3.1. Test Credentials Management

**Local Development:**
- Sensitive data like usernames and passwords are managed using environment-specific `.env` files
- Example files provided: `.env.staging.example` and `.env.production.example`
- Developers copy example files and populate with actual credentials locally
- `.env` files are excluded from version control via `.gitignore`

**Environment-Specific Credentials:**
- **Staging Environment**: Uses dedicated test accounts for staging.rudderstack.com
- **Production Environment**: Uses separate test accounts for app.rudderstack.com
- Each environment maintains isolated test data and configurations

**CI/CD Security:**
- Credentials stored securely using GitHub Actions repository secrets
- Environment variables: `USERNAME` and `PASSWORD`
- Secrets are injected at runtime and never exposed in logs
- Matrix strategy allows testing against multiple environments with same credentials structure

**Credential Requirements:**
- Valid RudderStack Cloud account credentials for each environment
- Accounts must have access to pre-configured HTTP Sources and Webhook Destinations
- Test accounts should have appropriate permissions for:
  - Reading connection configurations
  - Accessing destination event monitoring
  - API access for sending track events

#### 3.3.2. Test Preconditions

- **Test Preconditions**: The tests will assume the existence of a specific HTTP Source and a Webhook Destination within the RudderStack account, which are prerequisites for the test execution.
- **Data Isolation**: Each environment (staging/production) maintains separate test data to prevent cross-environment interference

### 3.4. Verification & Assertions

- Assertions will be made at critical points in the flow.
- **Event Polling**: Since event delivery is asynchronous, the test will implement a polling mechanism with a reasonable timeout (e.g., up to 90 seconds) when verifying the event counts on the destination page. This will prevent flaky tests due to network or processing latency.

## 4. Test Environment & Prerequisites

### 4.1. Environment Configuration

**Staging Environment:**
- **URL**: `https://staging.rudderstack.com` (or staging equivalent)
- **Command**: `npm run test:staging`
- **Browser**: Chromium (headless in CI, headed for local debugging)

**Production Environment:**
- **URL**: `https://app.rudderstack.com`
- **Command**: `npm run test:prod`
- **Browser**: Chromium (headless in CI, headed for local debugging)

### 4.2. Prerequisites

**Account Requirements:**
1. Valid RudderStack Cloud account credentials for each target environment
2. Test accounts with appropriate permissions for:
   - Authentication and workspace access
   - Reading connection configurations
   - Accessing destination monitoring features
   - API access for event tracking

**Pre-configured Resources:**
1. An existing HTTP Source in each environment
2. An existing Webhook Destination in each environment  
3. A connection established between the specified Source and Destination
4. Stable source and destination identifiers for consistent test execution

**Local Development Setup:**
1. Copy `.env.staging.example` to `.env.staging` and populate with staging credentials
2. Copy `.env.production.example` to `.env.production` and populate with production credentials
3. Ensure Node.js 18+ and npm are installed
4. Run `npm install` to install dependencies
5. Run `npx playwright install --with-deps chromium` to install browser

## 5. High-Level Test Case

The primary scenario will be defined in a Gherkin `.feature` file.

**Feature: RudderStack Event Flow Validation**

  **Scenario:** Verify end-to-end event delivery from UI data capture to API submission and UI validation
    Given the user is on the RudderStack login page
    When the user logs in with valid credentials
    And the user is on the connections page
    And the user retrieves the Data Plane URL and the HTTP Source Write Key
    And the user sends a "track" event to the source via API
    And the user navigates to the Webhook Destination page
    Then the user should see the "Delivered" event count has increased by 1

## 6. Credential Setup and Security Guidelines

### 6.1. Local Development Credential Setup

**Step 1: Environment File Creation**
```bash
# Copy example files
cp .env.staging.example .env.staging
cp .env.production.example .env.production
```

**Step 2: Populate Credentials**
```bash
# .env.staging
USERNAME=your-staging-username@example.com
PASSWORD=your-staging-password

# .env.production  
USERNAME=your-production-username@example.com
PASSWORD=your-production-password
```

**Step 3: Verify Setup**
```bash
# Test staging environment
npm run test:staging

# Test production environment  
npm run test:prod
```

### 6.2. CI/CD Credential Setup

**GitHub Repository Secrets Configuration:**
1. Navigate to repository Settings → Secrets and variables → Actions
2. Add the following repository secrets:
   - `USERNAME`: Test account username/email for RudderStack
   - `PASSWORD`: Test account password for RudderStack

**Security Best Practices:**
- Use dedicated test accounts, never personal accounts
- Rotate credentials regularly (quarterly recommended)
- Ensure test accounts have minimal required permissions
- Monitor test account activity for security anomalies
- Use different credentials for staging vs production environments when possible

### 6.3. Credential Security Guidelines

**What NOT to commit:**
- Actual `.env` files with real credentials
- Hardcoded usernames or passwords in code
- API keys or tokens in plain text
- Any sensitive configuration data

**What TO commit:**
- `.env.example` files with placeholder values
- Documentation about required environment variables
- Configuration templates and setup instructions

## 7. CI/CD Integration

- **Platform**: GitHub Actions with enhanced workflow configuration
- **Triggers**: 
  - Daily schedule (`cron: "0 0 * * *"`) for automated regression testing
  - Manual workflow dispatch with environment and browser selection options
- **Multi-Environment Testing**: Matrix strategy to test both staging and production environments
- **Secrets Management**: Credentials stored securely using GitHub repository secrets and injected at runtime
- **Artifact Collection**: Test reports, screenshots, and Cucumber HTML reports archived for debugging

## 8. Risks and Mitigations

| Risk | Mitigation |
| :--- | :--- |
| **UI Changes Breaking Locators** | Use robust, non-brittle selectors (e.g., `data-testid`, ARIA roles). The POM design centralizes locators, making them easier to update if changes occur. |
| **Test Flakiness from Latency** | Implement a robust polling mechanism with appropriate timeouts when waiting for asynchronous operations, such as the event count updating. |
| **Test Environment Unavailability** | The CI/CD pipeline will report failures clearly. For a real-world project, alerts would be configured for any CI job failures. |
| **Changes to HTTP API Contract** | The API call logic will be encapsulated in a dedicated helper function. This isolates the logic, making it easier to update if the API specification changes. |
| **Credential Security Breaches** | Use dedicated test accounts with minimal permissions, regular credential rotation, and secure storage in GitHub secrets. Environment-specific accounts isolate potential security impacts. |
| **Environment Configuration Drift** | Maintain separate configuration files for each environment and validate environment-specific prerequisites before test execution. Use matrix testing to catch environment-specific issues early. |