/**
 * Controller for Saving Birth Profiles & History Retrieval
 * Supports MongoDB local storage with an automatic in-memory fallback store if MongoDB is not running locally.
 */

const Profile = require('../../models/Profile');
const mongoose = require('mongoose');

// In-Memory Fallback Storage (if MongoDB is disconnected)
const memoryProfiles = [];

/**
 * Save User Birth Profile
 * POST /api/profile/save
 */
exports.saveProfile = async (req, res) => {
    try {
        const { name, dob, birthTime, birthPlace, gender, latitude, longitude, rashi, nakshatra, pada, paya, lagna, numerology } = req.body;

        if (!name || !dob || !birthTime) {
            return res.status(400).json({ success: false, message: "Missing required profile details." });
        }

        const profileData = {
            name,
            dob,
            birthTime,
            birthPlace: birthPlace || "Custom Location",
            gender: gender || "Not Specified",
            latitude: latitude || 28.6139,
            longitude: longitude || 77.2090,
            rashi: rashi || "",
            nakshatra: nakshatra || "",
            pada: pada || 1,
            paya: paya || "",
            lagna: lagna || "",
            numerology: numerology || { mulank: 1, bhagyank: 1, nameNumber: 1 },
            createdAt: new Date()
        };

        // Check if MongoDB is connected (readyState === 1)
        if (mongoose.connection.readyState === 1) {
            const newProfile = new Profile(profileData);
            const saved = await newProfile.save();
            return res.json({
                success: true,
                storageType: "MongoDB",
                message: "Profile saved successfully to local MongoDB!",
                profile: saved
            });
        } else {
            // Fallback to memory store
            const id = 'mem_' + Date.now();
            const memoryRecord = { _id: id, ...profileData };
            memoryProfiles.unshift(memoryRecord);
            return res.json({
                success: true,
                storageType: "InMemoryFallback",
                message: "Profile saved to active session store (Local MongoDB offline).",
                profile: memoryRecord
            });
        }
    } catch (err) {
        console.error("Error saving profile:", err);
        return res.status(500).json({ success: false, message: "Could not save profile." });
    }
};

/**
 * Get Profile History
 * GET /api/profile/history
 */
exports.getProfileHistory = async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            const history = await Profile.find().sort({ createdAt: -1 }).limit(20);
            return res.json({
                success: true,
                storageType: "MongoDB",
                count: history.length,
                profiles: history
            });
        } else {
            return res.json({
                success: true,
                storageType: "InMemoryFallback",
                count: memoryProfiles.length,
                profiles: memoryProfiles
            });
        }
    } catch (err) {
        console.error("Error fetching profile history:", err);
        return res.status(500).json({ success: false, message: "Could not fetch history." });
    }
};
