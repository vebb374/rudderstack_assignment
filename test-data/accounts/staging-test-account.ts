import { RudderStackAccount } from './account-interface';

const account: RudderStackAccount = {
  email: 'staging-user@example.com',
  password: 'staging-password',
  description: 'Staging environment test account - update with real credentials',
  organization: 'staging-org',
  workspace: 'staging-workspace',
  environment: 'staging',
  dataPlaneUrl: 'https://staging.dataplane.rudderstack.com',
  sources: {
    httpSource: {
      name: 'staging HTTP Source',
      type: 'HTTP',
      writeKey: 'staging-write-key-placeholder'
    }
  },
  destinations: {
    webhook: {
      name: 'staging webhook',
      type: 'HTTP Webhook'
    }
  }
};

export default account;
