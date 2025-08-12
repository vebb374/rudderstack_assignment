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

- **Credentials & Configuration**: Sensitive data like usernames and passwords will be managed using a `.env` file for local development. For CI/CD, these will be handled via GitHub Actions secrets.
- **Test Preconditions**: The tests will assume the existence of a specific HTTP Source and a Webhook Destination within the RudderStack account, which are prerequisites for the test execution.

### 3.4. Verification & Assertions

- Assertions will be made at critical points in the flow.
- **Event Polling**: Since event delivery is asynchronous, the test will implement a polling mechanism with a reasonable timeout (e.g., up to 90 seconds) when verifying the event counts on the destination page. This will prevent flaky tests due to network or processing latency.

## 4. Test Environment & Prerequisites

- **URL**: `https://app.rudderstack.com`
- **Browser**: Chromium
- **Prerequisites**:
    1. A valid RudderStack Cloud account with login credentials.
    2. An existing HTTP Source.
    3. An existing Webhook Destination.
    4. A connection established between the specified Source and Destination.
    5. A local `.env` file (copied from `.env.example`) populated with the `USERNAME` and `PASSWORD`.

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

## 6. CI/CD Integration

- **Platform**: GitHub Actions.
- **Trigger**: The test suite will be configured to run on a daily schedule (`cron`) and can also be triggered manually (`workflow_dispatch`).
- **Secrets Management**: Credentials will be stored and accessed securely using GitHub repository secrets.

## 7. Risks and Mitigations

| Risk | Mitigation |
| :--- | :--- |
| **UI Changes Breaking Locators** | Use robust, non-brittle selectors (e.g., `data-testid`, ARIA roles). The POM design centralizes locators, making them easier to update if changes occur. |
| **Test Flakiness from Latency** | Implement a robust polling mechanism with appropriate timeouts when waiting for asynchronous operations, such as the event count updating. |
| **Test Environment Unavailability** | The CI/CD pipeline will report failures clearly. For a real-world project, alerts would be configured for any CI job failures. |
| **Changes to HTTP API Contract**| The API call logic will be encapsulated in a dedicated helper function. This isolates the logic, making it easier to update if the API specification changes. |
