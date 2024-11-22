import express from 'express';
import { connectDB1, connectDB2 } from './config.mjs';
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

// Connect to the database
const dbConnection1 = await connectDB1();
const dbConnection2 = await connectDB2();

// API routes
app.use('/api', userRoutes);

// Serve static frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export { dbConnection1, dbConnection2 };
