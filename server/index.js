import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes.js';
import authRoutes from './routes/authRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL] // Add your Vercel frontend URL here
    : 'http://localhost:5173', // Your Vite dev server
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection with retry logic
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    // Retry connection after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

connectDB();

// Routes
app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

app.listen(port, () => {
  console.log(`🚀 Server is live at http://localhost:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});