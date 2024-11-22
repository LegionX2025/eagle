import express from 'express';
import {connectDB2 } from '../config.mjs';

const router = express.Router();

router.get('/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required.' });
  }

  try {
    console.log('Received search query:', query);
    
    const collection = connectDB2.collection('data_darknet');
    
    // Log the database connection status
    console.log('Database connection status:', connectDB2.readyState);

    // Create a text index on all fields (if not already exists)
    await collection.createIndex({ "$**": "text" });

    const results = await collection.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    )
    .sort({ score: { $meta: "textScore" } })
    .limit(20)
    .toArray();

    console.log('Search results:', results);

    if (results.length === 0) {
      return res.status(404).json({ message: 'No results found.' });
    }

    res.json(results);
  } catch (error) {
    console.error('Error searching database:', error);
    res.status(500).json({ message: 'Internal server error.', error: error.toString() });
  }
});

export default router;
