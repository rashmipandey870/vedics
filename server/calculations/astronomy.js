/**
 * Astronomy Engine - Vedic Sidereal Astronomy Calculations
 * 
 * Performs coordinate transformations and planetary position estimations.
 * Uses Nirayana system with Lahiri Ayanamsha.
 * 
 * Note for Viva:
 * - Tropical coordinates are measured from the Vernal Equinox.
 * - Sidereal coordinates (Nirayana) subtract Ayanamsha (precession of equinoxes ~24 degrees).
 * - Sidereal Longitude = Tropical Longitude - Lahiri Ayanamsha.
 */

// Approximate Lahiri Ayanamsha for year 2026 is ~24.23 degrees
// Formula for Lahiri Ayanamsha (in degrees): Ayanamsha = 23.85 + (Year - 1950) * 0.01361
function getLahiriAyanamsha(year) {
    return 23.85 + (year - 1950) * 0.01361;
}

/**
 * Calculates Julian Day Number from Gregorian Date and UTC Time
 * Input: year, month, day, decimal hours (UT)
 * Output: Julian Day Number (double)
 */
function getJulianDay(year, month, day, decimalHours) {
    if (month <= 2) {
        year -= 1;
        month += 12;
    }
    const A = Math.floor(year / 100);
    const B = 2 - A + Math.floor(A / 4);
    const JD = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + decimalHours / 24.0 + B - 1524.5;
    return JD;
}

/**
 * Calculates Greenwich Mean Sidereal Time (GMST) in degrees
 */
function getGMST(jd) {
    const D = jd - 2451545.0;
    let gmst = 280.46061837 + 360.98564736629 * D;
    gmst = gmst % 360;
    if (gmst < 0) gmst += 360;
    return gmst;
}

/**
 * Calculates Local Sidereal Time (LST) in degrees
 * Input: gmst (degrees), longitude (degrees east)
 */
function getLST(gmst, longitude) {
    let lst = (gmst + longitude) % 360;
    if (lst < 0) lst += 360;
    return lst;
}

/**
 * Calculates Ascendant (Lagna) Longitude (0-360 degrees)
 * Input: LST (degrees), latitude (degrees north), ecliptic obliquity (~23.44)
 * Output: Sidereal Ascendant Longitude (0-360 degrees)
 */
function calculateAscendantLongitude(lstDegrees, latitudeDegrees, ayanamsha) {
    const lstRad = (lstDegrees * Math.PI) / 180;
    const latRad = (latitudeDegrees * Math.PI) / 180;
    const epsRad = (23.439291 * Math.PI) / 180; // Obliquity of Ecliptic

    // Ascendant formula: tan(Asc) = cos(LST) / (-sin(eps) * tan(lat) - cos(eps) * sin(LST))
    const y = Math.cos(lstRad);
    const x = -Math.sin(epsRad) * Math.tan(latRad) - Math.cos(epsRad) * Math.sin(lstRad);

    let tropicalAsc = Math.atan2(y, x) * (180 / Math.PI);
    if (tropicalAsc < 0) tropicalAsc += 360;

    // Convert to Sidereal (Nirayana) by subtracting Ayanamsha
    let siderealAsc = (tropicalAsc - ayanamsha) % 360;
    if (siderealAsc < 0) siderealAsc += 360;

    return siderealAsc;
}

/**
 * Calculates Approximate Sidereal Planetary Longitudes
 * Based on orbital mean longitudes and Keplerian approximations.
 * 
 * Input: Date object, birthTime string (HH:MM), latitude, longitude
 * Output: Object containing longitudes for Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu, Lagna
 */
function calculatePlanetaryPositions(dobString, timeString, latitude = 28.6139, longitude = 77.2090) {
    const dob = new Date(dobString);
    const [hours, minutes] = timeString.split(':').map(Number);
    
    const year = dob.getFullYear();
    const month = dob.getMonth() + 1;
    const day = dob.getDate();

    // Timezone offset for India (+5.5) or standard UTC conversion
    const localDecimalHours = hours + minutes / 60.0;
    const utcDecimalHours = localDecimalHours - 5.5; // Indian Standard Time (IST) offset default

    const jd = getJulianDay(year, month, day, utcDecimalHours);
    const ayanamsha = getLahiriAyanamsha(year);
    const gmst = getGMST(jd);
    const lst = getLST(gmst, longitude);

    // Days since J2000 epoch (2000-01-01 12:00 UTC)
    const d = jd - 2451545.0;

    // Tropical Mean Longitudes (degrees)
    const sunMean = (280.466 + 0.9856474 * d) % 360;
    const moonMean = (218.316 + 13.176396 * d) % 360;
    const marsMean = (355.433 + 0.524033 * d) % 360;
    const mercuryMean = (sunMean + 15 * Math.sin((d * 0.04).toFixed(2))) % 360; // Mercury stays near Sun
    const jupiterMean = (34.351 + 0.083091 * d) % 360;
    const venusMean = (sunMean + 22 * Math.cos((d * 0.02).toFixed(2))) % 360; // Venus stays near Sun
    const saturnMean = (50.077 + 0.033459 * d) % 360;
    const rahuMean = (125.044 - 0.0529539 * d) % 360; // Rahu moves retrogradely

    // Convert to Sidereal (Nirayana)
    const normalize = (deg) => {
        let res = (deg - ayanamsha) % 360;
        return res < 0 ? res + 360 : res;
    };

    const sunLong = normalize(sunMean);
    const moonLong = normalize(moonMean);
    const marsLong = normalize(marsMean);
    const mercuryLong = normalize(mercuryMean);
    const jupiterLong = normalize(jupiterMean);
    const venusLong = normalize(venusMean);
    const saturnLong = normalize(saturnMean);
    const rahuLong = normalize(rahuMean);
    const ketuLong = (rahuLong + 180) % 360; // Ketu is exactly 180 degrees opposite Rahu

    // Lagna (Ascendant)
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
        ketu: Number(ketuLong.toFixed(2))
    };
}

module.exports = {
    getLahiriAyanamsha,
    calculatePlanetaryPositions
};
