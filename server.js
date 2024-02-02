const express = require('express');
const { clog } = require('./middleware/clog.js');
const path = require('path');
const api = require('./routes/index.js')
const PORT = 3001;

const app = express();

app.use(clog);

// middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Send all the requests that begin with /api to the index.js in the routes folder
app.use('/api', api);

// sets static pages
app.use(express.static('public'));

// get route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// get route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);