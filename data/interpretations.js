/**
 * Educational Content Data for Learn Page
 * Contains clear simple explanation, technical explanation, and examples for major Vedic concepts.
 */

const educationalTopics = [
    {
        id: "rashi",
        title: "Rashi (Zodiac Sign)",
        sanskrit: "राणि",
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
        technicalExplanation: "The 360° zodiac is divided into 27 equal parts of 13°20' (13 degrees 20 minutes = 800 minutes of arc) each. Each Nakshatra has a ruling planet, deity, and specific symbol.",
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
        id: "paya",
        title: "Paya (Foundation Metal)",
        sanskrit: "पाया",
        icon: "🏛️",
        simpleExplanation: "Paya describes the metaphorical 'metallic foundation' of your birth chart based on the relative position of the Moon from the Lagna (Ascendant).",
        technicalExplanation: "The 4 Payas are Gold (Suvarna), Silver (Rajat), Copper (Tamra), and Iron (Loha). Silver and Copper are considered highly favorable, Gold requires spiritual balance, and Iron symbolizes endurance.",
        example: "If the Moon resides in 2nd, 5th, or 9th house from Lagna, the birth Paya is Silver (Rajat), signifying comfort and prosperity."
    },
    {
        id: "lagna",
        title: "Lagna (Ascendant)",
        sanskrit: "लग्न",
        icon: "🌅",
        simpleExplanation: "Lagna is the zodiac sign rising on the eastern horizon at the exact time and place of your birth. It determines the 1st House of your Kundli.",
        technicalExplanation: "Because the Earth rotates once every 24 hours, the Lagna changes approximately every 2 hours. Lagna sets the structural grid of all 12 astrological houses (Bhavas).",
        example: "If Gemini was on the eastern horizon at 08:30 AM in New Delhi, your Lagna is Gemini (Mithuna)."
    },
    {
        id: "tithi",
        title: "Tithi (Lunar Day)",
        sanskrit: "तिथि",
        icon: "🌓",
        simpleExplanation: "A Tithi is a lunar day in the Vedic Panchang, representing the longitudinal angle between the Moon and the Sun.",
        technicalExplanation: "One Tithi completes whenever the Moon advances 12 degrees relative to the Sun. There are 30 Tithis in a lunar month (15 Shuklapaksha + 15 Krishnapaksha).",
        example: "Pratipada is the 1st Tithi after Amavasya (New Moon) or Purnima (Full Moon)."
    },
    {
        id: "yoga",
        title: "Yoga (Solilunar Combination)",
        sanskrit: "योग",
        icon: "☯️",
        simpleExplanation: "Yoga in Panchang measures the combined solar and lunar longitudinal motion, indicating underlying health and temperament.",
        technicalExplanation: "Calculated by adding the Sun's longitude and Moon's longitude. There are 27 Yogas, each spanning 13°20' (e.g., Vishkambha, Priti, Ayushman).",
        example: "Sun (40°) + Moon (100°) = 140° (falls under Sukarma Yoga)."
    },
    {
        id: "karana",
        title: "Karana (Half Lunar Day)",
        sanskrit: "करण",
        icon: "⚖️",
        simpleExplanation: "A Karana is half of a Tithi (6 degrees of lunar separation). It reflects active capability and execution style.",
        technicalExplanation: "There are 4 Tithis × 2 = 60 Karanas in a lunar month. They consist of 7 movable Karanas (Bava, Balava, Kaulava...) and 4 fixed Karanas.",
        example: "Bava Karana signifies active drive and independent initiative."
    },
    {
        id: "mahadasha",
        title: "Mahadasha (Major Planetary Period)",
        sanskrit: "महादशा",
        icon: "⏳",
        simpleExplanation: "Vimshottari Mahadasha is a 120-year cycle divided among 9 Grahas. It dictates which planet exerts primary influence during specific years of your life.",
        technicalExplanation: "The starting Mahadasha and its balance period are determined by the exact position of the Moon within its birth Nakshatra.",
        example: "If born in Ashwini (Ketu lord), your life begins with Ketu Mahadasha (up to 7 years)."
    },
    {
        id: "antardasha",
        title: "Antardasha (Sub-Planetary Period)",
        sanskrit: "अन्तर्दशा",
        icon: "⏱️",
        simpleExplanation: "Antardasha is a sub-period within a Mahadasha. It breaks down major planetary periods into shorter, focused phases.",
        technicalExplanation: "Calculated by multiplying the Mahadasha years of the main planet by the Mahadasha years of the sub-planet, divided by 120 (total cycle length).",
        example: "In a 20-year Venus Mahadasha, Venus-Sun Antardasha lasts (20 × 6) / 120 = 1 year."
    }
];

module.exports = educationalTopics;
