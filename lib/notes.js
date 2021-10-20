//Dependencies used to write/read files and find general paths
const fs = require("fs");
const path = require("path");

//Function takes in req.query as  argument and filters through notes accordingly, returning the new filtered array
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

//Function takes in note id and array of notes and returns a single note object
const getNoteId = (id, notes) => {
  const result = notes.filter(note => note.id === id)[0];
  return result;
}

/*Function takes in db.json file in the data subdirectory, then uses path.join()
to join the value of __dirname which represents the directory of the file*/
const getNote = (body, notesArray) => {
  let note = body;
  notesArray.push(note)
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
}

/*Validation function that takes in new note data from req.body 
and checks if each key exists, and is the right data type*/
const validateNote = note => {
  if (!note.title || typeof note.title !== 'string') {
    return false
  }
  if (!note.text || typeof note.text !== 'string') {
    return false
  }
  return true
}

//Exporterd functions
module.exports = {
  filterByQuery,
  getNote,
  validateNote,
  getNoteId
};