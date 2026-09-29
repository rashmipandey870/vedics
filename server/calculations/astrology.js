/**
 * Vedic Astrology Rule Engine
 * 
 * Maps longitudes to Rashi, Nakshatra, Pada, Paya, and Kundli House placement.
 */

const rashis = require('../../data/rashis');
const nakshatras = require('../../data/nakshatras');
const planetsData = require('../../data/planets');

/**
 * Calculates Rashi index (1-12) and Rashi degree (0-30) from longitude (0-360)
 * Input: longitude in degrees (0-360)
 * Output: { rashiId, name, sanskrit, degree }
 */
function getRashiFromLongitude(longitude) {
    const normLong = ((longitude % 360) + 360) % 360;
    const rashiId = Math.floor(normLong / 30) + 1;
    const degreeInRashi = normLong % 30;
    const rashiData = rashis[rashiId];

    return {
        rashiId,
        name: rashiData.name,
        sanskrit: rashiData.sanskrit,
        symbol: rashiData.symbol,
        ruler: rashiData.ruler,
        element: rashiData.element,
        nature: rashiData.nature,
        degree: Number(degreeInRashi.toFixed(2)),
        degreeFormatted: `${Math.floor(degreeInRashi)}° ${Math.floor((degreeInRashi % 1) * 60)}'`
    };
}

/**
 * Calculates Nakshatra details from Moon Longitude
 * Input: moonLongitude (0-360)
 * Output: { nakshatraId, name, sanskrit, lord, deity, pada, degreeFraction }
 */
function getNakshatraFromLongitude(moonLongitude) {
    const normLong = ((moonLongitude % 360) + 360) % 360;
    const span = 13.333333333333334; // 13°20'
    const nakshatraIndex = Math.floor(normLong / span);
    const nakshatraData = nakshatras[nakshatraIndex];

    const elapsedInNakshatra = normLong - (nakshatraIndex * span);
    const pada = Math.floor(elapsedInNakshatra / (span / 4)) + 1;
    const progressPercentage = Number(((elapsedInNakshatra / span) * 100).toFixed(2));

    return {
        nakshatraId: nakshatraData.id,
        name: nakshatraData.name,
        sanskrit: nakshatraData.sanskrit,
        lord: nakshatraData.lord,
        lordKey: nakshatraData.lordKey,
        deity: nakshatraData.deity,
        symbol: nakshatraData.symbol,
        element: nakshatraData.element,
        pada: Math.min(pada, 4),
        characteristics: nakshatraData.characteristics,
        elapsedDegrees: Number(elapsedInNakshatra.toFixed(2)),
        progressPercentage
    };
}

/**
 * Calculates Traditional Paya (Foundational Metal)
 * Rule based on Moon House relative to Lagna:
 * - 1st, 6th, 11th House -> Gold (Suvarna)
 * - 2nd, 5th, 9th House  -> Silver (Rajat)
 * - 3rd, 7th, 10th House -> Copper (Tamra)
 * - 4th, 8th, 12th House -> Iron (Loha)
 * 
 * Input: moonHouse (1-12)
 * Output: { name, symbol, traditionalMeaning, calculationBasis }
 */
function calculatePaya(moonHouse) {
    let payaType = "";
    let symbol = "";
    let meaning = "";

    if ([1, 6, 11].includes(moonHouse)) {
        payaType = "Gold (Suvarna Paya)";
        symbol = "🥇 Gold Foot";
        meaning = "Brings high vitality, ambition, and spiritual potential. Traditional texts recommend humility and noble deeds to balance fiery solar energy.";
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
        calculationBasis: `Calculated from Moon residing in House ${moonHouse} relative to Lagna.`
    };
}

/**
 * Maps all 9 planets to their Rashi, House, Degree, and Sign name
 * Input: planetaryPositions object, lagnaRashiId
 * Output: Array of planet position objects
 */
function getPlanetaryPositionsTable(positions, lagnaRashiId) {
    const planetKeys = ["sun", "moon", "mars", "mercury", "jupiter", "venus", "saturn", "rahu", "ketu"];
    
    return planetKeys.map(key => {
        const longitude = positions[key];
        const rashiInfo = getRashiFromLongitude(longitude);
        const house = ((rashiInfo.rashiId - lagnaRashiId + 12) % 12) + 1;
        const planetMeta = planetsData[key];

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
            nature: planetMeta.nature
        };
    });
}

module.exports = {
    getRashiFromLongitude,
    getNakshatraFromLongitude,
    calculatePaya,
    getPlanetaryPositionsTable
};
