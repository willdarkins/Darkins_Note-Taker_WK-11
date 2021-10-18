const fs = require("fs");
const path = require("path");

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
      path.join(__dirname, '../db/db.json'),
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

  module.exports = {
    filterByQuery,
    getNote,
    validateNote
  };