import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';

import connectDB from './src/config/db.js';

// Routes
import userRoutes from './src/routes/userRoutes.js';
import classRoutes from './src/routes/classRoutes.js';
import bookingRoutes from './src/routes/bookingRoutes.js';

const app = express();

/*
   Middleware
*/
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://bright-kringle-8f2296.netlify.app'],
    credentials: true,
  })
);
app.use(express.json());

// Static files (profile images)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

/* 
   Routes
 */
app.use('/auth', userRoutes);
app.use('/classes', classRoutes);
app.use('/bookings', bookingRoutes);

/* 
   Root
 */
app.get('/', (_req, res) => {
  res.send('GymClass Backend API is running!');
});

/* 
   Start server
 */
connectDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
