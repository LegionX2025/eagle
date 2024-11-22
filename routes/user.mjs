import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from '../config.mjs';
import User from '../models/user.mjs';
import ExtractedData from '../models/extractedData.mjs';

const router = express.Router();
dotenv.config();

const { db } = await connectDB(); // Assuming the native MongoDB driver
const collection = db.collection('data_darknet');

router.get('/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    console.error('No query parameter provided');
    return res.status(400).json({ message: 'Query parameter is required.' });
  }

  try {
    console.log('Searching for:', query);
    // Search across all fields in the extracted_data schema
    const results = await ExtractedData.find({
      $text: { $search: query },
    });

    if (results.length === 0) {
      console.log('No results found for query:', query);
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
