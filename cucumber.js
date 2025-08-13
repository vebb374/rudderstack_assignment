module.exports = {
  default: {
    paths: ['features/authentication/*.feature'],
    require: ['features/**/*.steps.ts', 'features/shared/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress', 'html:test-results/cucumber-report.html'],
    worldParameters: {
      baseUrl: 'https://app.rudderstack.com',
    },
  },
};
