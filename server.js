const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { notes } = require('./db/db.json')

app.use(express.static('public'));

const filterByQuery = (query, notesArray) => {
    let filteredResults = notesArray;
    if(query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title)
    }
    if(query.text) {
        filteredResults = filteredResults.filter(note => note.text === query.text)
    }
    return filteredResults
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'))
  })

/*Function takes in req.query as an argument and filters through the notes accordingly
returning the new filtered array*/
app.get('/api/notes', (req, res) => {
    console.log(notes)
    let results = notes;
    if(req.query) {
        results = filterByQuery(req.query, results)
    }
    res.json(results);
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});


