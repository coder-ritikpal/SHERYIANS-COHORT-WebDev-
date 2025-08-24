const express = require('express');
const connectDB = require('./db/db');
const authRoutes = require('./routes/auth.routes');
const chatRoutes = require('./routes/chat.routes');
const cookieParser = require('cookie-parser');

const app = express();

connectDB();


app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes);
app.use('/api/chat',chatRoutes); 


module.exports = app;

