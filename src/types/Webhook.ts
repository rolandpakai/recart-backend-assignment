import z from "zod";
import { WebhookSchema } from "../schemas/WebhookSchema";

export type Webhook = z.infer<typeof WebhookSchema>;