/* eslint-disable no-console */
import { Types } from "mongoose";
import { createSession } from "./dao/session-dao";
import { createShop } from "./dao/shop-dao";
import { DEFAULT_SHOP_CURRENCY, DEFAULT_SHOP_DOMAIN, SHOPIFY_CART_ID } from "../defaults";

const seedDb = async () => {
  const shop = {
    domain: DEFAULT_SHOP_DOMAIN,
    currency: DEFAULT_SHOP_CURRENCY,
  };

  try {
    const shopDoc = await createShop(shop);
    console.log('Shop created:', shopDoc);

    const session = {
      shopId: new Types.ObjectId(shopDoc.id),
      shopifyCartId: SHOPIFY_CART_ID,
      currency: shopDoc.currency,
      updated_at: new Date(0),
    }

    const sessionDoc = await createSession(session);

    console.log('Session created:', sessionDoc);
  } catch (err) {
    console.error('Error creating shop:', err);
  }
}

export default seedDb;