import z from "zod";
import { LineItemsSchema } from "../schemas/WebhookSchema";

export type LineItems = z.infer<typeof LineItemsSchema>;