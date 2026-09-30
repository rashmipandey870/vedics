/**
 * JeevanShaili - Express Server Entry Point
 * 
 * "Vedic Astrology & Numerology Calculator"
 * Built by Rashmi Pandey.
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const apiRoutes = require('./server/routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/jeevanshaili';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend assets
app.use(express.static(path.join(__dirname, 'public')));

// Mount API routes
app.use('/api', apiRoutes);

// Page Routing
app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

app.get('/numerology', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'numerology.html'));
});

app.get('/learn', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'learn.html'));
});

app.get('/methodology', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'methodology.html'));
});

app.get('/history', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'history.html'));
});

app.get('/presentation', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'presentation.html'));
});

// Fast non-blocking MongoDB connection setup
if (process.env.MONGO_URI || !process.env.VERCEL) {
    mongoose.connect(MONGO_URI, {
        serverSelectionTimeoutMS: 800 // 800ms fast timeout to avoid blocking serverless requests
    }).then(() => {
        console.log('✅ Connected to MongoDB database at:', MONGO_URI);
    }).catch((err) => {
        console.log('ℹ️ JeevanShaili operating in Fast In-Memory Fallback Mode.');
    });
}

// Start Server (when run directly)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`================================================================`);
        console.log(`🌌 JeevanShaili Server active at http://localhost:${PORT}`);
        console.log(`📜 Vedic Astrology • Numerology • Dasha Engine`);
        console.log(`👩‍💻 Built by Rashmi Pandey | B.Tech Computer Science Project`);
        console.log(`================================================================`);
    });
}

// Export app for Vercel serverless function execution
module.exports = app;
