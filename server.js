const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { notes } = require('./db/db.json')

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    console.log(notes)
    res.json(notes);
});




app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});


