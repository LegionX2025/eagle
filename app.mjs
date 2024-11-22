import express from 'express';
import { connectDB1, connectDB2 } from './config.mjs'; // Import both connection functions
import userRoutes from './routes/user.mjs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Connect to both databases
connectDB1();
connectDB2();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api', userRoutes);

// Serve static frontend
app.use(express.static('frontend'));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
