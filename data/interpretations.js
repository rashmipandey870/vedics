/**
 * Educational Content Data for Learn Page
 * Contains clear simple explanation, technical explanation, and examples for major Vedic concepts.
 * Author: Rashmi Pandey
 */

const educationalTopics = [
    {
        id: "rashi",
        title: "Rashi (Zodiac Sign)",
        sanskrit: "राशि",
        icon: "✨",
        simpleExplanation: "A Rashi is one of the 12 zodiac signs in Vedic astrology. It indicates the sector of the sky where the Moon or planets were situated at the exact moment of your birth.",
        technicalExplanation: "The 360-degree zodiac ecliptic belt is divided equally into 12 segments of 30 degrees each. The sign where your birth Moon is located is called your Janma Rashi (Moon Sign).",
        example: "If the Moon was located at 45° ecliptic longitude at birth, it falls in Taurus (Vrishabha Rashi), which spans 30° to 60°."
    },
    {
        id: "nakshatra",
        title: "Nakshatra (Lunar Mansion)",
        sanskrit: "नक्षत्र",
        icon: "🌙",
        simpleExplanation: "A Nakshatra is a stellar constellation or lunar mansion. While western astrology focuses mostly on 12 sun signs, Vedic astrology relies deeply on 27 Nakshatras to reveal subtle psychological and spiritual traits.",
        technicalExplanation: "The 360° zodiac is divided into 27 equal parts of 13°20' (13.3333°) each. Each Nakshatra has a ruling planet (Lord), deity, and specific symbol.",
        example: "The first 13°20' of Aries is Ashwini Nakshatra, ruled by Ketu and symbolized by a Horse's Head."
    },
    {
        id: "pada",
        title: "Pada (Quarter)",
        sanskrit: "पाद",
        icon: "🧩",
        simpleExplanation: "Each Nakshatra is subdivided into 4 equal quarters called Padas. Padas provide pinpoint accuracy for micro-level personality mapping.",
        technicalExplanation: "Since 1 Nakshatra = 13°20' (800'), 1 Pada = 3°20' (200'). Total 27 Nakshatras × 4 Padas = 108 Padas in the complete zodiac, matching the 108 Navamsha divisions.",
        example: "Ashwini Nakshatra Pada 1 spans 0°00' to 3°20' Aries and maps to Aries Navamsha."
    },
    {
        id: "d9_navamsha",
        title: "D9 Navamsha & Vargottama",
        sanskrit: "नवांश",
        icon: "📜",
        simpleExplanation: "D9 Navamsha is the most important supporting divisional chart in Vedic astrology, traditionally examined for inner planetary strength and dharma.",
        technicalExplanation: "Formed by dividing each 30° sign into 9 parts of 3°20' each. If a planet occupies the exact same sign in D1 (Rashi) and D9 (Navamsha), it achieves Vargottama status, signifying high resilience.",
        example: "If Mars is in Taurus in D1 and also in Taurus in D9, Mars is Vargottama."
    },
    {
        id: "d4_d10",
        title: "D4 Chaturthamsha & D10 Dashamsha",
        sanskrit: "चतुर्थांश / दशमांश",
        icon: "🏢",
        simpleExplanation: "D4 traditionally represents property, fixed assets, and home comforts, while D10 represents career, profession, and public status.",
        technicalExplanation: "D4 divides each sign into 4 parts of 7°30' each. D10 divides each sign into 10 parts of 3°00' each. They are interpreted alongside the D1 chart as supporting views.",
        example: "D10 Ascendant and 10th house placements indicate career inclination."
    },
    {
        id: "dignity",
        title: "Planetary Dignity (Exaltation & Debilitation)",
        sanskrit: "उच्च / नीच / स्वक्षेत्र",
        icon: "👑",
        simpleExplanation: "Grahas operate with varying dignity based on the sign they occupy — Exalted (highest strength), Own Sign (comfort), or Debilitated (lessons).",
        technicalExplanation: "Sun is exalted in Aries and debilitated in Libra. Moon is exalted in Taurus and debilitated in Scorpio. Jupiter is exalted in Cancer and debilitated in Capricorn.",
        example: "Jupiter in Cancer operates in Exalted (Ucca) dignity."
    },
    {
        id: "combustion_retrograde",
        title: "Combustion & Retrograde (Vakra)",
        sanskrit: "अस्त / वक्र",
        icon: "🔥",
        simpleExplanation: "Combustion occurs when a planet gets very close to the Sun. Retrograde occurs when a planet appears to move backwards against background stars.",
        technicalExplanation: "Mercury combusts within 14° of Sun. Outer planets (Mars, Jupiter, Saturn) retrograde when angular separation from Sun is 120° to 240°. Rahu/Ketu are always retrograde.",
        example: "Saturn positioned 180° opposite Sun is in Retrograde (Vakra) motion."
    },
    {
        id: "drishti",
        title: "Graha Drishti (Planetary Aspects)",
        sanskrit: "ग्रह दृष्टि",
        icon: "👁️",
        simpleExplanation: "All Grahas exert influence or 'aspect' on specific houses in the Kundli chart, extending their energy beyond their placed house.",
        technicalExplanation: "All planets cast a 7th house aspect (180°). Special aspects: Mars casts 4th and 8th aspects; Jupiter casts 5th and 9th aspects; Saturn casts 3rd and 10th aspects.",
        example: "Jupiter in 1st house aspects the 5th, 7th, and 9th houses."
    },
    {
        id: "bhavas",
        title: "12 Bhavas (Kundli Houses)",
        sanskrit: "द्वादश भाव",
        icon: "🏛️",
        simpleExplanation: "The 12 houses of a Kundli represent different areas of human life, starting from the 1st House (Lagna / Self) through to the 12th House (Moksha / Expenses).",
        technicalExplanation: "1st (Tanu), 2nd (Dhana), 3rd (Sahaja), 4th (Matru), 5th (Putra), 6th (Shatru), 7th (Kalatra), 8th (Randhra), 9th (Bhagya), 10th (Karma), 11th (Labha), 12th (Vyaya).",
        example: "10th House (Karma Bhava) governs profession, career honor, and public reputation."
    },
    {
        id: "paya",
        title: "Paya (Foundation Metal)",
        sanskrit: "पाया",
        icon: "🪙",
        simpleExplanation: "Paya describes the metaphorical 'metallic foundation' of your birth chart based on the relative position of the Moon from the Lagna (Ascendant).",
        technicalExplanation: "The 4 Payas are Gold (Suvarna), Silver (Rajat), Copper (Tamra), and Iron (Loha). Silver and Copper are favorable, Gold requires balance, and Iron symbolizes endurance.",
        example: "If the Moon resides in 2nd, 5th, or 9th house from Lagna, the birth Paya is Silver (Rajat)."
    },
    {
        id: "numerology_systems",
        title: "Chaldean vs Pythagorean Numerology",
        sanskrit: "अंक शास्त्र",
        icon: "🔢",
        simpleExplanation: "Chaldean numerology is the ancient system linked with Vedic planetary associations, while Pythagorean is the Western 1-9 sequential alphabet mapping.",
        technicalExplanation: "Chaldean maps A=1, B=2, C=3, D=4, E=5, F=8, G=3, H=5... Indian planetary mapping assigns 1=Sun, 2=Moon, 3=Jupiter, 4=Rahu, 5=Mercury, 6=Venus, 7=Ketu, 8=Saturn, 9=Mars.",
        example: "In Indian numerology, Number 4 is ruled by Rahu and Number 7 is ruled by Ketu."
    },
    {
        id: "mahadasha",
        title: "Vimshottari Mahadasha & Antardasha",
        sanskrit: "महादशा / अन्तर्दशा",
        icon: "⏳",
        simpleExplanation: "Vimshottari Dasha is a 120-year cycle divided among 9 Grahas. It dictates which planet exerts primary influence during specific years of your life.",
        technicalExplanation: "Starting Mahadasha balance is determined by Moon Nakshatra position %. Antardasha sub-period duration = (MahadashaYears × SubLordYears) ÷ 120.",
        example: "In a 20-year Venus Mahadasha, Venus-Sun Antardasha lasts (20 × 6) / 120 = 1 year (12 months)."
    }
];

module.exports = educationalTopics;
