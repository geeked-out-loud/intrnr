// intrnr/backend/app.js
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post'); 

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Optional: Extra headers for frontend CORS debugging
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Connect to MongoDB
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/post', postRoutes); 

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
