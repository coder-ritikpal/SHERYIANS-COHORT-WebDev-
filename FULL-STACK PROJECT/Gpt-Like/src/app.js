const express = require('express');
const app = express();
const authRoutes = require('./routes/auth.routes');
const indexRoutes = require('./routes/index.routes');

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));    
app.use('/auth', authRoutes);
app.use('/', indexRoutes);


module.exports = app;