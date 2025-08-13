export default {
  paths: ['features/authentication/*.feature'],
  import: ['features/**/*.steps.ts', 'features/shared/**/*.ts'],
  format: ['progress', 'html:test-results/cucumber-report.html'],
  worldParameters: {
    baseUrl: 'https://app.rudderstack.com',
  },
};
