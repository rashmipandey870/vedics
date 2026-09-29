/**
 * RashmiSutra - Astronomical Sidereal Calculation Engine
 * 
 * Performs astronomical coordinate transformations and planetary Sidereal positions.
 * Methodology: Nirayana System with Lahiri (Chitrapaksha) Ayanamsha.
 * 
 * Built by Rashmi Pandey.
 */

/**
 * Calculates Lahiri (Chitrapaksha) Ayanamsha for a given calendar year.
 * Standard Formula: Ayanamsha (degrees) = 23.85 + (Year - 1950) * 0.01361
 * Approximate value for 2026 is ~24.23 degrees.
 */
function getLahiriAyanamsha(year) {
    return 23.85 + (year - 1950) * 0.01361;
}

/**
 * Calculates Julian Day Number (JD) from Gregorian Date and UTC decimal hours
 * Input: year, month, day, decimalHours (UTC)
 * Output: Julian Day Number (double)
 */
function getJulianDay(year, month, day, decimalHours) {
    let y = year;
    let m = month;
    if (m <= 2) {
        y -= 1;
        m += 12;
    }
    const A = Math.floor(y / 100);
    const B = 2 - A + Math.floor(A / 4);
    const JD = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + (decimalHours / 24.0) + B - 1524.5;
    return JD;
}

/**
 * Calculates Greenwich Mean Sidereal Time (GMST) in degrees
 */
function getGMST(jd) {
    const D = jd - 2451545.0; // Days elapsed since J2000 epoch
    let gmst = (280.46061837 + 360.98564736629 * D) % 360;
    if (gmst < 0) gmst += 360;
    return gmst;
}

/**
 * Calculates Local Sidereal Time (LST) in degrees
 * Input: gmst (degrees), longitude (degrees East)
 */
function getLST(gmst, longitude) {
    let lst = (gmst + longitude) % 360;
    if (lst < 0) lst += 360;
    return lst;
}

/**
 * Calculates Ascendant (Lagna) Longitude (0-360 degrees)
 * Trigonometric Formula: tan(Asc) = cos(LST) / (-sin(eps) * tan(lat) - cos(eps) * sin(LST))
 */
function calculateAscendantLongitude(lstDegrees, latitudeDegrees, ayanamsha) {
    const lstRad = (lstDegrees * Math.PI) / 180;
    const latRad = (latitudeDegrees * Math.PI) / 180;
    const epsRad = (23.439291 * Math.PI) / 180; // Obliquity of Ecliptic (~23.44°)

    const y = Math.cos(lstRad);
    const x = -Math.sin(epsRad) * Math.tan(latRad) - Math.cos(epsRad) * Math.sin(lstRad);

    let tropicalAsc = Math.atan2(y, x) * (180 / Math.PI);
    if (tropicalAsc < 0) tropicalAsc += 360;

    // Nirayana Sidereal Conversion: Subtract Lahiri Ayanamsha
    let siderealAsc = (tropicalAsc - ayanamsha) % 360;
    if (siderealAsc < 0) siderealAsc += 360;

    return siderealAsc;
}

/**
 * Calculates Sidereal Planetary Longitudes (Nirayana System)
 * Input: dobString ("YYYY-MM-DD"), timeString ("HH:MM"), latitude, longitude
 * Output: Planetary longitudes object & calculation steps metadata
 */
function calculatePlanetaryPositions(dobString, timeString, latitude = 28.6139, longitude = 77.2090) {
    const dob = new Date(dobString);
    const [hours, minutes] = timeString.split(':').map(Number);
    
    const year = dob.getFullYear();
    const month = dob.getMonth() + 1;
    const day = dob.getDate();

    // Convert Indian Standard Time (IST UTC+5.5) to UTC
    const localDecimalHours = hours + (minutes / 60.0);
    const utcDecimalHours = localDecimalHours - 5.5;

    const jd = getJulianDay(year, month, day, utcDecimalHours);
    const ayanamsha = getLahiriAyanamsha(year);
    const gmst = getGMST(jd);
    const lst = getLST(gmst, longitude);

    const d = jd - 2451545.0; // J2000 epoch offset

    // Tropical Mean Orbital Longitudes (Degrees)
    const sunMean = (280.466 + 0.9856474 * d) % 360;
    const moonMean = (218.316 + 13.176396 * d) % 360;
    const marsMean = (355.433 + 0.524033 * d) % 360;
    const mercuryMean = (sunMean + 15 * Math.sin(Number((d * 0.04).toFixed(2)))) % 360;
    const jupiterMean = (34.351 + 0.083091 * d) % 360;
    const venusMean = (sunMean + 22 * Math.cos(Number((d * 0.02).toFixed(2)))) % 360;
    const saturnMean = (50.077 + 0.033459 * d) % 360;
    const rahuMean = (125.044 - 0.0529539 * d) % 360;

    // Sidereal Nirayana Conversion helper
    const toSidereal = (deg) => {
        let res = (deg - ayanamsha) % 360;
        return res < 0 ? res + 360 : res;
    };

    const sunLong = toSidereal(sunMean);
    const moonLong = toSidereal(moonMean);
    const marsLong = toSidereal(marsMean);
    const mercuryLong = toSidereal(mercuryMean);
    const jupiterLong = toSidereal(jupiterMean);
    const venusLong = toSidereal(venusMean);
    const saturnLong = toSidereal(saturnMean);
    const rahuLong = toSidereal(rahuMean);
    const ketuLong = (rahuLong + 180) % 360; // Ketu is 180° opposite Rahu

    const lagnaLong = calculateAscendantLongitude(lst, latitude, ayanamsha);

    return {
        ayanamsha: Number(ayanamsha.toFixed(2)),
        julianDay: Number(jd.toFixed(4)),
        lst: Number(lst.toFixed(2)),
        lagna: Number(lagnaLong.toFixed(2)),
        sun: Number(sunLong.toFixed(2)),
        moon: Number(moonLong.toFixed(2)),
        mars: Number(marsLong.toFixed(2)),
        mercury: Number(mercuryLong.toFixed(2)),
        jupiter: Number(jupiterLong.toFixed(2)),
        venus: Number(venusLong.toFixed(2)),
        saturn: Number(saturnLong.toFixed(2)),
        rahu: Number(rahuLong.toFixed(2)),
        ketu: Number(ketuLong.toFixed(2)),
        calculationSteps: [
            `Gregorian Date: ${dobString} ${timeString} IST (UTC Decimal Hours: ${utcDecimalHours.toFixed(2)}h)`,
            `Julian Day Number (JD): ${jd.toFixed(4)} days`,
            `Greenwich Mean Sidereal Time (GMST): ${gmst.toFixed(2)}°`,
            `Local Sidereal Time (LST): ${lst.toFixed(2)}° (Longitude: ${longitude}°E, Latitude: ${latitude}°N)`,
            `Lahiri Ayanamsha: 23.85° + (${year} - 1950) * 0.01361 = ${ayanamsha.toFixed(2)}°`,
            `Tropical Moon Longitude: ${((moonMean % 360 + 360) % 360).toFixed(2)}°`,
            `Sidereal (Nirayana) Moon Longitude = Tropical Moon - Lahiri Ayanamsha = ${moonLong.toFixed(2)}°`
        ]
    };
}

module.exports = {
    getLahiriAyanamsha,
    calculatePlanetaryPositions
};
