const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');

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
        id: uuidv4(),
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

// delete route that spliced the selected note from the json array
notes.delete("/:id", async (req, res) => {
    try {
      fs.readFile('./db/db.json', 'utf8', (err, data) => {
        const db = JSON.parse(data);
        const index = db.findIndex((notes) =>
        notes.id === req.params.id
        );
        db.splice(index, 1);
        writeToFile('./db/db.json', db);
        })
        location.reload();
        res.status(200).json({status: 'success'});
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = notes;