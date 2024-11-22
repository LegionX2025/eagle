import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.mjs';
import { searchDarknet } from './models/extractedData.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MY_MONGO_DB_DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to User Database'))
  .catch((err) => console.error('Database connection error:', err));

mongoose
  .connect(process.env.MONGODARKNET_DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to Darknet Database'))
  .catch((err) => console.error('Darknet connection error:', err));

app.use(express.json());
app.use('/api/users', userRoutes);

app.get('/api/search', searchDarknet);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
