const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const fs = require('fs');
const path = require('path');

const express = require('express');
const { notes } = require('./db/db.json')

const PORT = process.env.PORT || 3001;

const app = express();

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
//Middleware to convert POST data to key/value pairings that can be accessed in the req.body object.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});