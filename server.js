const express = require('express');
const path = require('path');
const api = require('./routes/notes.js');

const PORT = process.env.PORT || 3001

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api);

// Public directory, accessible to client
app.use(express.static('public'));

// Defines a route that will serve the index.html file when a user visits the root path of the app
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
















