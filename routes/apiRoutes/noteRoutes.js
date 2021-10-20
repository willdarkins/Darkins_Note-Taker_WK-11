const fs = require("fs");
const router = require('express').Router();
const { filterByQuery, getNote, validateNote } = require('../../lib/notes');
const { notes } = require('../../db/db.json');

const { v4: uuidv4 } = require('uuid');

/*Function takes in req.query as an argument and filters through the notes accordingly
returning the new filtered array*/
router.get('/notes', (req, res) => {
  console.log(notes)
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results)
  }
  res.json(results);
});

//POST route that creates data to add to array while also passing through validation function
router.post('/notes', (req, res) => {
  console.log(req.body);
  req.body.id = uuidv4();
  if (!validateNote(req.body)) {
    res.status(400).send('This note is not properly formatted')
  } else {
    const note = getNote(req.body, notes)
    res.json(note);
  }
});

router.delete("/notes/:id", (req, res) => {
  notes.splice(req.params.id, 1);
  fs.writeFile(
    path.resolve(__dirname, "../db/db.json"),
    JSON.stringify(notes),
    function (error) {
      if (error) console.error(error);
      res.json(notes);
    }
  );
});

module.exports = router;