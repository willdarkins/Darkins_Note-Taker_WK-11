const router = require('express').Router();

const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const { filterByQuery, getNote, validateNote, getNoteId } = require('../../lib/notes');
const { notes } = require('../../db/db.json');

/*Function takes in req.query as an argument and filters through the notes accordingly
returning the new filtered array*/
router.get('/notes', (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results)
  }
  res.json(results);
});

//POST route that creates data to add to array while also passing through validation function
router.post('/notes', (req, res) => {
  req.body.id = uuidv4();
  if (!validateNote(req.body)) {
    res.status(400).send('This note is not properly formatted')
  } else {
    const note = getNote(req.body, notes)
    res.json(note);
  }
});

router.delete("/notes/:id", (req, res) => {
  const clickedCan = getNoteId(req.params.id, notes) 
  const index = notes.indexOf(clickedCan);
  if (index > -1) {
    notes.splice(index, 1)
    fs.writeFile(
      path.resolve(__dirname, "../../db/db.json"),
      JSON.stringify({notes}, null, "\t "),
      (error) => {
        if (error) console.error(error);
        res.json(notes);
      }
    );
  }
 });

module.exports = router;