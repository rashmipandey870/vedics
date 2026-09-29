/**
 * RashmiSutra - Vedic Yogas Calculation Engine
 * 
 * Evaluates classical Parashari Yogas (Planetary Combinations) and their life benefits:
 * - Gaja Kesari Yoga
 * - Budhaditya Yoga
 * - Chandra-Mangala Yoga
 * - Pancha Mahapurusha Yogas (Ruchaka, Bhadra, Hamsa, Malavya, Sasa)
 * - Kendra-Trikona Raja Yogas
 * - Dhana Yogas (Wealth Combinations)
 * - Vipareeta Raja Yogas
 * - Vargottama Planets Blessing
 * 
 * Author: Rashmi Pandey
 */

const rashis = require('../../data/rashis');

/**
 * Maps Rashi ID to its traditional ruling Graha key
 */
const RASHI_RULERS = {
    1: "mars",      // Aries
    2: "venus",     // Taurus
    3: "mercury",   // Gemini
    4: "moon",      // Cancer
    5: "sun",       // Leo
    6: "mercury",   // Virgo
    7: "venus",     // Libra
    8: "mars",      // Scorpio
    9: "jupiter",   // Sagittarius
    10: "saturn",   // Capricorn
    11: "saturn",   // Aquarius
    12: "jupiter"   // Pisces
};

/**
 * Calculates all active Yogas in a birth chart
 */
function calculateVedicYogas(planetaryTable, lagnaRashiId, vargottamaPlanets = []) {
    const yogas = [];
    
    // Quick lookup map for planet data by key
    const pMap = {};
    planetaryTable.forEach(p => {
        pMap[p.key] = p;
    });

    const sun = pMap.sun;
    const moon = pMap.moon;
    const mars = pMap.mars;
    const mercury = pMap.mercury;
    const jupiter = pMap.jupiter;
    const venus = pMap.venus;
    const saturn = pMap.saturn;
    const rahu = pMap.rahu;
    const ketu = pMap.ketu;

    // Helper: House relative to Lagna
    const getHouseRulerKey = (houseNum) => {
        const signId = ((lagnaRashiId - 1 + houseNum - 1) % 12) + 1;
        return RASHI_RULERS[signId];
    };

    // 1. Gaja Kesari Yoga (Jupiter in Kendra from Moon)
    if (jupiter && moon) {
        const moonHouse = moon.house;
        const jupHouse = jupiter.house;
        const diffHouse = ((jupHouse - moonHouse + 12) % 12) + 1;
        
        if ([1, 4, 7, 10].includes(diffHouse)) {
            yogas.push({
                title: "🐘 Gaja Kesari Yoga",
                category: "Auspicious & Royal Status",
                badgeClass: "badge-gold",
                formingPlanets: ["Jupiter (Guru)", "Moon (Chandra)"],
                description: `Jupiter is placed in House ${jupHouse} (${diffHouse === 1 ? "conjunct Moon" : diffHouse + "th house from Moon"}), occupying a Kendra from Moon.`,
                benefit: "Grants noble character, high reputation, lasting wealth, intellectual command, and victory over adversaries. Excellent for public stature and social respect.",
                calculationRule: "Jupiter residing in a Kendra (1st, 4th, 7th, or 10th house) from the Moon."
            });
        }
    }

    // 2. Budhaditya Yoga (Sun & Mercury Conjunction)
    if (sun && mercury && sun.rashiId === mercury.rashiId) {
        yogas.push({
            title: "☀️ Budhaditya Yoga",
            category: "Intellectual & Administrative",
            badgeClass: "badge-gold",
            formingPlanets: ["Sun (Surya)", "Mercury (Budha)"],
            description: `Sun and Mercury are conjunct in House ${sun.house} (${sun.sign}).`,
            benefit: "Bestows sharp analytical intellect, executive leadership, administrative competence, clear communication, and scholarly recognition.",
            calculationRule: "Sun and Mercury placed together in the exact same Rashi sign / House."
        });
    }

    // 3. Chandra-Mangala Yoga (Moon & Mars Conjunction)
    if (moon && mars && moon.rashiId === mars.rashiId) {
        yogas.push({
            title: "💰 Chandra-Mangala Yoga",
            category: "Dhana (Wealth & Commercial Acumen)",
            badgeClass: "badge-success",
            formingPlanets: ["Moon (Chandra)", "Mars (Mangal)"],
            description: `Moon and Mars reside together in House ${moon.house} (${moon.sign}).`,
            benefit: "Grants commercial capability, strong earning power, financial prosperity, independent business initiative, and high energy for financial growth.",
            calculationRule: "Moon and Mars placed together in the exact same Rashi sign / House."
        });
    }

    // 4. Pancha Mahapurusha Yogas (5 Great Personality Combinations)
    // 4a. Ruchaka Yoga (Mars)
    if (mars && [1, 4, 7, 10].includes(mars.house) && ([1, 8].includes(mars.rashiId) || mars.rashiId === 10)) {
        yogas.push({
            title: "⚔️ Ruchaka Yoga (Pancha Mahapurusha)",
            category: "Mahapurusha (Great Personality)",
            badgeClass: "badge-primary",
            formingPlanets: ["Mars (Mangal)"],
            description: `Mars is placed in House ${mars.house} (${mars.sign}), which is a Kendra house and its ${mars.rashiId === 10 ? "Exalted sign" : "Own sign"}.`,
            benefit: "Bestows extraordinary courage, physical strength, executive authority, leadership, and success in sports, engineering, or administration.",
            calculationRule: "Mars in own or exalted sign placed in a Kendra house (1st, 4th, 7th, or 10th)."
        });
    }

    // 4b. Bhadra Yoga (Mercury)
    if (mercury && [1, 4, 7, 10].includes(mercury.house) && [3, 6].includes(mercury.rashiId)) {
        yogas.push({
            title: "🧠 Bhadra Yoga (Pancha Mahapurusha)",
            category: "Mahapurusha (Great Personality)",
            badgeClass: "badge-primary",
            formingPlanets: ["Mercury (Budha)"],
            description: `Mercury is placed in House ${mercury.house} (${mercury.sign}), occupying a Kendra in its ${mercury.rashiId === 6 ? "Exalted/Own sign" : "Own sign"}.`,
            benefit: "Grants high intelligence, eloquence, mathematical and scientific genius, long life, business prosperity, and respected stature.",
            calculationRule: "Mercury in own or exalted sign placed in a Kendra house (1st, 4th, 7th, or 10th)."
        });
    }

    // 4c. Hamsa Yoga (Jupiter)
    if (jupiter && [1, 4, 7, 10].includes(jupiter.house) && ([9, 12].includes(jupiter.rashiId) || jupiter.rashiId === 4)) {
        yogas.push({
            title: "🕊️ Hamsa Yoga (Pancha Mahapurusha)",
            category: "Mahapurusha (Great Personality)",
            badgeClass: "badge-primary",
            formingPlanets: ["Jupiter (Guru)"],
            description: `Jupiter is placed in House ${jupiter.house} (${jupiter.sign}), occupying a Kendra in its ${jupiter.rashiId === 4 ? "Exalted sign" : "Own sign"}.`,
            benefit: "Bestows spiritual wisdom, righteous character, widespread honor, royal/governmental favor, and noble life purpose.",
            calculationRule: "Jupiter in own or exalted sign placed in a Kendra house (1st, 4th, 7th, or 10th)."
        });
    }

    // 4d. Malavya Yoga (Venus)
    if (venus && [1, 4, 7, 10].includes(venus.house) && ([2, 7].includes(venus.rashiId) || venus.rashiId === 12)) {
        yogas.push({
            title: "🎨 Malavya Yoga (Pancha Mahapurusha)",
            category: "Mahapurusha (Great Personality)",
            badgeClass: "badge-primary",
            formingPlanets: ["Venus (Shukra)"],
            description: `Venus is placed in House ${venus.house} (${venus.sign}), occupying a Kendra in its ${venus.rashiId === 12 ? "Exalted sign" : "Own sign"}.`,
            benefit: "Grants luxury, artistic excellence, refined cultural aesthetics, charisma, wealth, and peaceful domestic partnerships.",
            calculationRule: "Venus in own or exalted sign placed in a Kendra house (1st, 4th, 7th, or 10th)."
        });
    }

    // 4e. Sasa Yoga (Saturn)
    if (saturn && [1, 4, 7, 10].includes(saturn.house) && ([10, 11].includes(saturn.rashiId) || saturn.rashiId === 7)) {
        yogas.push({
            title: "👑 Sasa Yoga (Pancha Mahapurusha)",
            category: "Mahapurusha (Great Personality)",
            badgeClass: "badge-primary",
            formingPlanets: ["Saturn (Shani)"],
            description: `Saturn is placed in House ${saturn.house} (${saturn.sign}), occupying a Kendra in its ${saturn.rashiId === 7 ? "Exalted sign" : "Own sign"}.`,
            benefit: "Grants organizational power, deep discipline, political or public leadership, command over resources, and lasting endurance.",
            calculationRule: "Saturn in own or exalted sign placed in a Kendra house (1st, 4th, 7th, or 10th)."
        });
    }

    // 5. Kendra-Trikona Raja Yoga (Connection between Kendra & Trikona Lords)
    const kendraHouseLords = [getHouseRulerKey(1), getHouseRulerKey(4), getHouseRulerKey(7), getHouseRulerKey(10)];
    const trikonaHouseLords = [getHouseRulerKey(1), getHouseRulerKey(5), getHouseRulerKey(9)];
    const addedRajaPairs = new Set();

    for (let kPlanetKey of kendraHouseLords) {
        for (let tPlanetKey of trikonaHouseLords) {
            if (kPlanetKey !== tPlanetKey && pMap[kPlanetKey] && pMap[tPlanetKey]) {
                const kp = pMap[kPlanetKey];
                const tp = pMap[tPlanetKey];
                if (kp.house === tp.house) {
                    const pairKey = [kPlanetKey, tPlanetKey].sort().join('-');
                    if (!addedRajaPairs.has(pairKey)) {
                        addedRajaPairs.add(pairKey);
                        yogas.push({
                            title: "👑 Kendra-Trikona Raja Yoga",
                            category: "Raja Yoga (Status & Power)",
                            badgeClass: "badge-gold",
                            formingPlanets: [kp.planet, tp.planet],
                            description: `${kp.planet} (Kendra Lord) and ${tp.planet} (Trikona Lord) are conjunct in House ${kp.house} (${kp.sign}).`,
                            benefit: "One of the highest status-bestowing combinations in Vedic Astrology. Grants professional honors, authority, social elevation, and steady luck.",
                            calculationRule: "Conjunction of a Kendra lord (1st, 4th, 7th, 10th) and Trikona lord (1st, 5th, 9th) in the same house."
                        });
                    }
                }
            }
        }
    }

    // 6. Dhana Yoga (Wealth Lords Combination)
    const lord2Key = getHouseRulerKey(2);
    const lord11Key = getHouseRulerKey(11);
    const lord9Key = getHouseRulerKey(9);

    if (pMap[lord2Key] && pMap[lord11Key] && pMap[lord2Key].house === pMap[lord11Key].house && lord2Key !== lord11Key) {
        yogas.push({
            title: "💎 Dhana Yoga (2nd & 11th Lords Conjunction)",
            category: "Dhana (Wealth & Abundance)",
            badgeClass: "badge-success",
            formingPlanets: [pMap[lord2Key].planet, pMap[lord11Key].planet],
            description: `${pMap[lord2Key].planet} (2nd Lord of Wealth) and ${pMap[lord11Key].planet} (11th Lord of Gains) are conjunct in House ${pMap[lord2Key].house}.`,
            benefit: "Creates strong financial accumulation, steady income streams, commercial returns, and prosperous investments.",
            calculationRule: "Conjunction of 2nd House Lord (Wealth) and 11th House Lord (Gains) in the same house."
        });
    }

    // 7. Vipareeta Raja Yoga (6th, 8th, 12th lords in 6th, 8th, 12th houses)
    const lord6Key = getHouseRulerKey(6);
    const lord8Key = getHouseRulerKey(8);
    const lord12Key = getHouseRulerKey(12);

    const dusthanaLords = [
        { key: lord6Key, lordOf: 6, name: "Harsha Yoga" },
        { key: lord8Key, lordOf: 8, name: "Sarala Yoga" },
        { key: lord12Key, lordOf: 12, name: "Vimala Yoga" }
    ];

    dusthanaLords.forEach(d => {
        const pObj = pMap[d.key];
        if (pObj && [6, 8, 12].includes(pObj.house) && pObj.house !== d.lordOf) {
            yogas.push({
                title: `🛡️ Vipareeta Raja Yoga (${d.name})`,
                category: "Triumph Over Adversity",
                badgeClass: "badge-warning",
                formingPlanets: [pObj.planet],
                description: `${pObj.planet} (Lord of ${d.lordOf}th House) is placed in House ${pObj.house}, another Dusthana house.`,
                benefit: "Grants unexpected breakthroughs, immunity from major setbacks, ability to turn obstacles into victories, and sudden gains through challenging situations.",
                calculationRule: "Dusthana lord (6th, 8th, or 12th) residing in another Dusthana house."
            });
        }
    });

    // 8. Vargottama Planets Blessing
    if (vargottamaPlanets && vargottamaPlanets.length > 0) {
        yogas.push({
            title: "🌟 Vargottama Graha Blessing",
            category: "Inner Planetary Fortitude",
            badgeClass: "badge-gold",
            formingPlanets: vargottamaPlanets,
            description: `${vargottamaPlanets.join(', ')} occupy the exact same sign in D1 (Rashi) and D9 (Navamsha).`,
            benefit: "Grants unyielding core strength, laser focus, internal clarity, and immunity against planetary afflictions in that planet's domain.",
            calculationRule: "Same Rashi placement in D1 (Rashi Chart) and D9 (Navamsha Chart)."
        });
    }

    return yogas;
}

module.exports = {
    calculateVedicYogas
};
