const express = require('express');
const { auth, adminOnly } = require('../middleware/auth');
const User = require('../models/User');
const Note = require('../models/Note');
const router = express.Router();

// Admin routes
// GET /api/admin/users
router.get('/users', auth, adminOnly, async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
});

// GET /api/admin/notes
router.get('/notes', auth, adminOnly, async (req, res) => {
  const notes = await Note.find().populate('user', 'email name').sort({ createdAt: -1 });
  res.json(notes);
});

// DELETE /api/admin/note/:id
router.delete('/note/:id', auth, adminOnly, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
