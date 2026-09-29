/**
 * Test script for verifying all 9 Graha Sidereal longitudes and Lagna
 */

const { calculatePlanetaryPositions } = require('../server/calculations/astronomy');
const { getRashiFromLongitude, getNakshatraFromLongitude } = require('../server/calculations/astrology');

console.log('==================================================================');
console.log('🪐 Testing Full Planetary Sidereal Ephemeris Accuracy');
console.log('==================================================================');

// Test Case 1: 2004-08-15 10:30 AM (Deoghar)
const p1 = calculatePlanetaryPositions('2004-08-15', '10:30', 24.4826, 86.6961);

console.log('\n📅 DOB: 2004-08-15 10:30 AM | Ayanamsha:', p1.ayanamsha + '°');
console.log('------------------------------------------------------------------');
const planets = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn', 'rahu', 'ketu'];

planets.forEach(key => {
    const long = p1[key];
    const rashi = getRashiFromLongitude(long);
    console.log(key.toUpperCase().padEnd(10) + ': ' + rashi.name.padEnd(12) + rashi.degreeFormatted.padEnd(10) + ' (Sidereal ' + long.toFixed(2) + '°)');
});

const lagnaRashi = getRashiFromLongitude(p1.lagna);
console.log('LAGNA     : ' + lagnaRashi.name.padEnd(12) + lagnaRashi.degreeFormatted.padEnd(10) + ' (Sidereal ' + p1.lagna.toFixed(2) + '°)');

const moonNak = getNakshatraFromLongitude(p1.moon);
console.log('\n🌙 Moon Nakshatra:', moonNak.name, '| Pada:', moonNak.pada, '| Lord:', moonNak.lord);
console.log('==================================================================');
