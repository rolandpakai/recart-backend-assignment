import express from 'express';
import webhooksRouter from './webhooksRouter';

const api = express.Router();

api.use('/webhooks', webhooksRouter);

export default api;