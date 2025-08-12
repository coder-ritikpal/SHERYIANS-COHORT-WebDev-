const express = require('express');
const authRoutes = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');
const postRoutes = require('./routes/post.routes');
const cors = require('cors');

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend-domain.com'], // Add your deployed frontend URL later
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;
