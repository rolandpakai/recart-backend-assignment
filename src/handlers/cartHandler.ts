/* eslint-disable no-console */
import { getAllSessions, sessionFindByShopifyCartId, updateSession } from "../db/dao/session-dao";
import convertCurrency from "../services/convertCurrency";
import { LineItems, Session } from "../types/Session";
import { Webhook } from "../types/Webhook";
import { dateComparison } from "../utils";

const calculateCartValues = (lineItems: LineItems[]) => {
  return lineItems.reduce(
    (acc, curr) => ({
      value: acc.value + curr.price,
      itemCount: acc.itemCount + curr.quantity,
    }),
    { value: 0, itemCount: 0 }
  );
};

export const cartHandler = async (webhookData: Webhook): Promise<string> => {
  const { id, line_items, updated_at } = webhookData;
  const sessionDoc = await sessionFindByShopifyCartId(id);

  if (!sessionDoc) {
    throw new Error(`Session not found by Shopify cart id: ${id}`);
  }

  // Compare the updated_at of the webhook with the updated_at of the session
  if (dateComparison(updated_at, sessionDoc.updated_at) !== 1) {
    throw new Error(`Outdated Webhook: ${updated_at}`);
  }

  // Calculate: value, itemCount
  const { value, itemCount } = calculateCartValues(line_items);

  // Calculate: valueUSD
  const valueUSD = await convertCurrency({
    from: sessionDoc.currency, 
    to: 'USD',
    value,
  });

  // Update the session with the new cart data
  const updates: Partial<Session> = {
    value,
    valueUSD,
    itemCount,
    line_items: line_items as LineItems[],
    updated_at: new Date(updated_at),
  };
  
  updateSession(sessionDoc.id!, updates);

  return 'ok';
}