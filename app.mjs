import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.mjs';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGO_URI =
  'mongodb+srv://ZIRqdwxT:af4WOzP47bRRcRu5@us-east-1.ufsuw.mongodb.net/mongodarknet';

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use('/api', userRoutes);

app.use(express.static(path.join(__dirname, '../frontend')));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
