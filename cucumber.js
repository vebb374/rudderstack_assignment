export default {
  paths: ['features/**/*.feature'],
  import: ['features/**/*.steps.ts', 'features/shared/**/*.ts'],
  format: [
    'progress-bar',
    'json:test-results/cucumber-report.json',
    'html:test-results/cucumber-report.html',
  ],
  // dryRun: true,
  formatOptions: {
    snippetInterface: 'async-await',
    colorsEnabled: true,
  },
  // Global timeout for all Cucumber steps (in milliseconds)
  timeout: 30000, // 30 seconds per step  
  parallel: 4,
  worldParameters: {
    baseUrl: 'https://app.rudderstack.com',
  },
};
