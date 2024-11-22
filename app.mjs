import express from 'express';
import { connectDB1, connectDB2 } from './config.mjs';
import userRoutes from './routes/user.mjs';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api', userRoutes);

// Serve static files (for frontend)
app.use(express.static('public'));

// Connect to the database
connectDB1()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
