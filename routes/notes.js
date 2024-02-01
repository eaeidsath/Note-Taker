const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// get route to retrieve notes from db.json
notes.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// post route to enter new notes
notes.post('/', (req, res) => {
    // breaks down what is in the req.body
    const { title, text } = req.body;
  
    // checks that all the required properties are present
    if (title && text) {
      // const to represent the new note object
      const newNote = {
        title,
        text,
        // this function gives a unique id to each note
        note_id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);
    } else {
      res.json('Error in creating note.');
    }
});

notes.delete("/:id", (req, res) => {
    if (req.params.id) {

    }
});

module.exports = notes;