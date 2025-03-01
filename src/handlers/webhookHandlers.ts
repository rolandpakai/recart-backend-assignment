import { Webhook } from "../types/Webhook";
import { cartHandler } from "./cartHandler";

export const webhookHandlers: Record<string, (data: Webhook) => Promise<string>> = {
  'carts/create': cartHandler,
  'carts/update': cartHandler,
};