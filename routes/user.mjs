import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required.' });
  }

  try {
    const collection = mongoose.connection.db.collection('data_darknet');

    const results = await collection
      .find({ $text: { $search: query } }, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .limit(10)
      .toArray();

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
