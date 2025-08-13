import { RudderStackAccount } from './account-interface';

const account: RudderStackAccount = {
  email: 'jepegim845@discrip.com',
  password: 'mgaQx8eK2juztjn#',
  description: 'Main production account for automated testing',
  organization: 'discrip-jepegim845',
  workspace: 'discrip-jepegim845',
  dataPlaneUrl: 'https://discripjelkblh.dataplane.rudderstack.com',
  sources: {
    httpSource: {
      name: 'assignment Source 1',
      type: 'HTTP',
      writeKey: '31BN9T16OV1lsoupVKiETyNNRCo'
    }
  },
  destinations: {
    webhook: {
      name: 'request catcher 1',
      type: 'HTTP Webhook'
    }
  }
};

export default account;
