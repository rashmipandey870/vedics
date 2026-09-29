/**
 * Vimshottari Dasha Calculator Engine
 * 
 * Algorithm:
 * 1. Find Moon's Nakshatra and its ruling planet (Lord).
 * 2. Calculate the fraction of Nakshatra remaining at birth.
 * 3. Multiply remaining fraction by the Lord's standard Mahadasha duration to get balance at birth.
 * 4. Chain the 9 planetary Mahadashas in sequence for 120 total years.
 * 5. Calculate Antardashas (sub-periods) proportionately: SubPeriodYears = (MahadashaYears * SubPlanetYears) / 120.
 */

const dashaData = require('../../data/dasha');
const nakshatras = require('../../data/nakshatras');

/**
 * Calculates complete Vimshottari Dasha Timeline and current active Mahadasha/Antardasha
 * 
 * Input: moonLongitude (0-360), birthDateString (YYYY-MM-DD)
 * Output: Detailed Dasha Object with timeline, current Mahadasha, remaining balance, and Antardashas.
 */
function calculateVimshottariDasha(moonLongitude, birthDateString) {
    const normLong = ((moonLongitude % 360) + 360) % 360;
    const nakSpan = 13.333333333333334; // 13°20'
    const nakIndex = Math.floor(normLong / nakSpan);
    const nakData = nakshatras[nakIndex];

    const elapsedInNak = normLong - (nakIndex * nakSpan);
    const elapsedFraction = elapsedInNak / nakSpan;
    const remainingFraction = 1 - elapsedFraction;

    const sequence = dashaData.lordsSequence;
    const birthLordKey = nakData.lordKey;
    const birthLordIndex = sequence.findIndex(s => s.key === birthLordKey);

    const birthLordData = sequence[birthLordIndex];
    const totalMahadashaYears = birthLordData.years;
    const remainingBalanceYears = totalMahadashaYears * remainingFraction;

    const birthDate = new Date(birthDateString);

    // Build 120-Year Mahadasha Timeline
    const timeline = [];
    let currentStartDate = new Date(birthDate);

    // First Mahadasha (partial balance)
    let endDateFirst = new Date(currentStartDate);
    const balanceDays = Math.round(remainingBalanceYears * 365.25);
    endDateFirst.setDate(endDateFirst.getDate() + balanceDays);

    timeline.push({
        planetKey: birthLordData.key,
        planetName: birthLordData.name,
        sanskrit: birthLordData.sanskrit,
        totalYears: birthLordData.years,
        isBirthDasha: true,
        startDate: currentStartDate.toISOString().split('T')[0],
        endDate: endDateFirst.toISOString().split('T')[0],
        durationYears: Number(remainingBalanceYears.toFixed(2)),
        description: dashaData.descriptions[birthLordData.key]
    });

    currentStartDate = new Date(endDateFirst);

    // Remaining Mahadashas in sequence
    for (let i = 1; i < sequence.length; i++) {
        const idx = (birthLordIndex + i) % sequence.length;
        const lord = sequence[idx];
        const endDate = new Date(currentStartDate);
        const days = Math.round(lord.years * 365.25);
        endDate.setDate(endDate.getDate() + days);

        timeline.push({
            planetKey: lord.key,
            planetName: lord.name,
            sanskrit: lord.sanskrit,
            totalYears: lord.years,
            isBirthDasha: false,
            startDate: currentStartDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
            durationYears: lord.years,
            description: dashaData.descriptions[lord.key]
        });

        currentStartDate = new Date(endDate);
    }

    // Determine current active Mahadasha based on today's date
    const today = new Date();
    const activeMahadasha = timeline.find(d => {
        const s = new Date(d.startDate);
        const e = new Date(d.endDate);
        return today >= s && today <= e;
    }) || timeline[0];

    // Calculate Antardashas for active Mahadasha
    const activeLordIndex = sequence.findIndex(s => s.key === activeMahadasha.planetKey);
    const activeLordYears = sequence[activeLordIndex].years;
    const antardashas = [];

    let antardashaStart = new Date(activeMahadasha.startDate);

    for (let j = 0; j < sequence.length; j++) {
        const subIdx = (activeLordIndex + j) % sequence.length;
        const subLord = sequence[subIdx];

        // Antardasha duration in years = (MainLordYears * SubLordYears) / 120
        const subYears = (activeLordYears * subLord.years) / 120.0;
        const subDays = Math.round(subYears * 365.25);

        const antardashaEnd = new Date(antardashaStart);
        antardashaEnd.setDate(antardashaEnd.getDate() + subDays);

        const isActive = today >= antardashaStart && today <= antardashaEnd;

        antardashas.push({
            planetKey: subLord.key,
            planetName: subLord.name,
            sanskrit: subLord.sanskrit,
            startDate: antardashaStart.toISOString().split('T')[0],
            endDate: antardashaEnd.toISOString().split('T')[0],
            durationMonths: Number((subYears * 12).toFixed(1)),
            isActive
        });

        antardashaStart = new Date(antardashaEnd);
    }

    return {
        nakshatraName: nakData.name,
        nakshatraLord: nakData.lord,
        remainingBalanceYears: Number(remainingBalanceYears.toFixed(2)),
        activeMahadasha,
        timeline,
        antardashas
    };
}

module.exports = {
    calculateVimshottariDasha
};
