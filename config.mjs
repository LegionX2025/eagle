import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB1 = async () => {
  try {
    await mongoose.createConnection(process.env.MY_MONGO_DB_DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MY_MONGO_DB_DATABASE_URL');
  } catch (error) {
    console.error('Error connecting to DB1:', error);
  }
};

const connectDB2 = async () => {
  try {
    await mongoose.createConnection(process.env.MONGODARKNET_DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MONGODARKNET_DATABASE_URL');
  } catch (error) {
    console.error('Error connecting to DB2:', error);
  }
};

export { connectDB1, connectDB2 };
