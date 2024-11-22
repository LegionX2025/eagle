import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Connect to the first MongoDB database (Main Database)
export const connectDB1 = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    // Use the main database URL
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// Connect to the second MongoDB database (MongoDarknet Database)
export const connectDB2 = () => {
  return mongoose.connect(process.env.MONGODARKNET_DATABASE_URL, {
    // Use the MongoDarknet database URL
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
