import z from "zod";

export const LineItemsSchema = z.array(
  z.object({
    product_id: z.string(),
    sku: z.string(),
    quantity: z.number(),
    price: z.number(),
  })
);

export const WebhookSchema = z.object({
  id: z.string(),
  topic: z.string(),
  line_items: LineItemsSchema.default([]),
  updated_at: z.string(),
});
