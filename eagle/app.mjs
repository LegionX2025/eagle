import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Use your environment variable for the MongoDB URL
const uri = process.env.MONGODARKNET_DATABASE_URL;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Fetch all data API
app.get('/api/fetchall', async (req, res) => {
  let client;
  try {
    // Connect to the MongoDB client
    client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db('mongodarknet');
    const collection = db.collection('data_darknet');

    // Fetch all documents, limit to 100 for performance
    const results = await collection.find({}).limit(100).toArray();

    res.json({ success: true, data: results });
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res
      .status(500)
      .json({
        success: false,
        error: 'Internal server error',
        details: error.message,
      });
  } finally {
    if (client) {
      await client.close();
    }
  }
});

// Catch-all route to serve the frontend for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
