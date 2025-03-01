import { Router, Request, Response } from 'express';
import { WebhookSchema } from '../schemas/WebhookSchema';
import { webhookHandlers } from '../handlers/webhookHandlers';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const validatedBody = WebhookSchema.safeParse(req.body);

  if (validatedBody.success) {
    const { topic } = validatedBody.data;

    const handler = webhookHandlers[topic];
    if (!handler) {
      res.status(400).json({ error: `Handler not found for topic: ${topic}` });
    }

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