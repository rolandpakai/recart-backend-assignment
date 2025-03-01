import express from 'express';
import api from './routers/api';

const app = express();

app.use(express.json());
app.use('/api', api);
app.use('/*', (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});


export default app;