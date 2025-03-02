import { Router, Request, Response } from 'express';
import { WebhookSchema } from '../schemas/WebhookSchema';
import { webhookHandlers } from '../handlers/webhookHandlers';
import { HEADER_SHOPIFY_TOPIC } from '../defaults';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const shopifyTopic = req.headers[HEADER_SHOPIFY_TOPIC] as string;
  const handler = webhookHandlers[shopifyTopic];

  if (!handler) {
    res.status(400).json({ error: `Handler not found for topic: ${shopifyTopic}` });
    return;
  }

  const validatedBody = WebhookSchema.safeParse(req.body);

  if (validatedBody.success) {
    try {
      await handler(validatedBody.data);
      res.status(200).json({ status: 'ok' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
      res.status(400).json({ error: errorMessage });
    }
  } else {
    const errors = validatedBody.error.errors.map((err) => ({
      path: err.path.join('.'),
      message: err.message,
    }));
    
    res.status(400).json({ errors });
  }
});

export default router;