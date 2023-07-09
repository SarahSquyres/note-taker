const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const path = require('path');

// GET route to retrieve notes from database and sends back as JSON data
// fs.readFileSync reads the database file
router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        let dbData = JSON.parse(data);
        res.json(dbData)
    });   
});

// POST route saves notes to database, UUID generates a unique id for each note
router.post('/notes', (req, res) => {
    const dbData = JSON.parse(fs.readFileSync('./db/db.json','utf8'));
    const newNotes = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4(),
    };
    dbData.push(newNotes);
    fs.writeFileSync('./db/db.json',JSON.stringify(dbData));
    res.json(dbData);
  });

// DELETE route to delete notes, :id is used as a placeholder for the ID of the note to be deleted
// Note will be returned if the note id is not equal to the requested id 
router.delete('/notes/:id', (req, res) => {
  let data = fs.readFileSync('./db/db.json','utf8');
  let dbData = JSON.parse(data);
  const newNotes = dbData.filter((note) => { 
    return note.id !== req.params.id;
  });
  fs.writeFileSync('./db/db.json',JSON.stringify(newNotes));
  res.json("Note deleted.");
});

// Defines the route that sends 'index.html' as a response to a client when a GET request is made
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

// Defines the route that sends 'notes.html" as a response to a client when a GET request is made 
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

// Exports router object which allows other parts of the app to access routes
module.exports = router;