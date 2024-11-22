import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB1 = async () => {
  try {
    const conn1 = await mongoose.createConnection(
      process.env.MY_MONGO_DB_DATABASE_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('Connected to MY_MONGO_DB_DATABASE_URL');
    return conn1;
  } catch (error) {
    console.error('Error connecting to DB1:', error);
    process.exit(1);
  }
};

const connectDB2 = async () => {
  try {
    const conn2 = await mongoose.createConnection(
      process.env.MONGODARKNET_DATABASE_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('Connected to MONGODARKNET_DATABASE_URL');
    return conn2;
  } catch (error) {
    console.error('Error connecting to DB2:', error);
    process.exit(1);
  }
};

export { connectDB1, connectDB2 };
