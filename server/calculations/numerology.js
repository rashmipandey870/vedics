/**
 * JeevanShaili - Numerology Calculation Engine
 * 
 * Functions:
 * 1. Mulank (Birth Day Number)
 * 2. Bhagyank / Destiny Number (Total DOB Reduction)
 * 3. Name Number (Chaldean Vedic System & Pythagorean System)
 * 4. Symmetric Numerology Compatibility Explorer
 * 5. Master Number Handling Option
 * 6. Today's Universal Date Number
 * 
 * Author: Rashmi Pandey
 */

const numerologyData = require('../../data/numerology');

// Indian / Chaldean Planetary Number Mapping
const indianPlanetaryMap = {
    1: { planet: "Sun (Surya)", sanskrit: "सूर्य", symbol: "☀️" },
    2: { planet: "Moon (Chandra)", sanskrit: "चन्द्र", symbol: "🌕" },
    3: { planet: "Jupiter (Guru)", sanskrit: "गुरु", symbol: "♃" },
    4: { planet: "Rahu (North Node)", sanskrit: "राहु", symbol: "☊" },
    5: { planet: "Mercury (Budha)", sanskrit: "बुध", symbol: "☿" },
    6: { planet: "Venus (Shukra)", sanskrit: "शुक्र", symbol: "♀" },
    7: { planet: "Ketu (South Node)", sanskrit: "केतु", symbol: "☋" },
    8: { planet: "Saturn (Shani)", sanskrit: "शनि", symbol: "♄" },
    9: { planet: "Mars (Mangal)", sanskrit: "मंगल", symbol: "♂" }
};

/**
 * Reduces a number to a single digit (1-9) or detects master numbers (11, 22, 33)
 */
function reduceToSingleDigit(num, preserveMasterNumbers = false) {
    let current = Math.abs(num);
    const steps = [`Initial Value: ${current}`];

    while (current > 9) {
        if (preserveMasterNumbers && [11, 22, 33].includes(current)) {
            steps.push(`Detected Master Number: ${current}`);
            break;
        }

        const digits = String(current).split('').map(Number);
        const sum = digits.reduce((acc, d) => acc + d, 0);
        steps.push(`${digits.join(' + ')} = ${sum}`);
        current = sum;
    }

    return {
        result: current,
        steps
    };
}

/**
 * Calculates Mulank (Birth Day Number)
 */
function calculateMulank(day) {
    const dayNum = Number(day);
    const reduction = reduceToSingleDigit(dayNum);
    const mulank = reduction.result;
    const profile = numerologyData.numberProfiles[mulank];
    const graha = indianPlanetaryMap[mulank];

    const steps = [`Birth Day: ${dayNum}`];
    if (dayNum > 9) {
        const digits = String(dayNum).split('').join(' + ');
        steps.push(`Formula: ${digits} = ${mulank}`);
    } else {
        steps.push(`Day ${dayNum} is a single digit.`);
    }

    return {
        mulank,
        graha,
        steps,
        profile
    };
}

/**
 * Calculates Bhagyank / Destiny Number from Date of Birth (YYYY-MM-DD)
 */
function calculateBhagyank(dobString) {
    const cleanDigits = dobString.replace(/\D/g, '');
    const digitArray = cleanDigits.split('').map(Number);
    const initialSum = digitArray.reduce((a, b) => a + b, 0);

    const steps = [
        `Date of Birth String: ${dobString}`,
        `Sum of all digits: ${digitArray.join(' + ')} = ${initialSum}`
    ];

    let current = initialSum;
    while (current > 9) {
        const digits = String(current).split('').map(Number);
        const nextSum = digits.reduce((a, b) => a + b, 0);
        steps.push(`Reduce: ${digits.join(' + ')} = ${nextSum}`);
        current = nextSum;
    }

    const bhagyank = current;
    const profile = numerologyData.numberProfiles[bhagyank];
    const graha = indianPlanetaryMap[bhagyank];

    return {
        bhagyank,
        graha,
        steps,
        profile,
        methodologyNote: "In JeevanShaili, Bhagyank is calculated by reducing the complete date of birth according to the selected Indian numerology convention."
    };
}

/**
 * Calculates Name Number (Chaldean or Pythagorean system)
 */
function calculateNameNumber(fullName, system = 'chaldean') {
    const map = system === 'pythagorean' ? numerologyData.pythagoreanMap : numerologyData.chaldeanMap;
    const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, '');

    const letterBreakdown = [];
    let sum = 0;

    for (let char of cleanName) {
        const val = map[char] || 0;
        letterBreakdown.push({ char, val });
        sum += val;
    }

    const steps = [
        `Name: "${fullName.trim()}" (System: ${system.toUpperCase()})`,
        `Letter Mappings: ${letterBreakdown.map(l => `${l.char}=${l.val}`).join(', ')}`,
        `Total Sum: ${letterBreakdown.map(l => l.val).join(' + ')} = ${sum}`
    ];

    let current = sum;
    while (current > 9) {
        const digits = String(current).split('').map(Number);
        const nextSum = digits.reduce((a, b) => a + b, 0);
        steps.push(`Reduce: ${digits.join(' + ')} = ${nextSum}`);
        current = nextSum;
    }

    const nameNumber = current === 0 ? 1 : current;
    const profile = numerologyData.numberProfiles[nameNumber];
    const graha = indianPlanetaryMap[nameNumber];

    return {
        nameNumber,
        system,
        totalSum: sum,
        letterBreakdown,
        steps,
        profile,
        graha
    };
}

/**
 * Evaluates Symmetric Numerology Compatibility between two numbers (1-9)
 * Guarantees compatibility(A, B) === compatibility(B, A)
 */
function evaluateCompatibility(numA, numB) {
    const nA = Math.max(1, Math.min(9, Number(numA)));
    const nB = Math.max(1, Math.min(9, Number(numB)));

    const grahaA = indianPlanetaryMap[nA];
    const grahaB = indianPlanetaryMap[nB];

    const compatDataA = numerologyData.compatibility[nA];
    const compatDataB = numerologyData.compatibility[nB];

    const isBestA = compatDataA.best.includes(nB);
    const isBestB = compatDataB.best.includes(nA);
    const isChallA = compatDataA.challenging.includes(nB);
    const isChallB = compatDataB.challenging.includes(nA);

    let category = "Neutral / Balanced Partnership";
    let description = "";

    if (isBestA || isBestB) {
        category = "Harmonious Partnership";
        description = `Number ${nA} (${grahaA.planet}) and Number ${nB} (${grahaB.planet}) share natural planetary alignment and supportive energetic themes.`;
    } else if (isChallA || isChallB) {
        category = "Contrasting Partnership (Growth Opportunity)";
        description = `Number ${nA} (${grahaA.planet}) and Number ${nB} (${grahaB.planet}) possess contrasting core planetary energies, offering opportunities for personal growth through communication.`;
    } else {
        category = "Neutral / Balanced Partnership";
        description = `Number ${nA} (${grahaA.planet}) and Number ${nB} (${grahaB.planet}) maintain a balanced relationship in traditional numerological mapping.`;
    }

    const minNum = Math.min(nA, nB);
    const maxNum = Math.max(nA, nB);

    return {
        numA: nA,
        numB: nB,
        grahaA,
        grahaB,
        pairKey: `${minNum}-${maxNum}`,
        category,
        description,
        disclaimer: "This is a traditional educational numerological comparison, not a scientific compatibility measurement.",
        profileA: numerologyData.numberProfiles[nA],
        profileB: numerologyData.numberProfiles[nB]
    };
}

/**
 * Calculates Today's Universal Date Number
 */
function calculateTodayNumber(dateObj = new Date()) {
    const dateStr = dateObj.toISOString().split('T')[0];
    const res = calculateBhagyank(dateStr);
    return {
        todayNumber: res.bhagyank,
        dateString: dateStr,
        profile: res.profile,
        graha: res.graha
    };
}

module.exports = {
    indianPlanetaryMap,
    reduceToSingleDigit,
    calculateMulank,
    calculateBhagyank,
    calculateNameNumber,
    evaluateCompatibility,
    calculateTodayNumber
};
