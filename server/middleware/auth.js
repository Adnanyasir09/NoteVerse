// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) 
    return res.status(401).json({ message: 'Unauthorized' });

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user; // attach full user document
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid token' });
  }
};

const adminOnly = (req, res, next) => {
  if (!req.user?.isAdmin) return res.status(403).json({ message: 'Admin only' });
  next();
};

module.exports = { auth, adminOnly };
