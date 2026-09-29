/**
 * Controller for Astrological & Numerological Calculations
 */

const { calculatePlanetaryPositions } = require('../calculations/astronomy');
const { getRashiFromLongitude, getNakshatraFromLongitude, calculatePaya, getPlanetaryPositionsTable } = require('../calculations/astrology');
const { calculateVimshottariDasha } = require('../calculations/dashaCalculator');
const { calculateMulank, calculateBhagyank, calculateNameNumber, calculateTodayNumber, evaluateCompatibility } = require('../calculations/numerology');

const rashis = require('../../data/rashis');
const nakshatras = require('../../data/nakshatras');
const educationalTopics = require('../../data/interpretations');

/**
 * Calculates Full Cosmic Profile from birth details
 * POST /api/calculate/profile
 */
exports.calculateFullProfile = (req, res) => {
    try {
        const { name, dob, birthTime, birthPlace, latitude, longitude, gender } = req.body;

        // Input validation
        if (!name || !dob || !birthTime) {
            return res.status(400).json({
                success: false,
                message: "Full Name, Date of Birth, and Time of Birth are required."
            });
        }

        const lat = parseFloat(latitude) || 28.6139; // Default New Delhi latitude
        const lng = parseFloat(longitude) || 77.2090; // Default New Delhi longitude

        // 1. Calculate Astronomical Positions
        const astroPositions = calculatePlanetaryPositions(dob, birthTime, lat, lng);

        // 2. Lagna (Ascendant) details
        const lagnaRashi = getRashiFromLongitude(astroPositions.lagna);
        
        // 3. Moon Sign & Nakshatra
        const moonRashi = getRashiFromLongitude(astroPositions.moon);
        const sunRashi = getRashiFromLongitude(astroPositions.sun);
        const nakshatraInfo = getNakshatraFromLongitude(astroPositions.moon);

        // 4. Moon House placement & Paya calculation
        const moonHouse = ((moonRashi.rashiId - lagnaRashi.rashiId + 12) % 12) + 1;
        const payaInfo = calculatePaya(moonHouse);

        // 5. Planetary Positions Table
        const planetaryTable = getPlanetaryPositionsTable(astroPositions, lagnaRashi.rashiId);

        // 6. Vimshottari Dasha Calculation
        const dashaInfo = calculateVimshottariDasha(astroPositions.moon, dob);

        // 7. Numerology Summary
        const birthDay = parseInt(dob.split('-')[2], 10);
        const mulankRes = calculateMulank(birthDay);
        const bhagyankRes = calculateBhagyank(dob);
        const nameNumRes = calculateNameNumber(name, 'chaldean');

        // Build Response
        const result = {
            success: true,
            userMeta: {
                name,
                dob,
                birthTime,
                birthPlace: birthPlace || "City Coordinates Specified",
                gender: gender || "Not Specified",
                latitude: lat,
                longitude: lng
            },
            coreProfile: {
                rashi: {
                    name: moonRashi.name,
                    sanskrit: moonRashi.sanskrit,
                    symbol: moonRashi.symbol,
                    ruler: moonRashi.ruler,
                    element: moonRashi.element,
                    degree: moonRashi.degreeFormatted,
                    description: moonRashi.name + " (" + moonRashi.sanskrit + ") is governed by " + moonRashi.ruler + "."
                },
                nakshatra: {
                    name: nakshatraInfo.name,
                    sanskrit: nakshatraInfo.sanskrit,
                    lord: nakshatraInfo.lord,
                    deity: nakshatraInfo.deity,
                    symbol: nakshatraInfo.symbol,
                    characteristics: nakshatraInfo.characteristics
                },
                pada: nakshatraInfo.pada,
                nakshatraLord: nakshatraInfo.lord,
                paya: payaInfo,
                lagna: {
                    name: lagnaRashi.name,
                    sanskrit: lagnaRashi.sanskrit,
                    degree: lagnaRashi.degreeFormatted,
                    ruler: lagnaRashi.ruler
                },
                sunSign: {
                    name: sunRashi.name,
                    sanskrit: sunRashi.sanskrit,
                    degree: sunRashi.degreeFormatted
                },
                moonSign: {
                    name: moonRashi.name,
                    sanskrit: moonRashi.sanskrit,
                    degree: moonRashi.degreeFormatted
                }
            },
            planetaryPositions: planetaryTable,
            kundliChart: {
                lagnaRashiId: lagnaRashi.rashiId,
                lagnaRashiName: lagnaRashi.name,
                houses: Array.from({ length: 12 }, (_, i) => {
                    const houseNum = i + 1;
                    const rashiIdForHouse = ((lagnaRashi.rashiId - 1 + i) % 12) + 1;
                    const planetsInHouse = planetaryTable.filter(p => p.house === houseNum);
                    return {
                        house: houseNum,
                        rashiId: rashiIdForHouse,
                        rashiName: rashis[rashiIdForHouse].name,
                        planets: planetsInHouse.map(p => p.symbol + " " + p.planet)
                    };
                })
            },
            dasha: dashaInfo,
            numerology: {
                mulank: mulankRes.mulank,
                bhagyank: bhagyankRes.bhagyank,
                nameNumber: nameNumRes.nameNumber,
                mulankProfile: mulankRes.profile,
                bhagyankProfile: bhagyankRes.profile,
                nameNumberProfile: nameNumRes.profile
            }
        };

        return res.json(result);
    } catch (err) {
        console.error("Error calculating profile:", err);
        return res.status(500).json({
            success: false,
            message: "An error occurred while performing astrological calculations."
        });
    }
};

/**
 * Calculates Numerology Details with step-by-step math
 * POST /api/calculate/numerology
 */
exports.calculateNumerologyModule = (req, res) => {
    try {
        const { name, dob, system } = req.body;

        if (!dob) {
            return res.status(400).json({
                success: false,
                message: "Date of Birth is required for numerology calculations."
            });
        }

        const day = parseInt(dob.split('-')[2], 10);
        const mulankData = calculateMulank(day);
        const bhagyankData = calculateBhagyank(dob);
        const nameData = calculateNameNumber(name || "Visitor", system || 'chaldean');
        const todayData = calculateTodayNumber();

        return res.json({
            success: true,
            mulank: mulankData,
            bhagyank: bhagyankData,
            nameNumber: nameData,
            todayNumber: todayData
        });
    } catch (err) {
        console.error("Error in numerology calculation:", err);
        return res.status(500).json({ success: false, message: "Numerology calculation error." });
    }
};

/**
 * Calculates Compatibility between two birth numbers
 * POST /api/calculate/compatibility
 */
exports.calculateCompatibilityModule = (req, res) => {
    try {
        const { numA, numB } = req.body;
        if (!numA || !numB) {
            return res.status(400).json({ success: false, message: "Please provide both Person A and Person B numbers." });
        }
        const result = evaluateCompatibility(numA, numB);
        return res.json({ success: true, compatibility: result });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Compatibility calculation error." });
    }
};

/**
 * Get Rashis dataset
 * GET /api/rashis
 */
exports.getRashis = (req, res) => {
    return res.json({ success: true, rashis });
};

/**
 * Get Nakshatras dataset
 * GET /api/nakshatras
 */
exports.getNakshatras = (req, res) => {
    return res.json({ success: true, nakshatras });
};

/**
 * Get Educational Content
 * GET /api/learn
 */
exports.getLearnTopics = (req, res) => {
    return res.json({ success: true, topics: educationalTopics });
};
