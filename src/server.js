const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRouter');
const userRoutes = require('./routes/api/users');
const carRoutes = require('./routes/api/cars');
const requestRoutes = require('./routes/api/Request');

const feedbackRoutes = require('./routes/api/Feedback');

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/uploads", express.static("uploads"));

// Serve static files from React build
const buildPath = path.join(__dirname, '../front/build');
app.use(express.static(buildPath));

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/requests', requestRoutes);

app.use('/api/feedback', feedbackRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Serve React app for all non-API routes (SPA fallback)
app.use((req, res, next) => {
  // If request is for API, skip this middleware
  if (req.path.startsWith('/api/')) {
    return next();
  }
  // Serve React index.html for all other routes
  res.sendFile(path.join(buildPath, 'index.html'), (err) => {
    if (err) {
      res.status(404).json({ message: 'Not found' });
    }
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas!');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });