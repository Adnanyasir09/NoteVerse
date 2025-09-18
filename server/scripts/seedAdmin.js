require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

(async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  const existing = await User.findOne({ email: 'admin@example.com' });
  if (existing) {
    console.log('Admin already exists');
    process.exit(0);
  }
  const hashed = await bcrypt.hash('admin123', 10);
  const admin = await User.create({ name: 'Admin', email: 'admin@example.com', password: hashed, isAdmin: true });
  console.log('Admin created', admin.email);
  process.exit(0);
})();
