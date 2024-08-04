import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import contactsRouter from '../src/routers/contacts.js';
import { env } from './utils/env.js';

const PORT = Number(env('PORT'));
export const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(contactsRouter);

  // eslint-disable-next-line no-unused-vars
  app.use((req, res, next) => {
    res.status(404).json({
      status: 404,
      message: 'Not found',
      data: null,
    });
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    res.status(500).json({
      status: 500,
      message: 'Something went wrong',
      data: { error: err.message },
    });
  });
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
