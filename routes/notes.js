const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require ("fs");
const path = require('path');

// GET route to get all of the notes
router.get('/notes', (req, res) => readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data))));
// POST route to save notes
router.post('/notes', (req, res) => {
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully!`);
    } else {
      res.error('Error in adding note');
    }
  });
// DELETE route to delete notes
router.delete('/notes/:id', (req, res) => res.json(notesData));

// Defines the route that sends 'index.html' as a response to a client when a GET request is made
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});
// Defines the route that sends 'notes.html" as a response to a client when a GET request is made 
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});


module.exports = router;