# Cursor Rules for RudderStack Test Automation Framework

This directory contains comprehensive cursor rules and guidelines for maintaining high code quality, consistency, and best practices in our Playwright + TypeScript + Cucumber.js test automation framework.

## Overview

These rules serve as:
- **Development Guidelines**: Standards for writing maintainable, readable code
- **Code Review Checklist**: Criteria for evaluating pull requests
- **Onboarding Documentation**: Guide for new team members
- **Quality Assurance**: Ensuring consistency across the entire codebase

## Rule Categories

### 📋 [Coding Standards](./coding-standards.md)
General principles for clean, maintainable code including:
- Naming conventions
- Function design guidelines
- Error handling practices
- Security considerations
- Performance guidelines

### 🎭 [Playwright Rules](./playwright-rules.md)
Best practices specific to Playwright automation:
- Locator strategies and priorities
- Page Object Model implementation
- Waiting and timing strategies
- Browser and context management
- Network and API integration

### 🥒 [Cucumber BDD Rules](./cucumber-bdd-rules.md)
Guidelines for effective Behavior-Driven Development:
- Feature file writing standards
- Gherkin language best practices
- Step definition organization
- Data management in BDD
- Scenario design principles

### 📘 [TypeScript Rules](./typescript-rules.md)
TypeScript-specific guidelines for type safety and code quality:
- Type definitions and interfaces
- Class design patterns
- Error handling and null safety
- Generic programming
- Module organization

### 🏗️ [Project Structure Rules](./project-structure-rules.md)
Organizational guidelines for scalable project architecture:
- Feature-centric directory structure
- File naming conventions
- Import/export strategies
- Configuration management
- Maintenance guidelines

## Quick Start Guide

### For New Team Members
1. Read the [Project Structure Rules](./project-structure-rules.md) first to understand the codebase organization
2. Review [Coding Standards](./coding-standards.md) for general development principles
3. Study [Playwright Rules](./playwright-rules.md) for automation-specific practices
4. Understand [Cucumber BDD Rules](./cucumber-bdd-rules.md) for test writing guidelines
5. Familiarize yourself with [TypeScript Rules](./typescript-rules.md) for type-safe development

### For Code Reviews
Use these rules as a checklist:
- ✅ Does the code follow the established naming conventions?
- ✅ Are locators stable and user-facing?
- ✅ Are Gherkin scenarios written in business language?
- ✅ Is proper TypeScript typing used throughout?
- ✅ Does the file organization follow the feature-centric structure?

### For Development
Before writing new code:
1. Check the relevant rule category for guidance
2. Follow the established patterns in existing code
3. Use the Page Object Model for UI interactions
4. Write business-focused Gherkin scenarios
5. Implement proper error handling and type safety

## Rule Enforcement

### Automated Checks
- TypeScript compiler enforces type safety rules
- Linting tools can verify coding standards
- CI/CD pipeline validates project structure

### Manual Review
- Code reviews should reference these rules
- Regular team discussions about rule updates
- Periodic codebase audits for compliance

## Contributing to Rules

### Updating Rules
1. Propose changes through team discussion
2. Update relevant rule documents
3. Communicate changes to the entire team
4. Update existing code to follow new rules (if applicable)

### Adding New Rules
1. Identify the need for new guidelines
2. Research best practices in the community
3. Create clear, actionable rules with examples
4. Get team consensus before implementation

## Examples and Anti-Patterns

Each rule document includes:
- ✅ **Good Examples**: Code that follows the best practices
- ❌ **Anti-Patterns**: Code to avoid with explanations
- 📝 **Rationale**: Why the rule exists and its benefits

## Integration with Development Tools

### IDE Configuration
- Configure your IDE to highlight violations of these rules
- Set up code formatting to automatically follow standards
- Use TypeScript strict mode as specified in the rules

### Pre-commit Hooks
Consider setting up pre-commit hooks to:
- Run TypeScript type checking
- Verify coding standards compliance
- Check file naming conventions
- Validate project structure

## Continuous Improvement

These rules are living documents that should evolve with:
- Team experience and feedback
- Industry best practices
- Tool updates and new features
- Project requirements changes

## Getting Help

If you have questions about any of these rules:
1. Check the specific rule document for examples
2. Look at existing code for patterns
3. Ask the team for clarification
4. Propose improvements or clarifications

---

**Remember**: These rules exist to help us build better, more maintainable tests. They should guide development, not hinder creativity or problem-solving. When in doubt, prioritize readability, maintainability, and team consistency.
