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

// Graceful local MongoDB connection setup
mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 3000 // 3-second timeout for local DB connection check
}).then(() => {
    console.log('✅ Connected to local MongoDB database at:', MONGO_URI);
}).catch((err) => {
    console.log('⚠️ [MongoDB Note] Local MongoDB daemon not detected on localhost:27017.');
    console.log('ℹ️ JeevanShaili is operating in Session Fallback Mode (Profiles will save in-memory).');
});

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
