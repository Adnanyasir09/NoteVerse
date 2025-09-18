require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const adminRoutes = require('./routes/admin');

const app = express();

// Middleware
app.use(express.json());

// CORS Configuration (Improved)
const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Connect DB (Fixed to use DATABASE_URL)
connectDB(process.env.DATABASE_URL);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/admin', adminRoutes);

// Simple error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server error');
});

// Port configuration for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));