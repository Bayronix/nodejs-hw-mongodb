import express from 'express';

import cors from 'cors';

const PORT = 3001;

const setupServer = express();

setupServer.use(cors());

setupServer.use(express.json());

setupServer.get('/', (req, res) => {
  req.log.info('Root route accessed');
  res.json({
    message: `Server is running on port ${PORT}`,
  });
});

setupServer.listen(PORT, () => {
  {
    console.log(`Server started ${PORT}`);
  }
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
