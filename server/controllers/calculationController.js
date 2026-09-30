/**
 * JeevanShaili - Controller for Astrological & Numerological Calculations
 * Author: Rashmi Pandey
 */

const { calculatePlanetaryPositions } = require('../calculations/astronomy');
const { getRashiFromLongitude, getNakshatraFromLongitude, calculatePaya, getPlanetaryPositionsTable, calculatePlanetaryAspects } = require('../calculations/astrology');
const { calculateVargaCharts } = require('../calculations/varga');
const { calculateVimshottariDasha } = require('../calculations/dashaCalculator');
const { calculateMulank, calculateBhagyank, calculateNameNumber, calculateTodayNumber, evaluateCompatibility, indianPlanetaryMap } = require('../calculations/numerology');
const { calculateVedicYogas } = require('../calculations/yogas');

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

        // 1. Calculate Sidereal Astronomical Positions
        const astroPositions = calculatePlanetaryPositions(dob, birthTime, lat, lng);

        // 2. Lagna (Ascendant) details
        const lagnaRashi = getRashiFromLongitude(astroPositions.lagna);
        
        // 3. Moon Sign & Nakshatra
        const moonRashi = getRashiFromLongitude(astroPositions.moon);
        const sunRashi = getRashiFromLongitude(astroPositions.sun);
        const nakshatraInfo = getNakshatraFromLongitude(astroPositions.moon);

        // 4. Moon House placement & Paya calculation
        const moonHouse = ((moonRashi.rashiId - lagnaRashi.rashiId + 12) % 12) + 1;
        const payaInfo = calculatePaya(moonHouse, lagnaRashi.name, moonRashi.name);

        // 5. Planetary Positions Table (with Dignity, Combustion, Retrograde)
        const planetaryTable = getPlanetaryPositionsTable(astroPositions, lagnaRashi.rashiId);

        // 6. Graha Drishti (Planetary Aspects)
        const planetaryAspects = calculatePlanetaryAspects(planetaryTable);

        // 7. Varga Charts (D1, D4, D9 Navamsha, D10 Dashamsha + Vargottama detection)
        const vargaData = calculateVargaCharts(astroPositions, astroPositions.lagna);

        // 8. Vedic Yogas & Life Benefits Engine
        const yogasInfo = calculateVedicYogas(planetaryTable, lagnaRashi.rashiId, vargaData.vargottamaPlanets);

        // 9. Vimshottari Dasha Calculation
        const dashaInfo = calculateVimshottariDasha(astroPositions.moon, dob);

        // 9. Numerology Summary
        const birthDay = parseInt(dob.split('-')[2], 10);
        const mulankRes = calculateMulank(birthDay);
        const bhagyankRes = calculateBhagyank(dob);
        const nameNumRes = calculateNameNumber(name, 'chaldean');

        // House Signification Names in Traditional Vedic Astrology (Bhavas)
        const houseBhavaNames = [
            "1st House (Tanu Bhava) - Self, Physical Body, Personality",
            "2nd House (Dhana Bhava) - Wealth, Family, Speech",
            "3rd House (Sahaja Bhava) - Courage, Siblings, Communication",
            "4th House (Matru Bhava) - Mother, Home, Vehicles, Comforts",
            "5th House (Putra Bhava) - Children, Intellect, Speculation",
            "6th House (Shatru Bhava) - Health, Obstacles, Daily Service",
            "7th House (Kalatra Bhava) - Spouse, Partnerships, Trade",
            "8th House (Randhra Bhava) - Transformation, Longevity, Occult",
            "9th House (Bhagya Bhava) - Higher Knowledge, Guru, Dharma, Luck",
            "10th House (Karma Bhava) - Career, Profession, Public Honor",
            "11th House (Labha Bhava) - Gains, Ambition, Social Network",
            "12th House (Vyaya Bhava) - Expenses, Moksha, Foreign Lands"
        ];

        // Build Full Response
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
            methodologyMeta: {
                zodiac: "Sidereal (Nirayana)",
                ayanamsha: `Lahiri (Chitrapaksha) - ${astroPositions.ayanamsha}°`,
                primaryChart: "D1 Rashi Chart",
                divisionalCharts: "D1, D4, D9 (Navamsha), D10 (Dashamsha)",
                dashaSystem: "Vimshottari (120 Years)",
                numerologySystem: "Indian / Chaldean Letter Mapping"
            },
            coreProfile: {
                rashi: {
                    name: moonRashi.name,
                    sanskrit: moonRashi.sanskrit,
                    symbol: moonRashi.symbol,
                    ruler: moonRashi.ruler,
                    element: moonRashi.element,
                    degree: moonRashi.degreeFormatted,
                    description: moonRashi.name + " (" + moonRashi.sanskrit + ") is governed by " + moonRashi.ruler + ".",
                    calculationSteps: moonRashi.calculationSteps
                },
                nakshatra: {
                    name: nakshatraInfo.name,
                    sanskrit: nakshatraInfo.sanskrit,
                    lord: nakshatraInfo.lord,
                    deity: nakshatraInfo.deity,
                    symbol: nakshatraInfo.symbol,
                    characteristics: nakshatraInfo.characteristics,
                    calculationSteps: nakshatraInfo.calculationSteps
                },
                pada: {
                    number: nakshatraInfo.pada,
                    elapsedFormatted: nakshatraInfo.elapsedFormatted,
                    calculationSteps: [
                        `Nakshatra: ${nakshatraInfo.name}`,
                        `Elapsed Angle in Nakshatra: ${nakshatraInfo.elapsedFormatted}`,
                        `Formula: Math.floor(ElapsedAngle ÷ 3°20') + 1`,
                        `Evaluated Pada: Pada ${nakshatraInfo.pada}`
                    ]
                },
                nakshatraLord: {
                    name: nakshatraInfo.lord,
                    dashaYears: nakshatras.find(n => n.name === nakshatraInfo.name)?.dashaYears || 7,
                    calculationSteps: [
                        `Birth Nakshatra: ${nakshatraInfo.name}`,
                        `Vimshottari Nakshatra-Lord Map: ${nakshatraInfo.name} -> ${nakshatraInfo.lord}`,
                        `Mahadasha Period: ${nakshatraInfo.lord} governs a standard ${nakshatras.find(n => n.name === nakshatraInfo.name)?.dashaYears || 7}-Year Mahadasha`
                    ]
                },
                paya: payaInfo,
                lagna: {
                    name: lagnaRashi.name,
                    sanskrit: lagnaRashi.sanskrit,
                    degree: lagnaRashi.degreeFormatted,
                    ruler: lagnaRashi.ruler,
                    calculationSteps: [
                        `Local Sidereal Time (LST): ${astroPositions.lst}°`,
                        `Ascendant (Lagna) Formula: tan(Asc) = cos(LST) / (-sin(ε)*tan(lat) - cos(ε)*sin(LST))`,
                        `Sidereal Lagna Longitude: ${astroPositions.lagna}°`,
                        `Rashi Mapping: ${lagnaRashi.name} (${lagnaRashi.sanskrit}) at ${lagnaRashi.degreeFormatted}`
                    ]
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
            planetaryAspects,
            vargaCharts: vargaData.charts,
            vargottamaPlanets: vargaData.vargottamaPlanets,
            yogas: yogasInfo,
            astronomySteps: astroPositions.calculationSteps,
            kundliChart: vargaData.charts.D1,
            dasha: dashaInfo,
            numerology: {
                mulank: mulankRes.mulank,
                bhagyank: bhagyankRes.bhagyank,
                nameNumber: nameNumRes.nameNumber,
                mulankData: mulankRes,
                bhagyankData: bhagyankRes,
                nameNumberData: nameNumRes,
                indianPlanetaryMap
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
 * Calculates Numerology Details
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
            todayNumber: todayData,
            indianPlanetaryMap
        });
    } catch (err) {
        console.error("Error in numerology calculation:", err);
        return res.status(500).json({ success: false, message: "Numerology calculation error." });
    }
};

/**
 * Calculates Symmetric Numerology Compatibility
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
