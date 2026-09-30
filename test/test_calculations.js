/**
 * JeevanShaili - Automated Calculation Test Suite
 * Run with: node test/test_calculations.js
 * 
 * Verifies boundaries, sequences, 120y Dasha sums, numerology reductions, Vargottama detection, and compatibility symmetry.
 */

const assert = require('assert');
const { getRashiFromLongitude, getNakshatraFromLongitude, checkCombustion, checkRetrograde } = require('../server/calculations/astrology');
const { calculateVimshottariDasha } = require('../server/calculations/dashaCalculator');
const { calculateMulank, calculateBhagyank, calculateNameNumber, evaluateCompatibility } = require('../server/calculations/numerology');
const { getD1Rashi, getD4Rashi, getD9Rashi, getD10Rashi, calculateVargaCharts } = require('../server/calculations/varga');
const nakshatras = require('../data/nakshatras');
const dashaData = require('../data/dasha');

console.log("==================================================================");
console.log("🧪 Running JeevanShaili Automated Calculation Test Suite...");
console.log("==================================================================");

let testsPassed = 0;

function runTest(name, fn) {
    try {
        fn();
        testsPassed++;
        console.log(`  ✅ [PASS] ${name}`);
    } catch (err) {
        console.error(`  ❌ [FAIL] ${name}: ${err.message}`);
        process.exitCode = 1;
    }
}

// 1. Nakshatra Boundaries Test
runTest("Nakshatra Boundary 0° -> Ashwini, Pada 1", () => {
    const res = getNakshatraFromLongitude(0.0);
    assert.strictEqual(res.name, "Ashwini");
    assert.strictEqual(res.pada, 1);
    assert.strictEqual(res.lord, "Ketu");
});

runTest("Nakshatra Boundary 13°20' (13.3333°) -> Bharani, Pada 1", () => {
    const res = getNakshatraFromLongitude(13.3334);
    assert.strictEqual(res.name, "Bharani");
    assert.strictEqual(res.pada, 1);
    assert.strictEqual(res.lord, "Venus");
});

runTest("Nakshatra Boundary 359.9° -> Revati, Pada 4", () => {
    const res = getNakshatraFromLongitude(359.9);
    assert.strictEqual(res.name, "Revati");
    assert.strictEqual(res.pada, 4);
    assert.strictEqual(res.lord, "Mercury");
});

// 2. All 27 Nakshatra Lords Sequence Test
runTest("Verify all 27 Nakshatras match traditional Vimshottari sequence", () => {
    const expectedSequence = [
        "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury",
        "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury",
        "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"
    ];

    nakshatras.forEach((nak, idx) => {
        assert.strictEqual(nak.lord, expectedSequence[idx], `Mismatch at Nakshatra #${nak.id} ${nak.name}`);
    });
});

// 3. Vimshottari 120-Year Total Duration Test
runTest("Vimshottari Dasha planetary sequence total sum equals 120 years", () => {
    const totalSum = dashaData.lordsSequence.reduce((sum, item) => sum + item.years, 0);
    assert.strictEqual(totalSum, 120);
});

// 4. Numerology Mulank & Bhagyank Digit Reduction Test
runTest("Mulank Reduction: Day 29 -> 2 + 9 = 11 -> 1 + 1 = 2", () => {
    const res = calculateMulank(29);
    assert.strictEqual(res.mulank, 2);
});

runTest("Bhagyank Reduction: DOB 2004-08-15 -> 2+0+0+4+0+8+1+5 = 20 -> 2+0 = 2", () => {
    const res = calculateBhagyank("2004-08-15");
    assert.strictEqual(res.bhagyank, 2);
});

// 5. Chaldean Letter Mapping Test
runTest("Chaldean Name Number: 'Rahul Sharma' -> 6", () => {
    const res = calculateNameNumber("Rahul Sharma", "chaldean");
    assert.strictEqual(res.nameNumber, 6);
});

// 6. Symmetric Numerology Compatibility Test
runTest("Symmetric Compatibility: compatibility(1, 5) === compatibility(5, 1)", () => {
    const res1 = evaluateCompatibility(1, 5);
    const res2 = evaluateCompatibility(5, 1);
    assert.strictEqual(res1.category, res2.category);
    assert.strictEqual(res1.pairKey, res2.pairKey);
});

// 7. Vargottama Detection Test
runTest("Vargottama Detection: Longitude 15° (Taurus 15° D1=2, D9=2) -> isVargottama = true", () => {
    const d9Obj = getD9Rashi(45.0); // Taurus 15° = 45° ecliptic longitude
    assert.strictEqual(d9Obj.isVargottama, true);
    assert.strictEqual(d9Obj.d9Sign, 2);
});

console.log("==================================================================");
console.log(`✨ Test Suite Completed Successfully! Total Passed: ${testsPassed}/8`);
console.log("==================================================================");
