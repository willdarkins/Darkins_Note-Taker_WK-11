const fs = require("fs");
const path = require("path");
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
  let deleteNote = req.params.id;
  fs.readFile(__dirname + "../../db/db.json", (err, data) => {
      if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
      }
      try {
          let json = JSON.parse(data);
      } catch(e) {
          console.log(err);
          res.sendStatus(500);
          return;
      }

      for (let i = 0; i < json.length; i++) {
          if (json[i].id === deleteNote) {
              json.splice(i, 1);
              return;
          }
      }

      fs.writeFile(__dirname + "../../db/db.json", JSON.stringify(json), (err) => {
          if (err) {
              console.log(err);
              res.sendStatus(500);
              return;
          }
          res.send("Successfully deleted");
      });
  });
});

// router.delete("/notes/:id", (req, res) => {
//   notes.splice(req.params.id, 1);
//   fs.writeFile(
//     path.resolve(__dirname, "../db/db.json"),
//     JSON.stringify(notes),
//     function (error) {
//       if (error) console.error(error);
//       res.json(notes);
//     }
//   );
// });

module.exports = router;