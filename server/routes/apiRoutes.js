/**
 * API Express Routes for Astrology & Numerology Calculations
 */

const express = require('express');
const router = express.Router();

const calculationController = require('../controllers/calculationController');
const profileController = require('../controllers/profileController');

// Calculation endpoints
router.post('/calculate/profile', calculationController.calculateFullProfile);
router.post('/calculate/numerology', calculationController.calculateNumerologyModule);
router.post('/calculate/compatibility', calculationController.calculateCompatibilityModule);

// Dataset endpoints
router.get('/rashis', calculationController.getRashis);
router.get('/nakshatras', calculationController.getNakshatras);
router.get('/learn', calculationController.getLearnTopics);

// Profile DB endpoints
router.post('/profile/save', profileController.saveProfile);
router.get('/profile/history', profileController.getProfileHistory);

module.exports = router;
