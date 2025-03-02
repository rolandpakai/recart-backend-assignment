import request from 'supertest';
import app from '../app';
import { sessionFindByShopifyCartId } from '../db/dao/session-dao';
import { HEADER_SHOPIFY_TOPIC, SHOPIFY_CART_ID, TOPIC_CARTS_UPDATE } from '../defaults';
import { Webhook } from '../types/Webhook';
import convertCurrency from "../services/convertCurrency";

jest.mock("../services/convertCurrency");

describe('POST /webhooks', () => {
  it('should update the cart with the webhook data', async () => {
    (convertCurrency as jest.Mock).mockResolvedValue(0.00261);

    const requestBody = {
      id: SHOPIFY_CART_ID,
      updated_at: new Date().toISOString(),
      line_items: [{
        product_id: '788032119674292922',
        sku: 'Test Product',
        quantity: 1,
        price: 1,
      }]
    } as Webhook;

    const sessionDocAssert = {
      value: 1,
      valueUSD: 0.00261,
      itemCount: 1,
    }

    const response = await sendWebhookAPIRequest(TOPIC_CARTS_UPDATE, requestBody);
    expect(response.status).toBe(200);
    const sessionDoc = await getSessionByShopifyCartId();
    expect(sessionDoc).not.toBeNull();

    if (sessionDoc) {
      expect(sessionDoc.value).toBe(sessionDocAssert.value);
      expect(sessionDoc.valueUSD).toBe(sessionDocAssert.valueUSD);
      expect(sessionDoc.itemCount).toBe(sessionDocAssert.itemCount);
    }
  });

  it('should update the cart with the sum values of the webhook cart data', async () => {
    (convertCurrency as jest.Mock).mockResolvedValue(0.261);

    const requestBody = {
      id: SHOPIFY_CART_ID,
      updated_at: new Date().toISOString(),
      line_items: [{
          product_id: '788032119674292922',
          sku: 'Test Product 1',
          quantity: 5,
          price: 50,
        }, {
          product_id: '235654762413645635',
          sku: 'Test Product 2',
          quantity: 5,
          price: 50,
        }
      ]
    } as Webhook;

    const sessionDocAssert = {
      value: 100,
      valueUSD: 0.261,
      itemCount: 10,
    }

    const response = await sendWebhookAPIRequest(TOPIC_CARTS_UPDATE, requestBody);
    expect(response.status).toBe(200);
    const sessionDoc = await getSessionByShopifyCartId();
    expect(sessionDoc).not.toBeNull();

    if (sessionDoc) {
      expect(sessionDoc.value).toBe(sessionDocAssert.value);
      expect(sessionDoc.valueUSD).toBe(sessionDocAssert.valueUSD);
      expect(sessionDoc.itemCount).toBe(sessionDocAssert.itemCount);
    }
  });

  it('should response 400 and return with error when the webhook is outdated', async () => {
    const requestBody = {
      id: SHOPIFY_CART_ID,
      topic: TOPIC_CARTS_UPDATE,
      updated_at: new Date('1960-01-01T00:00:00.000Z').toISOString(),
      line_items: [{
        product_id: '788032119674292922',
        sku: 'Test Product',
        quantity: 1,
        price: 1,
      }]
    } as Webhook;

    const response = await sendWebhookAPIRequest(TOPIC_CARTS_UPDATE, requestBody);
    expect(response.status).toBe(400);
    expect(response.body.error).toEqual('Outdated Webhook: 1960-01-01T00:00:00.000Z');
  });
});

const sendWebhookAPIRequest = async (topic: string, requestBody: Webhook) => {
  return await request(app)
    .post('/api/webhooks')
    .set(HEADER_SHOPIFY_TOPIC, topic)
    .send(requestBody);
};

const getSessionByShopifyCartId = async () => {
  return await sessionFindByShopifyCartId(SHOPIFY_CART_ID);
}
