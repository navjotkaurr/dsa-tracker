import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import topicRoutes from './routes/topicRoutes.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// For ES Module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/topics', topicRoutes);

// --- Add this to serve frontend in production ---
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
}

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
