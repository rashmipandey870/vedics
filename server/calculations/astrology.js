/**
 * RashmiSutra - Vedic Astrology Rule Engine
 * 
 * Maps longitudes to Rashi, Nakshatra, Pada, Paya, and Kundli House placements.
 * Includes explicit calculation breakdown generators for presentation.
 * 
 * Author: Rashmi Pandey
 */

const rashis = require('../../data/rashis');
const nakshatras = require('../../data/nakshatras');
const planetsData = require('../../data/planets');

/**
 * Calculates Rashi index (1-12) and degree (0-30) from longitude (0-360)
 */
function getRashiFromLongitude(longitude) {
    const normLong = ((longitude % 360) + 360) % 360;
    let rashiId = Math.floor(normLong / 30) + 1;
    if (rashiId > 12) rashiId = 12; // boundary check for 360.0°

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
    const normLong = ((moonLongitude % 360) + 360) % 360;
    const nakSpan = 13.333333333333334; // 13°20' per Nakshatra (800 minutes of arc)
    const padaSpan = 3.3333333333333335; // 3°20' per Pada (200 minutes of arc)

    let nakIndex = Math.floor(normLong / nakSpan);
    if (nakIndex >= 27) nakIndex = 26; // boundary guard for 360.0°

    const nakData = nakshatras[nakIndex];

    const elapsedInNak = normLong - (nakIndex * nakSpan);
    let pada = Math.floor(elapsedInNak / padaSpan) + 1;
    if (pada > 4) pada = 4; // boundary guard

    const progressPercentage = Number(((elapsedInNak / nakSpan) * 100).toFixed(2));
    const remainingInNak = nakSpan - elapsedInNak;

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
 * Rule based on Moon House position relative to Lagna:
 * - House 1, 6, 11 -> Gold (Suvarna Paya)
 * - House 2, 5, 9  -> Silver (Rajat Paya)
 * - House 3, 7, 10 -> Copper (Tamra Paya)
 * - House 4, 8, 12 -> Iron (Loha Paya)
 */
function calculatePaya(moonHouse, lagnaRashiName, moonRashiName) {
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
 * Maps all 9 planets to their Rashi, House, Degree, Sign name, and Significations
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
