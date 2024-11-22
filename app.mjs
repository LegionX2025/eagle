import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

// Use your environment variable for the MongoDB URL
const uri = process.env.MONGODARKNET_DATABASE_URL;

// Middleware
app.use(cors());
app.use(express.json());

// Search API
app.get('/api/search', async (req, res) => {
    const searchQuery = req.query.query;
    
    if (!searchQuery) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    let client;
    try {
        // Connect to the MongoDB client
        client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('mongodarknet');
        const collection = db.collection('data_darknet');

        // Perform the search query in MongoDB
        const results = await collection.find({
            $text: { $search: searchQuery }
        }).limit(20).toArray();

        res.json(results); // Send results as JSON, even if empty

    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        if (client) {
            await client.close();
        }
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
