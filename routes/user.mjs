import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from '../config.mjs';
import ExtractedData from '../models/extractedData.mjs'; // Make sure you have the model for ExtractedData

const router = express.Router();
dotenv.config();

const { db } = await connectDB(); // Assuming the native MongoDB driver
// routes/user.mjs
router.get('/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    console.error('No query parameter provided');
    return res.status(400).json({ message: 'Query parameter is required.' });
  }

  try {
    console.log('Searching for:', query);

    // Use a regex search across multiple fields (case-insensitive)
    const results = await ExtractedData.find({
      $or: [
        { 'web_info.title': { $regex: query, $options: 'i' } },
        { 'web_info.description': { $regex: query, $options: 'i' } },
        { 'web_info.content': { $regex: query, $options: 'i' } },
        { 'financial_entity.btc_wallets': { $regex: query, $options: 'i' } },
        { 'financial_entity.eth_wallets': { $regex: query, $options: 'i' } },
        { 'person_entity.emails': { $regex: query, $options: 'i' } },
        { 'person_entity.usernames': { $regex: query, $options: 'i' } },
        { 'person_entity.tox_ids': { $regex: query, $options: 'i' } },
        { 'person_entity.ssi': { $regex: query, $options: 'i' } },
        { 'person_entity.phone_number': { $regex: query, $options: 'i' } },
      ],
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
