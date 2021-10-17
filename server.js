const fs = require('fs');
const path = require('path');
const express = require('express');

const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

//Middleware to convert POST data to key/value pairings that can be accessed in the req.body object.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { notes } = require('./db/db.json')

app.use(express.static('public'));

const filterByQuery = (query, notesArray) => {
  let filteredResults = notesArray;
  if (query.title) {
    filteredResults = filteredResults.filter(note => note.title === query.title)
  }
  if (query.text) {
    filteredResults = filteredResults.filter(note => note.text === query.text)
  }
  return filteredResults
}

const getNote = (body, notesArray) => {
  let note = body;
  notesArray.push(note)
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
}

const validateNote = note => {
  if(!note.title || typeof note.title !== 'string') {
    return false
  }
  if(!note.text || typeof note.text !== 'string') {
    return false
  }
  return true
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

/*Function takes in req.query as an argument and filters through the notes accordingly
returning the new filtered array*/
app.get('/api/notes', (req, res) => {
  console.log(notes)
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results)
  }
  res.json(results);
});

//POST route that creates data to add to array while also passing through validation function
app.post('/api/notes', (req, res) => {
  console.log(req.body);
  req.body.id = uuidv4();
  if(!validateNote(req.body)) {
    res.status(400).send('This note is not properly formatted')
  } else {
    const note = getNote(req.body, notes)
    res.json(note);
  }
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});


