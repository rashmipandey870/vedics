/**
 * Mongoose Schema for Birth Profiles
 * Database: local MongoDB (mongodb://localhost:27017/jyotishsetu)
 */

const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    dob: {
        type: String,
        required: true
    },
    birthTime: {
        type: String,
        required: true
    },
    birthPlace: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        default: 'Not Specified'
    },
    latitude: {
        type: Number,
        default: 28.6139 // New Delhi default
    },
    longitude: {
        type: Number,
        default: 77.2090
    },
    rashi: {
        type: String
    },
    nakshatra: {
        type: String
    },
    pada: {
        type: Number
    },
    paya: {
        type: String
    },
    lagna: {
        type: String
    },
    numerology: {
        mulank: Number,
        bhagyank: Number,
        nameNumber: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Profile', ProfileSchema);
