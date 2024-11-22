import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from '../config.mjs';
import User from '../models/user.mjs';

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

// Create a new user
router.post('/', async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      name: req.body.name,
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update one user by ID
router.patch('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (req.body.email != null) user.email = req.body.email;
    if (req.body.name != null) user.name = req.body.name;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one user by ID
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.deleteOne();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

import ExtractedData from '../models/user.mjs';

// Create a text index for search functionality
await ExtractedData.createIndexes({
  'web_info.title': 'text',
  'web_info.description': 'text',
  'web_info.content': 'text',
});

router.get('/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required.' });
  }

  try {
    const results = await ExtractedData.find({
      $text: { $search: query },
    }).limit(50); // Limit results for performance

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
