import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from '../config.mjs';
import ExtractedData from '../models/extractedData.mjs';

const router = express.Router();
dotenv.config();

const { db } = await connectDB();
const collection = db.collection('data_darknet');

router.get('/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required.' });
  }

  try {
    const results = await ExtractedData.find({
      $text: { $search: query },
    }).select(
      'hash-ID web_info title description content financial_entity person_entity'
    );

    if (results.length === 0) {
      return res.status(404).json({ message: 'No results found.' });
    }

    res.json(results);
  } catch (error) {
    console.error('Error searching database:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

export default router;
