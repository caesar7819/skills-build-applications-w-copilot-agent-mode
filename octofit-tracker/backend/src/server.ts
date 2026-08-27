import express from 'express';
import './config/database';
import { apiBaseUrl } from './config/api';
import apiRouter from './routes/api';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
});
