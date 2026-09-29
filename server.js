/**
 * JyotishSetu - Express Server Entry Point
 * 
 * "Vedic Astrology & Numerology Calculator"
 * Educational full-stack project for B.Tech CS Viva presentation.
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const apiRoutes = require('./server/routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/jyotishsetu';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend assets
app.use(express.static(path.join(__dirname, 'public')));

// Mount API routes
app.use('/api', apiRoutes);

// Catch-all route to serve static HTML files gracefully
app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

app.get('/numerology', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'numerology.html'));
});

app.get('/learn', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'learn.html'));
});

app.get('/history', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'history.html'));
});

// Graceful local MongoDB connection
mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 3000 // Fast 3-second timeout for local DB check
}).then(() => {
    console.log('✅ Connected to local MongoDB at:', MONGO_URI);
}).catch((err) => {
    console.log('⚠️ [MongoDB Note] Local MongoDB server not detected on localhost:27017.');
    console.log('ℹ️ Application is running in Fallback Session Mode. Profile saving will operate seamlessly in-memory!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`===========================================================`);
    console.log(`🌌 JyotishSetu Server running on http://localhost:${PORT}`);
    console.log(`📜 Educational Vedic Astrology & Numerology Calculator`);
    console.log(`===========================================================`);
});
