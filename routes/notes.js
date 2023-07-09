const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const path = require('path');

// GET route to get all of the notes
router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        ///error logging
        if (err) throw err;
        let dbData = JSON.parse(data);
        //Returns new database
        res.json(dbData)
    });   
});

// POST route to save notes
router.post('/notes', (req, res) => {
    const dbData = JSON.parse(fs.readFileSync('./db/db.json','utf8'));
    const newFeedback = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4(),
    };
    dbData.push(newFeedback);
    fs.writeFileSync('./db/db.json',JSON.stringify(dbData));
    res.json(dbData);
  });

// DELETE route to delete notes
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


module.exports = router;