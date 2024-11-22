import express from 'express';
import { connectDB2 } from '../config.mjs';
import ExtractedData from '../models/extractedData.mjs';

const router = express.Router();

router.get('/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required.' });
  }

  try {
    const conn = await connectDB2();
    const ExtractedDataModel = conn.model(
      'ExtractedData',
      ExtractedData.schema
    );

    const results = await ExtractedDataModel.find({
      $or: [
        { 'web_info.title': { $regex: query, $options: 'i' } },
        { 'web_info.description': { $regex: query, $options: 'i' } },
        { 'web_info.content': { $regex: query, $options: 'i' } },
        { 'financial_entity.btc_wallets': { $regex: query, $options: 'i' } },
        { 'financial_entity.eth_wallets': { $regex: query, $options: 'i' } },
        { 'person_entity.emails': { $regex: query, $options: 'i' } },
        { 'person_entity.usernames': { $regex: query, $options: 'i' } },
        { 'person_entity.phone_number': { $regex: query, $options: 'i' } },
      ],
    }).limit(20);

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
