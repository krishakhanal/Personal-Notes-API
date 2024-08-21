const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to log request details
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Middleware for input validation
app.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!req.body.title || !req.body.content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
  }
  next();
});

// Load notes from JSON file
const loadNotes = () => JSON.parse(fs.readFileSync(path.join(__dirname, 'notes.json')));

// Save notes to JSON file
const saveNotes = (notes) => fs.writeFileSync(path.join(__dirname, 'notes.json'), JSON.stringify(notes));

// GET /notes - Retrieve all notes
app.get('/notes', (req, res) => {
  const notes = loadNotes();
  res.json(notes);
});

// GET /notes/:id - Retrieve a specific note by ID
app.get('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const notes = loadNotes();
  const note = notes.find(note => note.id === id);
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }
  res.json(note);
});

// GET /notes/search?keyword=<keyword> - Search notes by keyword
app.get('/notes/search', (req, res) => {
  const keyword = req.query.keyword?.toLowerCase();
  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required' });
  }

  // GET /notes - Retrieve all notes with optional filtering
app.get('/notes', (req, res) => {
  const { date, priority } = req.query;
  let notes = loadNotes();
  
  if (date) {
    notes = notes.filter(note => note.date === date);
  }
  
  if (priority) {
    notes = notes.filter(note => note.priority === priority);
  }
  
  res.json(notes);
});

  
  const notes = loadNotes();
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(keyword) || 
    note.content.toLowerCase().includes(keyword)
  );
  
  res.json(filteredNotes);
});

// Middleware for input validation
app.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    const { title, content, date, priority } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    // Optional: validate date and priority
    if (date && isNaN(Date.parse(date))) {
      return res.status(400).json({ error: 'Invalid date format' });
    }
    if (priority && !['low', 'medium', 'high'].includes(priority)) {
      return res.status(400).json({ error: 'Invalid priority value' });
    }
  }
  next();
});




// POST /notes - Add a new note
app.post('/notes', (req, res) => {
  const notes = loadNotes();
  const newNote = {
    id: notes.length + 1,
    title: req.body.title,
    content: req.body.content,
  };
  notes.push(newNote);
  saveNotes(notes);
  res.json(newNote);
});

// PUT /notes/:id - Update a specific note by ID
app.put('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const notes = loadNotes();
  const note = notes.find(note => note.id === id);
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }
  note.title = req.body.title;
  note.content = req.body.content;
  saveNotes(notes);
  res.json(note);
});

// DELETE /notes/:id - Delete a specific note by ID
app.delete('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let notes = loadNotes();
  const noteIndex = notes.findIndex(note => note.id === id);
  if (noteIndex === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }
  notes.splice(noteIndex, 1);
  saveNotes(notes);
  res.json({ message: 'Note deleted' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
