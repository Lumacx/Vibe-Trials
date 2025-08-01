// functions/src/index.ts
import * as functions from 'firebase-functions';
import next from 'next';
import { Request, Response } from 'express';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, conf: { distDir: '.next' } }); // ✅ importante para App Hosting
const handle = nextApp.getRequestHandler();

export const nextServer = functions.https.onRequest(async (req: Request, res: Response) => {
  await nextApp.prepare();
  handle(req, res);
});
