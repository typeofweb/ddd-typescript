import express from 'express';
import bodyParser from 'body-parser';
import { v1Router } from './api/v1';
import { port } from '@config';

const app = express();
app.use(bodyParser.json());

app.use('/api/v1', v1Router);

app.listen(port, () => {
  console.log(`[App]: Listening on port ${port}`);
});
