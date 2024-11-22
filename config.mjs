import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI1 = process.env.MY_MONGO_DB_DATABASE_URL;
const mongoURI2 = process.env.MONGODARKNET_DATABASE_URL;

const connectDB1 = async () => {
  try {
    await mongoose.connect(mongoURI1, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MY_MONGO_DB_DATABASE_URL');
  } catch (err) {
    console.error('Error connecting to MY_MONGO_DB_DATABASE_URL:', err);
    process.exit(1);
  }
};

const connectDB2 = async () => {
  try {
    await mongoose.connect(mongoURI2, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MONGODARKNET_DATABASE_URL');
  } catch (err) {
    console.error('Error connecting to MONGODARKNET_DATABASE_URL:', err);
    process.exit(1);
  }
};

export { connectDB1, connectDB2 };
