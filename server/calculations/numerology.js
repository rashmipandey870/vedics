/**
 * Numerology Calculation Engine
 * 
 * Functions:
 * 1. Mulank (Birth Day Number)
 * 2. Bhagyank (Life Path / Total DOB Number)
 * 3. Name Number (Chaldean & Pythagorean Letter Mapping)
 * 4. Step-by-Step Calculation Breakdown Generator
 * 5. Daily Profile / Today's Number
 * 6. Numerology Compatibility
 */

const numerologyData = require('../../data/numerology');

/**
 * Reduces a number to a single digit (1-9) by repeatedly summing its digits.
 * Input: num (integer)
 * Output: { singleDigit, steps: Array of strings }
 */
function reduceToSingleDigit(num) {
    let current = Math.abs(num);
    const steps = [`Initial Value: ${current}`];

    while (current > 9) {
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
 * Calculates Mulank (Birth Number) from the Day of Birth
 * Input: day (integer 1-31)
 * Output: { mulank, steps, profile }
 */
function calculateMulank(day) {
    const dayNum = Number(day);
    const reduction = reduceToSingleDigit(dayNum);
    const mulank = reduction.result;
    const profile = numerologyData.numberProfiles[mulank];

    const steps = [
        `Birth Day: ${dayNum}`
    ];
    if (dayNum > 9) {
        const digits = String(dayNum).split('').join(' + ');
        steps.push(`Formula: ${digits} = ${mulank}`);
    } else {
        steps.push(`Day ${dayNum} is already a single digit.`);
    }

    return {
        mulank,
        steps,
        profile
    };
}

/**
 * Calculates Bhagyank (Life Path Number) from Date of Birth (YYYY-MM-DD)
 * Input: dobString (e.g. "2004-08-15")
 * Output: { bhagyank, steps, profile }
 */
function calculateBhagyank(dobString) {
    const cleanDigits = dobString.replace(/\D/g, ''); // Extract all numbers
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

    return {
        bhagyank,
        steps,
        profile
    };
}

/**
 * Calculates Name Number based on Chaldean or Pythagorean mapping
 * Input: fullName (string), system ('chaldean' | 'pythagorean')
 * Output: { nameNumber, system, letterBreakdown, steps, profile }
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

    return {
        nameNumber,
        system,
        totalSum: sum,
        letterBreakdown,
        steps,
        profile
    };
}

/**
 * Calculates Today's Universal Date Number
 * Input: optional Date object (defaults to today)
 * Output: { todayNumber, dateString, profile }
 */
function calculateTodayNumber(dateObj = new Date()) {
    const dateStr = dateObj.toISOString().split('T')[0];
    const res = calculateBhagyank(dateStr);
    return {
        todayNumber: res.bhagyank,
        dateString: dateStr,
        profile: res.profile
    };
}

/**
 * Evaluates Numerology Compatibility between two numbers (1-9)
 * Input: numA (1-9), numB (1-9)
 * Output: { numA, numB, rating, description, category }
 */
function evaluateCompatibility(numA, numB) {
    const nA = Math.max(1, Math.min(9, Number(numA)));
    const nB = Math.max(1, Math.min(9, Number(numB)));

    const compatData = numerologyData.compatibility[nA];
    let category = "Moderate";
    let description = "";

    if (compatData.best.includes(nB)) {
        category = "High Compatibility (Harmonious)";
        description = `Number ${nA} and Number ${nB} share natural alignment, mutual understanding, and complementary strengths. Traditional numerology considers this partnership highly supportive.`;
    } else if (compatData.challenging.includes(nB)) {
        category = "Growth Opportunity (Challenging)";
        description = `Number ${nA} and Number ${nB} possess contrasting core energies. While it requires conscious communication, it provides strong potential for personal growth and balancing opposites.`;
    } else {
        category = "Balanced Partnership (Neutral)";
        description = `Number ${nA} and Number ${nB} maintain a balanced relationship. With clear shared goals, they work effectively together.`;
    }

    return {
        numA: nA,
        numB: nB,
        category,
        description,
        profileA: numerologyData.numberProfiles[nA],
        profileB: numerologyData.numberProfiles[nB]
    };
}

module.exports = {
    calculateMulank,
    calculateBhagyank,
    calculateNameNumber,
    calculateTodayNumber,
    evaluateCompatibility
};
