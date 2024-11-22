import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB1, connectDB2 } from './config.mjs';
import userRoutes from './routes/user.mjs';

const cors = require('cors');
app.use(cors());

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Establish database connections
connectDB1();
connectDB2();

// Routes
app.use('/api', userRoutes);

// Static Frontend
app.use(express.static('frontend'));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
