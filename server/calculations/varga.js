/**
 * JeevanShaili - Divisional Charts Engine (Varga Engine)
 * 
 * Calculates standard Parashari Divisional Charts:
 * - D1: Rashi Chart (Main birth chart)
 * - D4: Chaturthamsha Chart (Property, fixed assets, home/comfort themes)
 * - D9: Navamsha Chart (Spiritual strength, dharma, partnership themes + Vargottama detection)
 * - D10: Dashamsha Chart (Career, profession, public status themes)
 * 
 * Author: Rashmi Pandey
 */

const rashis = require('../../data/rashis');

/**
 * Normalizes any angle to [0, 360)
 */
function normalizeAngle(deg) {
    let res = deg % 360;
    return res < 0 ? res + 360 : res;
}

/**
 * Calculates D1 Rashi Sign for a longitude
 */
function getD1Rashi(longitude) {
    const norm = normalizeAngle(longitude);
    let rashiId = Math.floor(norm / 30) + 1;
    if (rashiId > 12) rashiId = 12;
    const degreeInRashi = norm % 30;
    return { rashiId, degreeInRashi };
}

/**
 * Calculates D4 Chaturthamsha Sign (7°30' per division)
 * Rule: Quarter 0 -> S, Quarter 1 -> S+3 (4th house), Quarter 2 -> S+6 (7th house), Quarter 3 -> S+9 (10th house)
 */
function getD4Rashi(longitude) {
    const d1 = getD1Rashi(longitude);
    const quarter = Math.min(3, Math.floor(d1.degreeInRashi / 7.5));
    const d4Sign = ((d1.rashiId + (quarter * 3) - 1) % 12) + 1;
    return d4Sign;
}

/**
 * Calculates D9 Navamsha Sign (3°20' per division)
 * Parashari Rule based on Sign Element:
 * - Fiery (1, 5, 9): Starts from Aries (1)
 * - Earthy (2, 6, 10): Starts from Capricorn (10)
 * - Airy (3, 7, 11): Starts from Libra (7)
 * - Watery (4, 8, 12): Starts from Cancer (4)
 */
function getD9Rashi(longitude) {
    const d1 = getD1Rashi(longitude);
    const navSpan = 3.3333333333333335; // 3°20'
    const division = Math.min(8, Math.floor(d1.degreeInRashi / navSpan));

    let startSign = 1; // Default Aries
    if ([1, 5, 9].includes(d1.rashiId)) {
        startSign = 1; // Aries
    } else if ([2, 6, 10].includes(d1.rashiId)) {
        startSign = 10; // Capricorn
    } else if ([3, 7, 11].includes(d1.rashiId)) {
        startSign = 7; // Libra
    } else if ([4, 8, 12].includes(d1.rashiId)) {
        startSign = 4; // Cancer
    }

    const d9Sign = ((startSign + division - 1) % 12) + 1;
    const isVargottama = (d1.rashiId === d9Sign);

    return { d9Sign, isVargottama };
}

/**
 * Calculates D10 Dashamsha Sign (3° per division)
 * Parashari Rule:
 * - Odd signs (1, 3, 5, 7, 9, 11): Starts from same sign S
 * - Even signs (2, 4, 6, 8, 10, 12): Starts from 9th house from S
 */
function getD10Rashi(longitude) {
    const d1 = getD1Rashi(longitude);
    const division = Math.min(9, Math.floor(d1.degreeInRashi / 3.0));

    let startSign = d1.rashiId;
    if (d1.rashiId % 2 === 0) {
        // Even Sign: Starts from 9th house from d1.rashiId
        startSign = ((d1.rashiId + 8 - 1) % 12) + 1;
    }

    const d10Sign = ((startSign + division - 1) % 12) + 1;
    return d10Sign;
}

/**
 * Generates full Varga Chart data structures (D1, D4, D9, D10)
 * 
 * Input: planetaryPositions object (longitudes), lagnaLongitude
 * Output: { D1, D4, D9, D10 } objects containing house maps & Vargottama list
 */
function calculateVargaCharts(positions, lagnaLongitude) {
    const planetKeys = ["sun", "moon", "mars", "mercury", "jupiter", "venus", "saturn", "rahu", "ketu"];

    // 1. Calculate Lagna signs for all 4 Varga charts
    const d1Lagna = getD1Rashi(lagnaLongitude).rashiId;
    const d4Lagna = getD4Rashi(lagnaLongitude);
    const d9LagnaObj = getD9Rashi(lagnaLongitude);
    const d9Lagna = d9LagnaObj.d9Sign;
    const d10Lagna = getD10Rashi(lagnaLongitude);

    // 2. Map Planets to Varga Signs
    const planetVargas = {};
    const vargottamaPlanets = [];

    if (d9LagnaObj.isVargottama) {
        vargottamaPlanets.push("Lagna (Ascendant)");
    }

    planetKeys.forEach(key => {
        const long = positions[key];
        const d1Obj = getD1Rashi(long);
        const d4Sign = getD4Rashi(long);
        const d9Obj = getD9Rashi(long);
        const d10Sign = getD10Rashi(long);

        if (d9Obj.isVargottama) {
            vargottamaPlanets.push(key.toUpperCase());
        }

        planetVargas[key] = {
            d1Sign: d1Obj.rashiId,
            d4Sign,
            d9Sign: d9Obj.d9Sign,
            d10Sign,
            isVargottama: d9Obj.isVargottama
        };
    });

    // Helper to build 12-house structure for a Varga chart
    const buildHouseGrid = (vargaLagnaSign, signExtractor, vargaCode, vargaTitle, description) => {
        const houses = Array.from({ length: 12 }, (_, i) => {
            const houseNum = i + 1;
            const rashiIdForHouse = ((vargaLagnaSign - 1 + i) % 12) + 1;
            const rashiData = rashis[rashiIdForHouse];

            const planetsInHouse = planetKeys.filter(k => {
                return signExtractor(planetVargas[k]) === rashiIdForHouse;
            }).map(k => ({
                key: k,
                name: k.charAt(0).toUpperCase() + k.slice(1),
                isVargottama: planetVargas[k].isVargottama
            }));

            return {
                house: houseNum,
                rashiId: rashiIdForHouse,
                rashiName: rashiData.name,
                rashiSanskrit: rashiData.sanskrit,
                rashiRuler: rashiData.ruler,
                planets: planetsInHouse
            };
        });

        return {
            vargaCode,
            title: vargaTitle,
            description,
            lagnaRashiId: vargaLagnaSign,
            lagnaRashiName: rashis[vargaLagnaSign].name,
            houses
        };
    };

    const D1 = buildHouseGrid(d1Lagna, p => p.d1Sign, "D1", "D1 — Rashi Chart", "Primary birth chart representing overall life structure, body, and major planetary placements.");
    const D4 = buildHouseGrid(d4Lagna, p => p.d4Sign, "D4", "D4 — Chaturthamsha Chart", "Divisional chart traditionally associated with property, fixed assets, home environment, and personal comforts.");
    const D9 = buildHouseGrid(d9Lagna, p => p.d9Sign, "D9", "D9 — Navamsha Chart", "Primary supporting divisional chart traditionally examined for inner planetary strength, marriage/partnership themes, and dharma.");
    const D10 = buildHouseGrid(d10Lagna, p => p.d10Sign, "D10", "D10 — Dashamsha Chart", "Divisional chart traditionally examined alongside D1 for career, profession, public status, and major achievements.");

    return {
        vargottamaPlanets,
        planetVargas,
        charts: { D1, D4, D9, D10 }
    };
}

module.exports = {
    getD1Rashi,
    getD4Rashi,
    getD9Rashi,
    getD10Rashi,
    calculateVargaCharts
};
