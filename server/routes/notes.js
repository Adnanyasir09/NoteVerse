const express = require('express');
const Note = require('../models/Note');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Create note
// POST /api/notes
router.post('/', auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const note = await Note.create({ user: req.user.id, title, description });
    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/notes -> user's notes
router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/notes/:id
router.put('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    if (note.user.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    note.title = req.body.title ?? note.title;
    note.description = req.body.description ?? note.description;
    await note.save();
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/notes/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Important: Still check for authorization before deleting
    if (note.user.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Use the modern and efficient findByIdAndDelete method
    await Note.findByIdAndDelete(req.params.id);

    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;