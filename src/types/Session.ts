import { Types } from "mongoose";

export type LineItems = {
  product_id: string;
  sku: string;
  quantity: number;
  price: number;   // price per product in the cart (in shop's currency)
}

export type Session = {
  id?: string;
  shopifyCartId: string;
  shopId: Types.ObjectId;
  currency: string;  // from our database for the shop
  updated_at: Date;
  line_items?: LineItems[];
  value?: number;     // sum of the product prices in the cart
  valueUSD?: number;  // converted to USD
  itemCount?: number; // number of products in the cart
}