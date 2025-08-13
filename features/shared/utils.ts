import { request } from 'playwright';
import { EventFactory } from '../../test-data';
import { getAccountData, type AccountKey } from 'account-data';

export async function sendTrackEvent(
  dataPlaneUrl: string, 
  writeKey: string, 
  eventName: string, 
  userId?: string
): Promise<void> {
  const context = await request.newContext();
  
  try {
    // Use EventFactory to create consistent test data
    const eventData = EventFactory.createTrackEvent({
      userId: userId,
      event: eventName
    });

    const response = await context.post(`${dataPlaneUrl}/v1/track`, {
      headers: {
        'Authorization': `Basic ${Buffer.from(writeKey + ':').toString('base64')}`,
        'Content-Type': 'application/json'
      },
      data: eventData
    });

    if (!response.ok()) {
      const responseText = await response.text();
      throw new Error(`API request failed with status ${response.status()}: ${responseText}`);
    }
    
    console.log(`Successfully sent ${eventName} event to RudderStack`);
  } catch (error) {
    console.error(`Failed to send track event: ${error}`);
    throw error;
  } finally {
    await context.dispose();
  }
}

export async function sendIdentifyEvent(
  dataPlaneUrl: string, 
  writeKey: string, 
  userId: string,
  traits: Record<string, unknown> = {}
): Promise<void> {
  const context = await request.newContext();
  
  try {
    // Use EventFactory to create consistent test data
    const eventData = EventFactory.createIdentifyEvent({
      userId: userId,
      traits: traits
    });

    const response = await context.post(`${dataPlaneUrl}/v1/identify`, {
      headers: {
        'Authorization': `Basic ${Buffer.from(writeKey + ':').toString('base64')}`,
        'Content-Type': 'application/json'
      },
      data: eventData
    });

    if (!response.ok()) {
      const responseText = await response.text();
      throw new Error(`API request failed with status ${response.status()}: ${responseText}`);
    }
    
    console.log(`Successfully sent identify event to RudderStack`);
  } catch (error) {
    console.error(`Failed to send identify event: ${error}`);
    throw error;
  } finally {
    await context.dispose();
  }
}

/**
 * Send track event using account configuration directly
 * Simplified API following AuQA pattern
 */
export async function sendTrackEventForAccount(
  accountKey: AccountKey,
  eventName: string,
  userId?: string
): Promise<void> {
  const account = getAccountData(accountKey);
  
  if (!account.dataPlaneUrl || !account.sources?.httpSource?.writeKey) {
    throw new Error(`Account ${accountKey} missing data plane URL or write key`);
  }
  
  await sendTrackEvent(
    account.dataPlaneUrl,
    account.sources.httpSource.writeKey,
    eventName,
    userId
  );
}