const express = require('express');
const path = require('path');
const api = require('./routes/notes');
const notesData = require('./db/db.json')

const PORT = 3001;

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


// app.get = route: captures a request made to an endpoint
// '/' = request from client. route on server capturing the request, map client request to server route
// app.get('/', (req, res) => res.send('Navigate to /send or /routes'));

// Response object, sending file back to client, join method: building path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
  
  app.get('/api/terms', (req, res) => res.json(termData));















