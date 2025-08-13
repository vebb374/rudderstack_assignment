import playwright from "eslint-plugin-playwright";
import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
    // Ignore files and directories (replaces .eslintignore)
    {
        ignores: ["node_modules", "dist", "test-results", "test-data", "playwright.config.ts"],
    },
    eslint.configs.recommended,
    // Prettier configuration (should be last to override other formatting rules)
    prettierConfig,
    // ESLint rules for TypeScript files
    {
        files: ["**/*.ts"],
        plugins: {
            "@typescript-eslint": tseslint,
            import: importPlugin,
            prettier: prettierPlugin,
        },
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                project: true, // Enable type-aware linting
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                console: "readonly",
                process: "readonly",
                Buffer: "readonly",
                document: "readonly",
                module: "readonly",
            },
        },
        rules: {
            // Include TS ESLint recommended plugin rules
            ...tseslint.configs.recommended.rules,
            // Unused variables - simplified since tsr handles complex unused code detection
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
            // Type-aware rules for better TypeScript analysis
            "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/await-thenable": "error",
            "@typescript-eslint/no-misused-promises": "error",
            "@typescript-eslint/require-await": "error",
            // Code quality rules
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/prefer-nullish-coalescing": "error",
            "@typescript-eslint/prefer-optional-chain": "error",
            "@typescript-eslint/no-unnecessary-condition": "error",
            // Style rules
            semi: ["error", "always"],
            // Prettier rules
            "prettier/prettier": "error",
        },
    },
    // Configuration files (disable project-based parsing)
    {
        files: ["*.config.js", "*.config.ts", "cucumber.js"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                // Don't use project-based parsing for config files
            },
            globals: {
                console: "readonly",
                process: "readonly",
                Buffer: "readonly",
                module: "readonly",
            },
        },
        rules: {
            // Relax rules for config files
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/require-await": "off",
            "no-undef": "off",
        },
    },
    // Playwright recommended rules for tests
    {
        ...playwright.configs["flat/recommended"],
        files: ["tests/**"],
        rules: {
            ...playwright.configs["flat/recommended"].rules,
        },
    },
];
