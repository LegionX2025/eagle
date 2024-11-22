import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODARKNET_DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB!');
    createTextIndex(); // Call the function to create the index
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Function to create the text index
const createTextIndex = async () => {
  try {
    const db = mongoose.connection.db;
    const collection = db.collection('data_darknet');

    // Create a text index on the specified fields
    await collection.createIndex({
      'hash-ID': 'text',
      'web_info.url': 'text',
      'web_info.title': 'text',
      'web_info.description': 'text',
      'web_info.content': 'text',
      content: 'text',
      page_48: 'text',
      content_page_48: 'text',
      page: 'text',
      'financial_entity.btc_wallets': 'text',
      'financial_entity.eth_wallets': 'text',
      'person_entity.emails': 'text',
      'person_entity.usernames': 'text',
      'person_entity.tox_ids': 'text',
      'person_entity.ssi': 'text',
      'person_entity.phone_number': 'text',
      subpages: 'text',
    });
    console.log('Text index created on `data_darknet` collection.');
  } catch (err) {
    console.error('Error creating text index:', err);
  }
};
