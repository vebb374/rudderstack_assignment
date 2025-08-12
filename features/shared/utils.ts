import { request } from 'playwright';

export async function sendTrackEvent(dataPlaneUrl: string, writeKey: string, eventName: string): Promise<void> {
  const context = await request.newContext();
  await context.post(`${dataPlaneUrl}/v1/track`, {
    headers: {
      'Authorization': `Basic ${Buffer.from(writeKey + ':').toString('base64')}`,
      'Content-Type': 'application/json'
    },
    data: {
      userId: 'test-user-123',
      event: eventName,
      properties: {
        test: 'test-property'
      }
    }
  });
}
