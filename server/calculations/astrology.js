/**
 * JeevanShaili - Vedic Astrology Rule Engine
 * 
 * Reusable constants, Rashi, Nakshatra, Pada, Paya, Planetary Dignities, Combustion, Retrograde, and Graha Drishti.
 * 
 * Author: Rashmi Pandey
 */

const rashis = require('../../data/rashis');
const nakshatras = require('../../data/nakshatras');
const planetsData = require('../../data/planets');

// Reusable Constants
const ZODIAC_DEGREES = 360;
const NAKSHATRA_COUNT = 27;
const NAKSHATRA_SPAN = 13 + 20 / 60; // 13.333333333333334 degrees (13°20')
const PADA_SPAN = 3 + 20 / 60;       // 3.3333333333333335 degrees (3°20')

/**
 * Normalizes angle to [0, 360)
 */
function normalizeAngle(deg) {
    let res = deg % ZODIAC_DEGREES;
    return res < 0 ? res + ZODIAC_DEGREES : res;
}

/**
 * Calculates Rashi index (1-12) and degree (0-30) from longitude (0-360)
 */
function getRashiFromLongitude(longitude) {
    const normLong = normalizeAngle(longitude);
    let rashiId = Math.floor(normLong / 30) + 1;
    if (rashiId > 12) rashiId = 12; // boundary guard

    const degreeInRashi = normLong % 30;
    const rashiData = rashis[rashiId];

    const degInt = Math.floor(degreeInRashi);
    const minInt = Math.floor((degreeInRashi % 1) * 60);

    return {
        rashiId,
        name: rashiData.name,
        sanskrit: rashiData.sanskrit,
        symbol: rashiData.symbol,
        ruler: rashiData.ruler,
        element: rashiData.element,
        nature: rashiData.nature,
        degree: Number(degreeInRashi.toFixed(2)),
        degreeFormatted: `${degInt}° ${minInt}'`,
        calculationSteps: [
            `Sidereal Longitude: ${normLong.toFixed(2)}°`,
            `Formula: Longitude ÷ 30° = ${normLong.toFixed(2)} ÷ 30 = ${(normLong / 30).toFixed(4)}`,
            `Rashi Index: Math.floor(${(normLong / 30).toFixed(4)}) + 1 = ${rashiId} -> ${rashiData.name} (${rashiData.sanskrit})`,
            `Degree within Rashi: ${normLong.toFixed(2)}° % 30° = ${degInt}° ${minInt}'`,
            `Ruling Graha: ${rashiData.ruler}`
        ]
    };
}

/**
 * Calculates Nakshatra & Pada details from Sidereal Moon Longitude
 */
function getNakshatraFromLongitude(moonLongitude) {
    const normLong = normalizeAngle(moonLongitude);

    let nakIndex = Math.floor(normLong / NAKSHATRA_SPAN);
    if (nakIndex >= NAKSHATRA_COUNT) nakIndex = NAKSHATRA_COUNT - 1; // boundary guard

    const nakData = nakshatras[nakIndex];

    const elapsedInNak = normLong - (nakIndex * NAKSHATRA_SPAN);
    let pada = Math.floor(elapsedInNak / PADA_SPAN) + 1;
    if (pada > 4) pada = 4; // boundary guard

    const progressPercentage = Number(((elapsedInNak / NAKSHATRA_SPAN) * 100).toFixed(2));
    const remainingInNak = NAKSHATRA_SPAN - elapsedInNak;

    const degInt = Math.floor(elapsedInNak);
    const minInt = Math.floor((elapsedInNak % 1) * 60);

    return {
        nakshatraId: nakData.id,
        name: nakData.name,
        sanskrit: nakData.sanskrit,
        lord: nakData.lord,
        lordKey: nakData.lordKey,
        deity: nakData.deity,
        symbol: nakData.symbol,
        element: nakData.element,
        pada,
        characteristics: nakData.characteristics,
        elapsedDegrees: Number(elapsedInNak.toFixed(2)),
        elapsedFormatted: `${degInt}° ${minInt}'`,
        progressPercentage,
        remainingDegrees: Number(remainingInNak.toFixed(2)),
        calculationSteps: [
            `Sidereal Moon Longitude: ${normLong.toFixed(2)}°`,
            `Standard Nakshatra Division: 360° ÷ 27 = 13°20' (13.3333°) per Nakshatra`,
            `Nakshatra Index Formula: Math.floor(${normLong.toFixed(2)} ÷ 13.3333) = ${nakIndex}`,
            `Resulting Nakshatra #${nakData.id}: ${nakData.name} (${nakData.sanskrit})`,
            `Elapsed Angle in Nakshatra: ${normLong.toFixed(2)}° - (${nakIndex} × 13.3333°) = ${degInt}° ${minInt}'`,
            `Pada Division (3°20' = 3.3333° per Pada): Math.floor(${elapsedInNak.toFixed(2)} ÷ 3.3333) + 1 = Pada ${pada}`,
            `Nakshatra Lord (Ruling Graha): ${nakData.lord} (Total Mahadasha: ${nakData.dashaYears} Years)`,
            `Remaining Fraction in Nakshatra: (${remainingInNak.toFixed(2)}° ÷ 13.3333°) = ${(100 - progressPercentage).toFixed(2)}%`
        ]
    };
}

/**
 * Calculates Traditional Paya (Foundational Metal)
 */
function calculatePaya(moonHouse, lagnaRashiName, moonRashiName) {
    let payaType = "";
    let symbol = "";
    let meaning = "";

    if ([1, 6, 11].includes(moonHouse)) {
        payaType = "Gold (Suvarna Paya)";
        symbol = "🥇 Gold Foot";
        meaning = "Brings high vitality, ambition, and spiritual potential. Traditional texts recommend humility and noble deeds to balance solar energy.";
    } else if ([2, 5, 9].includes(moonHouse)) {
        payaType = "Silver (Rajat Paya)";
        symbol = "🥈 Silver Foot";
        meaning = "Highly auspicious. Signifies emotional stability, financial comfort, domestic harmony, and steady luck throughout life.";
    } else if ([3, 7, 10].includes(moonHouse)) {
        payaType = "Copper (Tamra Paya)";
        symbol = "🥉 Copper Foot";
        meaning = "Auspicious and active. Symbolizes courage, commercial growth, supportive relationships, and endurance in career pursuits.";
    } else { // 4, 8, 12
        payaType = "Iron (Loha Paya)";
        symbol = "⚙️ Iron Foot";
        meaning = "Symbolizes hard work, endurance, and transformation through discipline. Teaches patience and grants ultimate resilience.";
    }

    return {
        name: payaType,
        symbol,
        traditionalMeaning: meaning,
        calculationBasis: `Moon residing in House ${moonHouse} relative to Lagna (Ascendant).`,
        calculationSteps: [
            `Lagna (Ascendant) Rashi: ${lagnaRashiName}`,
            `Moon Rashi (Janma Rashi): ${moonRashiName}`,
            `Moon House Position Relative to Lagna: House ${moonHouse}`,
            `Rule Classification: House 1,6,11 = Gold | House 2,5,9 = Silver | House 3,7,10 = Copper | House 4,8,12 = Iron`,
            `Evaluated Result: Moon in House ${moonHouse} -> ${payaType}`
        ]
    };
}

/**
 * Evaluates Planetary Dignity (Exalted, Debilitated, Own Sign, Friendly/Enemy/Neutral)
 */
function getPlanetaryDignity(planetKey, rashiId) {
    const dignityRules = {
        sun: { exalted: 1, debilitated: 7, own: [5] },
        moon: { exalted: 2, debilitated: 8, own: [4] },
        mars: { exalted: 10, debilitated: 4, own: [1, 8] },
        mercury: { exalted: 6, debilitated: 12, own: [3, 6] },
        jupiter: { exalted: 4, debilitated: 10, own: [9, 12] },
        venus: { exalted: 12, debilitated: 6, own: [2, 7] },
        saturn: { exalted: 7, debilitated: 1, own: [10, 11] },
        rahu: { exalted: 2, debilitated: 8, own: [11] },
        ketu: { exalted: 8, debilitated: 2, own: [8] }
    };

    const rule = dignityRules[planetKey];
    if (!rule) return "Neutral Sign";

    if (rashiId === rule.exalted) return "Exalted (Ucca) 🌟";
    if (rashiId === rule.debilitated) return "Debilitated (Nica) ⚠️";
    if (rule.own.includes(rashiId)) return "Own Sign (Svaksetra) 🏠";

    return "Neutral / Friendly Sign";
}

/**
 * Calculates Combustion status (Distance from Sun)
 */
function checkCombustion(planetKey, planetLong, sunLong) {
    if (planetKey === "sun" || planetKey === "rahu" || planetKey === "ketu") {
        return { isCombust: false, diff: 0 };
    }

    const thresholds = {
        moon: 12,
        mars: 17,
        mercury: 14,
        venus: 11,
        jupiter: 15,
        saturn: 15
    };

    let diff = Math.abs(planetLong - sunLong);
    if (diff > 180) diff = 360 - diff;

    const threshold = thresholds[planetKey] || 15;
    const isCombust = diff <= threshold;

    return { isCombust, diff: Number(diff.toFixed(2)), threshold };
}

/**
 * Calculates Retrograde status
 */
function checkRetrograde(planetKey, planetLong, sunLong) {
    if (planetKey === "sun" || planetKey === "moon") return false;
    if (planetKey === "rahu" || planetKey === "ketu") return true; // Rahu/Ketu always retrograde

    let diff = normalizeAngle(planetLong - sunLong);
    // Outer planets retrograde when approximately 120° to 240° away from Sun
    return (diff >= 120 && diff <= 240);
}

/**
 * Calculates Graha Drishti (Planetary Aspects)
 */
function calculatePlanetaryAspects(planetaryTable) {
    const aspectsList = [];

    planetaryTable.forEach(p => {
        const sourceHouse = p.house;

        // All planets cast 7th house aspect
        const aspect7 = ((sourceHouse + 6 - 1) % 12) + 1;
        const targetHouses = [aspect7];

        // Special Aspects
        if (p.key === "mars") {
            targetHouses.push(((sourceHouse + 3 - 1) % 12) + 1); // 4th aspect
            targetHouses.push(((sourceHouse + 7 - 1) % 12) + 1); // 8th aspect
        } else if (p.key === "jupiter") {
            targetHouses.push(((sourceHouse + 4 - 1) % 12) + 1); // 5th aspect
            targetHouses.push(((sourceHouse + 8 - 1) % 12) + 1); // 9th aspect
        } else if (p.key === "saturn") {
            targetHouses.push(((sourceHouse + 2 - 1) % 12) + 1); // 3rd aspect
            targetHouses.push(((sourceHouse + 9 - 1) % 12) + 1); // 10th aspect
        }

        aspectsList.push({
            planet: p.planet,
            symbol: p.symbol,
            sourceHouse,
            targetHouses: [...new Set(targetHouses)].sort((a, b) => a - b)
        });
    });

    return aspectsList;
}

/**
 * Maps all 9 planets to their Rashi, House, Degree, Dignity, Combustion & Retrograde status
 */
function getPlanetaryPositionsTable(positions, lagnaRashiId) {
    const planetKeys = ["sun", "moon", "mars", "mercury", "jupiter", "venus", "saturn", "rahu", "ketu"];
    const sunLong = positions.sun;
    
    return planetKeys.map(key => {
        const longitude = positions[key];
        const rashiInfo = getRashiFromLongitude(longitude);
        const house = ((rashiInfo.rashiId - lagnaRashiId + 12) % 12) + 1;
        const planetMeta = planetsData[key];

        const dignity = getPlanetaryDignity(key, rashiInfo.rashiId);
        const combustion = checkCombustion(key, longitude, sunLong);
        const isRetrograde = checkRetrograde(key, longitude, sunLong);

        return {
            key,
            planet: planetMeta.name,
            sanskrit: planetMeta.sanskrit,
            symbol: planetMeta.symbol,
            sign: rashiInfo.name,
            signSanskrit: rashiInfo.sanskrit,
            rashiId: rashiInfo.rashiId,
            degree: rashiInfo.degreeFormatted,
            degreeDecimal: rashiInfo.degree,
            house,
            nature: planetMeta.nature,
            dignity,
            isCombust: combustion.isCombust,
            combustDiff: combustion.diff,
            isRetrograde
        };
    });
}

module.exports = {
    ZODIAC_DEGREES,
    NAKSHATRA_COUNT,
    NAKSHATRA_SPAN,
    PADA_SPAN,
    getRashiFromLongitude,
    getNakshatraFromLongitude,
    calculatePaya,
    getPlanetaryDignity,
    checkCombustion,
    checkRetrograde,
    calculatePlanetaryAspects,
    getPlanetaryPositionsTable
};
