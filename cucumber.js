module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['features/**/*.steps.ts', 'features/shared/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress', 'html:cucumber-report.html'],
    worldParameters: {
      baseUrl: 'https://app.rudderstack.com',
    },
  },
};
