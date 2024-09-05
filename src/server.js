import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import env from './utils/env.js';
import * as contactServices from './services/contact.js';

export const startServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/contacts', async (req, res, next) => {
    try {
      const data = await contactServices.getAllContacts();
      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data,
      });
    } catch (error) {
      next(error);
    }
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    try {
      const { contactId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(contactId)) {
        return res.status(400).json({
          message: `Invalid ContactId:${contactId}`,
        });
      }

      const data = await contactServices.getContactById(contactId);

      if (!data) {
        return res.status(404).json({
          message: `Contact with id=${contactId} not found`,
        });
      }

      res.json({
        status: 200,
        message: `Contact with id=${contactId} successfully found`,
        data,
      });
    } catch (error) {
      next(error);
    }
  });

  app.use((req, res) => {
    res.status(404).json({
      message: `${req.url} not found`,
    });
  });

  app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({
      message: `Internal Server Error: ${error.message}`,
    });
  });

  const port = Number(env('PORT', 3000));

  app.listen(port, () => console.log(`Server running on port ${port}`));
};
