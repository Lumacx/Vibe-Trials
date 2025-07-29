// functions/src/index.ts

import * as functions from 'firebase-functions';
import express, { Request, Response } from 'express';

const app = express();

app.get('/hello', (req: Request, res: Response) => {
  res.send('Hello from Firebase Functions + Express!');
});

export const api = functions.https.onRequest(app);
