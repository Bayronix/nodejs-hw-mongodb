import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import env from './utils/dovenv.js';

const PORT = Number(env('PORT', 3001));

export const startServer = () => {
  const setupServer = express();

  setupServer.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  setupServer.use(cors());
  setupServer.use(express.json());

  setupServer.get('/', (req, res) => {
    req.log.info('Root route accessed');
    res.json({
      message: `Server is running on port ${PORT}`,
    });
  });

  setupServer.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });

  setupServer.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  setupServer.use((err, req, res, next) => {
    req.log.error(err, 'Something went wrong');
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });
};
