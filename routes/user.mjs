import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from '../config.mjs';
import ExtractedData from '../models/extractedData.mjs'; // Make sure you have the model for ExtractedData

const router = express.Router();
dotenv.config();

const { db } = await connectDB(); // Assuming the native MongoDB driver

router.get('/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required.' });
  }

  try {
    console.log('Searching for:', query);
    const results = await ExtractedData.find({
      $text: { $search: query },
    });

    if (results.length === 0) {
      return res.status(404).json({ message: 'No results found.' });
    }

    console.log('Found results:', results);
    res.json(results);
  } catch (error) {
    console.error('Error searching database:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

export default router;
