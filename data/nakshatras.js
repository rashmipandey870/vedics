/**
 * Nakshatra Data Dictionary - 27 Lunar Mansions of Vedic Astrology
 * 
 * Each Nakshatra spans 13°20' (13.333 degrees) of the ecliptic.
 * Divided into 4 Padas of 3°20' (3.333 degrees) each.
 */

const nakshatras = [
    {
        id: 1,
        name: "Ashwini",
        sanskrit: "अश्विनी",
        lord: "Ketu",
        lordKey: "ketu",
        deity: "Ashwini Kumaras (Physicians of Gods)",
        symbol: "Horse's Head",
        element: "Earth",
        rashiStart: 1, // Aries
        degreeStart: 0.0,
        degreeEnd: 13.333,
        dashaYears: 7,
        characteristics: "Swift action, initiative, pioneering courage, healing inclination, energetic nature.",
        padaDetails: [
            { pada: 1, navamshaRashi: "Aries", range: "0°00' - 3°20'" },
            { pada: 2, navamshaRashi: "Taurus", range: "3°20' - 6°40'" },
            { pada: 3, navamshaRashi: "Gemini", range: "6°40' - 10°00'" },
            { pada: 4, navamshaRashi: "Cancer", range: "10°00' - 13°20'" }
        ]
    },
    {
        id: 2,
        name: "Bharani",
        sanskrit: "भरणी",
        lord: "Venus",
        lordKey: "venus",
        deity: "Yama (God of Death & Justice)",
        symbol: "Yoni / Womb",
        element: "Earth",
        rashiStart: 1,
        degreeStart: 13.333,
        degreeEnd: 26.666,
        dashaYears: 20,
        characteristics: "Determination, endurance, creative force, restraint, transformation, strong desires.",
        padaDetails: [
            { pada: 1, navamshaRashi: "Leo", range: "13°20' - 16°40'" },
            { pada: 2, navamshaRashi: "Virgo", range: "16°40' - 20°00'" },
            { pada: 3, navamshaRashi: "Libra", range: "20°00' - 23°20'" },
            { pada: 4, navamshaRashi: "Scorpio", range: "23°20' - 26°40'" }
        ]
    },
    {
        id: 3,
        name: "Krittika",
        sanskrit: "कृत्तिका",
        lord: "Sun",
        lordKey: "sun",
        deity: "Agni (God of Fire)",
        symbol: "Flame / Razor",
        element: "Fire",
        rashiStart: 1,
        degreeStart: 26.666,
        degreeEnd: 40.0,
        dashaYears: 6,
        characteristics: "Sharp intellect, purifying force, leadership, directness, courage, warm disposition.",
        padaDetails: [
            { pada: 1, navamshaRashi: "Sagittarius", range: "26°40' Aries - 0°00' Taurus" },
            { pada: 2, navamshaRashi: "Capricorn", range: "0°00' - 3°20' Taurus" },
            { pada: 3, navamshaRashi: "Aquarius", range: "3°20' - 6°40' Taurus" },
            { pada: 4, navamshaRashi: "Pisces", range: "6°40' - 10°00' Taurus" }
        ]
    },
    {
        id: 4,
        name: "Rohini",
        sanskrit: "रोहिणी",
        lord: "Moon",
        lordKey: "moon",
        deity: "Brahma (Creator)",
        symbol: "Chariot / Ox-cart",
        element: "Earth",
        rashiStart: 2, // Taurus
        degreeStart: 40.0,
        degreeEnd: 53.333,
        dashaYears: 10,
        characteristics: "Charm, artistic grace, fertility, magnetism, elegance, material prosperity.",
        padaDetails: [
            { pada: 1, navamshaRashi: "Aries", range: "10°00' - 13°20' Taurus" },
            { pada: 2, navamshaRashi: "Taurus", range: "13°20' - 16°40' Taurus" },
            { pada: 3, navamshaRashi: "Gemini", range: "16°40' - 20°00' Taurus" },
            { pada: 4, navamshaRashi: "Cancer", range: "20°00' - 23°20' Taurus" }
        ]
    },
    {
        id: 5,
        name: "Mrigashira",
        sanskrit: "मृगशिरा",
        lord: "Mars",
        lordKey: "mars",
        deity: "Soma (Moon God of Nectar)",
        symbol: "Deer's Head",
        element: "Earth",
        rashiStart: 2,
        degreeStart: 53.333,
        degreeEnd: 66.666,
        dashaYears: 7,
        characteristics: "Searching spirit, curiosity, gentle demeanor, quick mind, aesthetic sensibility.",
        padaDetails: [
            { pada: 1, navamshaRashi: "Leo", range: "23°20' - 26°40' Taurus" },
            { pada: 2, navamshaRashi: "Virgo", range: "26°40' Taurus - 0°00' Gemini" },
            { pada: 3, navamshaRashi: "Libra", range: "0°00' - 3°20' Gemini" },
            { pada: 4, navamshaRashi: "Scorpio", range: "3°20' - 6°40' Gemini" }
        ]
    },
    {
        id: 6,
        name: "Ardra",
        sanskrit: "आर्द्रा",
        lord: "Rahu",
        lordKey: "rahu",
        deity: "Rudra (Storm God)",
        symbol: "Teardrop",
        element: "Water",
        rashiStart: 3, // Gemini
        degreeStart: 66.666,
        degreeEnd: 80.0,
        dashaYears: 18,
        characteristics: "Intellectual brilliance, emotional cleansing, transformation through effort, research depth.",
        padaDetails: [
            { pada: 1, navamshaRashi: "Sagittarius", range: "6°40' - 10°00' Gemini" },
            { pada: 2, navamshaRashi: "Capricorn", range: "10°00' - 13°20' Gemini" },
            { pada: 3, navamshaRashi: "Aquarius", range: "13°20' - 16°40' Gemini" },
            { pada: 4, navamshaRashi: "Pisces", range: "16°40' - 20°00' Gemini" }
        ]
    },
    {
        id: 7,
        name: "Punarvasu",
        sanskrit: "पुनर्वसु",
        lord: "Jupiter",
        lordKey: "jupiter",
        deity: "Aditi (Mother of Gods)",
        symbol: "Quiver of Arrows",
        element: "Water",
        rashiStart: 3,
        degreeStart: 80.0,
        degreeEnd: 93.333,
        dashaYears: 16,
        characteristics: "Return of light, renewal, optimism, hospitality, wisdom, moral character.",
        padaDetails: [
            { pada: 1, navamshaRashi: "Aries", range: "20°00' - 23°20' Gemini" },
            { pada: 2, navamshaRashi: "Taurus", range: "23°20' - 26°40' Gemini" },
            { pada: 3, navamshaRashi: "Gemini", range: "26°40' Gemini - 0°00' Cancer" },
            { pada: 4, navamshaRashi: "Cancer", range: "0°00' - 3°20' Cancer" }
        ]
    },
    {
        id: 8,
        name: "Pushya",
        sanskrit: "पुष्य",
        lord: "Saturn",
        lordKey: "saturn",
        deity: "Brihaspati (Guru of Gods)",
        symbol: "Cow's Udder / Arrow",
        element: "Water",
        rashiStart: 4, // Cancer
        degreeStart: 93.333,
        degreeEnd: 106.666,
        dashaYears: 19,
        characteristics: "Nourishment, auspiciousness, spiritual commitment, patience, dependability.",
        padaDetails: [
            { pada: 1, navamshaRashi: "Leo", range: "3°20' - 6°40' Cancer" },
            { pada: 2, navamshaRashi: "Virgo", range: "6°40' - 10°00' Cancer" },
            { pada: 3, navamshaRashi: "Libra", range: "10°00' - 13°20' Cancer" },
            { pada: 4, navamshaRashi: "Scorpio", range: "13°20' - 16°40' Cancer" }
        ]
    },
    {
        id: 9,
        name: "Ashlesha",
        sanskrit: "अश्लेषा",
        lord: "Mercury",
        lordKey: "mercury",
        deity: "Nagas (Serpent Deities)",
        symbol: "Coiled Serpent",
        element: "Water",
        rashiStart: 4,
        degreeStart: 106.666,
        degreeEnd: 120.0,
        dashaYears: 17,
        characteristics: "Intuitive insight, mystical wisdom, strategic mind, protective instincts.",
        padaDetails: [
            { pada: 1, navamshaRashi: "Sagittarius", range: "16°40' - 20°00' Cancer" },
            { pada: 2, navamshaRashi: "Capricorn", range: "20°00' - 23°20' Cancer" },
            { pada: 3, navamshaRashi: "Aquarius", range: "23°20' - 26°40' Cancer" },
            { pada: 4, navamshaRashi: "Pisces", range: "26°40' - 30°00' Cancer" }
        ]
    },
    {
        id: 10,
        name: "Magha",
        sanskrit: "मघा",
        lord: "Ketu",
        lordKey: "ketu",
        deity: "Pitris (Ancestors)",
        symbol: "Royal Throne",
        element: "Fire",
        rashiStart: 5, // Leo
        degreeStart: 120.0,
        degreeEnd: 133.333,
        dashaYears: 7,
        characteristics: "Royal stature, ancestral lineage connection, leadership, pride, noble ambition.",
        padaDetails: [
            { pada: 1, navamshaRashi: "Aries", range: "0°00' - 3°20' Leo" },
            { pada: 2, navamshaRashi: "Taurus", range: "3°20' - 6°40' Leo" },
            { pada: 3, navamshaRashi: "Gemini", range: "6°40' - 10°00' Leo" },
            { pada: 4, navamshaRashi: "Cancer", range: "10°00' - 13°20' Leo" }
        ]
    },
    {
        id: 11,
        name: "Purva Phalguni",
        sanskrit: "पूर्वा फाल्गुनी",
        lord: "Venus",
        lordKey: "venus",
        deity: "Bhaga (God of Fortune)",
        symbol: "Front Legs of Couch",
        element: "Fire",
        rashiStart: 5,
        degreeStart: 133.333,
        degreeEnd: 146.666,
        dashaYears: 20,
        characteristics: "Creativity, love of fine arts, relaxation, joy, social warmth.",
        padaDetails: [
            { pada: 1, navamshaRashi: "Leo", range: "13°20' - 16°40' Leo" },
            { pada: 2, navamshaRashi: "Virgo", range: "16°40' - 20°00' Leo" },
            { pada: 3, navamshaRashi: "Libra", range: "20°00' - 23°20' Leo" },
            { pada: 4, navamshaRashi: "Scorpio", range: "23°20' - 26°40' Leo" }
        ]
    },
    {
        id: 12,
        name: "Uttara Phalguni",
        sanskrit: "उत्तरा फाल्गुनी",
        lord: "Sun",
        lordKey: "sun",
        deity: "Aryaman (God of Patronage & Contracts)",
        symbol: "Back Legs of Couch",
        element: "Fire",
        rashiStart: 5,
        degreeStart: 146.666,
        degreeEnd: 160.0,
        dashaYears: 6,
        characteristics: "Reliability, friendship, honor, generous support, organizational strength.",
        padaDetails: [
            { pada: 1, navamshaRashi: "Sagittarius", range: "26°40' Leo - 0°00' Virgo" },
            { pada: 2, navamshaRashi: "Capricorn", range: "0°00' - 3°20' Virgo" },
            { pada: 3, navamshaRashi: "Aquarius", range: "3°20' - 6°40' Virgo" },
            { pada: 4, navamshaRashi: "Pisces", range: "6°40' - 10°00' Virgo" }
        ]
    },
    {
        id: 13,
        name: "Hasta",
        sanskrit: "हस्त",
        lord: "Moon",
        lordKey: "moon",
        deity: "Savitar (Sun God of Dawn)",
        symbol: "Open Hand / Fist",
        element: "Fire",
        rashiStart: 6, // Virgo
        degreeStart: 160.0,
        degreeEnd: 173.333,
        dashaYears: 10,
        characteristics: "Manual dexterity, intelligence, humor, craftsmanship, healing hands.",
        padaDetails: [
            { pada: 1, navamshaRashi: "Aries", range: "10°00' - 13°20' Virgo" },
            { pada: 2, navamshaRashi: "Taurus", range: "13°20' - 16°40' Virgo" },
            { pada: 3, navamshaRashi: "Gemini", range: "16°40' - 20°00' Virgo" },
            { pada: 4, navamshaRashi: "Cancer", range: "20°00' - 23°20' Virgo" }
        ]
    },
    {
        id: 14,
        name: "Chitra",
        sanskrit: "चित्रा",
        lord: "Mars",
        lordKey: "mars",
        deity: "Vishwakarma (Celestial Architect)",
        symbol: "Bright Jewel",
        element: "Fire",
        rashiStart: 6,
        degreeStart: 173.333,
        degreeEnd: 186.666,
        dashaYears: 7,
        characteristics: "Design genius, elegance, aesthetic mastery, passion, structural brilliance.",
        padaDetails: [
            { pada: 1, navamshaRashi: "Leo", range: "23°20' - 26°40' Virgo" },
            { pada: 2, navamshaRashi: "Virgo", range: "26°40' Virgo - 0°00' Libra" },
            { pada: 3, navamshaRashi: "Libra", range: "0°00' - 3°20' Libra" },
            { pada: 4, navamshaRashi: "Scorpio", range: "3°20' - 6°40' Libra" }
        ]
    },
    {
        id: 15,
        name: "Swati",
        sanskrit: "स्वाति",
        lord: "Rahu",
        lordKey: "rahu",
        deity: "Vayu (God of Wind)",
        symbol: "Sword / Coral / Shoot of Plant",
        element: "Air",
        rashiStart: 7, // Libra
        degreeStart: 186.666,
        degreeEnd: 200.0,
        dashaYears: 18,
        characteristics: "Independence, flexibility, diplomatic communication, business acumen.",
        padaDetails: [
            { pada: 1, navamshaRashi: "Sagittarius", range: "6°40' - 10°00' Libra" },
            { pada: 2, navamshaRashi: "Capricorn", range: "10°00' - 13°20' Libra" },
            { pada: 3, navamshaRashi: "Aquarius", range: "13°20' - 16°40' Libra" },
            { pada: 4, navamshaRashi: "Pisces", range: "16°40' - 20°00' Libra" }
        ]
    },
    {
        id: 16,
        name: "Vishakha",
        sanskrit: "विशाखा",
        lord: "Jupiter",
        lordKey: "jupiter",
        deity: "Indra & Agni (Kings of Gods & Fire)",
        symbol: "Triumphal Arch",
        element: "Air",
        rashiStart: 7,
        degreeStart: 200.0,
        degreeEnd: 213.333,
        dashaYears: 16,
        characteristics: "Single-pointed focus, ambition, goal orientation, energy, victory after effort.",
        padaDetails: [
            { pada: 1, navamshaRashi: "Aries", range: "20°00' - 23°20' Libra" },
            { pada: 2, navamshaRashi: "Taurus", range: "23°20' - 26°40' Libra" },
            { pada: 3, navamshaRashi: "Gemini", range: "26°40' Libra - 0°00' Scorpio" },
            { pada: 4, navamshaRashi: "Cancer", range: "0°00' - 3°20' Scorpio" }
        ]
    },
    {
        id: 17,
        name: "Anuradha",
        sanskrit: "अनुराधा",
        lord: "Saturn",
        lordKey: "saturn",
        deity: "Mitra (God of Friendship)",
        symbol: "Lotus Flower",
        element: "Air",
        rashiStart: 8, // Scorpio
        degreeStart: 213.333,
        degreeEnd: 226.666,
        dashaYears: 19,
        characteristics: "Devotion, loyalty in relationships, organizational prowess, spiritual resilience.",
        padaDetails: [
            { pada: 1, navamshaRashi: "Leo", range: "3°20' - 6°40' Scorpio" },
            { pada: 2, navamshaRashi: "Virgo", range: "6°40' - 10°00' Scorpio" },
            { pada: 3, navamshaRashi: "Libra", range: "10°00' - 13°20' Scorpio" },
            { pada: 4, navamshaRashi: "Scorpio", range: "13°20' - 16°40' Scorpio" }
        ]
    },
    {
        id: 18,
        name: "Jyeshtha",
        sanskrit: "ज्येष्ठा",
        lord: "Mercury",
        lordKey: "mercury",
        deity: "Indra (King of Devas)",
        symbol: "Circular Amulet / Umbrella",
        element: "Air",
        rashiStart: 8,
        degreeStart: 226.666,
        degreeEnd: 240.0,
        dashaYears: 17,
        characteristics: "Seniority, courage, protective authority, occult depth, mental sharpness.",
        padaDetails: [
            { pada: 1, navamshaRashi: "Sagittarius", range: "16°40' - 20°00' Scorpio" },
            { pada: 2, navamshaRashi: "Capricorn", range: "20°00' - 23°20' Scorpio" },
            { pada: 3, navamshaRashi: "Aquarius", range: "23°20' - 26°40' Scorpio" },
            { pada: 4, navamshaRashi: "Pisces", range: "26°40' - 30°00' Scorpio" }
        ]
    },
    {
        id: 19,
        name: "Mula",
        sanskrit: "मूल",
        lord: "Ketu",
        lordKey: "ketu",
        deity: "Nirriti (Goddess of Dissolution)",
        symbol: "Tied Roots",
        element: "Air",
        rashiStart: 9, // Sagittarius
        degreeStart: 240.0,
        degreeEnd: 253.333,
        dashaYears: 7,
        characteristics: "Getting to the root cause, investigation, spiritual transformation, direct truth.",
        padaDetails: [
            { pada: 1, navamshaRashi: "Aries", range: "0°00' - 3°20' Sagittarius" },
            { pada: 2, navamshaRashi: "Taurus", range: "3°20' - 6°40' Sagittarius" },
            { pada: 3, navamshaRashi: "Gemini", range: "6°40' - 10°00' Sagittarius" },
            { pada: 4, navamshaRashi: "Cancer", range: "10°00' - 13°20' Sagittarius" }
        ]
    },
    {
        id: 20,
        name: "Purva Ashadha",
        sanskrit: "पूर्वाषाढा",
        lord: "Venus",
        lordKey: "venus",
        deity: "Apas (Water Deities)",
        symbol: "Winnowing Basket",
        element: "Air",
        rashiStart: 9,
        degreeStart: 253.333,
        degreeEnd: 266.666,
        dashaYears: 20,
        characteristics: "Invincibility, purity of purpose, philosophical debate, fluid adaptation.",
        padaDetails: [
            { pada: 1, navamshaRashi: "Leo", range: "13°20' - 16°40' Sagittarius" },
            { pada: 2, navamshaRashi: "Virgo", range: "16°40' - 20°00' Sagittarius" },
            { pada: 3, navamshaRashi: "Libra", range: "20°00' - 23°20' Sagittarius" },
            { pada: 4, navamshaRashi: "Scorpio", range: "23°20' - 26°40' Sagittarius" }
        ]
    },
    {
        id: 21,
        name: "Uttara Ashadha",
        sanskrit: "उत्तराषाढा",
        lord: "Sun",
        lordKey: "sun",
        deity: "Vishvedevas (Universal Gods)",
        symbol: "Elephant Tusk",
        element: "Air",
        rashiStart: 9,
        degreeStart: 266.666,
        degreeEnd: 280.0,
        dashaYears: 6,
        characteristics: "Enduring victory, righteousness, universal ethics, humble leadership.",
        padaDetails: [
            { pada: 1, navamshaRashi: "Sagittarius", range: "26°40' Sag - 0°00' Capricorn" },
            { pada: 2, navamshaRashi: "Capricorn", range: "0°00' - 3°20' Capricorn" },
            { pada: 3, navamshaRashi: "Aquarius", range: "3°20' - 6°40' Capricorn" },
            { pada: 4, navamshaRashi: "Pisces", range: "6°40' - 10°00' Capricorn" }
        ]
    },
    {
        id: 22,
        name: "Shravana",
        sanskrit: "श्रवण",
        lord: "Moon",
        lordKey: "moon",
        deity: "Vishnu (Preserver of Universe)",
        symbol: "Ear / Three Footprints",
        element: "Ether",
        rashiStart: 10, // Capricorn
        degreeStart: 280.0,
        degreeEnd: 293.333,
        dashaYears: 10,
        characteristics: "Deep listening, scholarship, wisdom retention, sacred oral traditions.",
        padaDetails: [
            { pada: 1, navamshaRashi: "Aries", range: "10°00' - 13°20' Capricorn" },
            { pada: 2, navamshaRashi: "Taurus", range: "13°20' - 16°40' Capricorn" },
            { pada: 3, navamshaRashi: "Gemini", range: "16°40' - 20°00' Capricorn" },
            { pada: 4, navamshaRashi: "Cancer", range: "20°00' - 23°20' Capricorn" }
        ]
    },
    {
        id: 23,
        name: "Dhanishta",
        sanskrit: "धनिष्ठा",
        lord: "Mars",
        lordKey: "mars",
        deity: "Eight Vasus (Deities of Abundance)",
        symbol: "Drum (Damaru) / Flute",
        element: "Ether",
        rashiStart: 10,
        degreeStart: 293.333,
        degreeEnd: 306.666,
        dashaYears: 7,
        characteristics: "Rhythmic harmony, musical/artistic talent, wealth creation, group popularity.",
        padaDetails: [
            { pada: 1, navamshaRashi: "Leo", range: "23°20' - 26°40' Capricorn" },
            { pada: 2, navamshaRashi: "Virgo", range: "26°40' Cap - 0°00' Aquarius" },
            { pada: 3, navamshaRashi: "Libra", range: "0°00' - 3°20' Aquarius" },
            { pada: 4, navamshaRashi: "Scorpio", range: "3°20' - 6°40' Aquarius" }
        ]
    },
    {
        id: 24,
        name: "Shatabhisha",
        sanskrit: "शतभिषा",
        lord: "Rahu",
        lordKey: "rahu",
        deity: "Varuna (God of Cosmic Waters & Truth)",
        symbol: "Empty Circle / 100 Physicians",
        element: "Ether",
        rashiStart: 11, // Aquarius
        degreeStart: 306.666,
        degreeEnd: 320.0,
        dashaYears: 18,
        characteristics: "Healing capabilities, mystery, visionary thinking, scientific insight, solitude.",
        padaDetails: [
            { pada: 1, navamshaRashi: "Sagittarius", range: "6°40' - 10°00' Aquarius" },
            { pada: 2, navamshaRashi: "Capricorn", range: "10°00' - 13°20' Aquarius" },
            { pada: 3, navamshaRashi: "Aquarius", range: "13°20' - 16°40' Aquarius" },
            { pada: 4, navamshaRashi: "Pisces", range: "16°40' - 20°00' Aquarius" }
        ]
    },
    {
        id: 25,
        name: "Purva Bhadrapada",
        sanskrit: "पूर्व भाद्रपदा",
        lord: "Jupiter",
        lordKey: "jupiter",
        deity: "Aja Ekapada (One-Footed Unborn Serpent)",
        symbol: "Front Legs of Funeral Cot / Two-Faced Man",
        element: "Ether",
        rashiStart: 11,
        degreeStart: 320.0,
        degreeEnd: 333.333,
        dashaYears: 16,
        characteristics: "Spiritual intensity, passion, transformative idealism, philosophical conviction.",
        padaDetails: [
            { pada: 1, navamshaRashi: "Aries", range: "20°00' - 23°20' Aquarius" },
            { pada: 2, navamshaRashi: "Taurus", range: "23°20' - 26°40' Aquarius" },
            { pada: 3, navamshaRashi: "Gemini", range: "26°40' Aqu - 0°00' Pisces" },
            { pada: 4, navamshaRashi: "Cancer", range: "0°00' - 3°20' Pisces" }
        ]
    },
    {
        id: 26,
        name: "Uttara Bhadrapada",
        sanskrit: "उत्तर भाद्रपदा",
        lord: "Saturn",
        lordKey: "saturn",
        deity: "Ahirbudhnya (Serpent of the Deep)",
        symbol: "Back Legs of Funeral Cot",
        element: "Ether",
        rashiStart: 12, // Pisces
        degreeStart: 333.333,
        degreeEnd: 346.666,
        dashaYears: 19,
        characteristics: "Profound wisdom, serenity, restraint, meditative depth, protective compassion.",
        padaDetails: [
            { pada: 1, navamshaRashi: "Leo", range: "3°20' - 6°40' Pisces" },
            { pada: 2, navamshaRashi: "Virgo", range: "6°40' - 10°00' Pisces" },
            { pada: 3, navamshaRashi: "Libra", range: "10°00' - 13°20' Pisces" },
            { pada: 4, navamshaRashi: "Scorpio", range: "13°20' - 16°40' Pisces" }
        ]
    },
    {
        id: 27,
        name: "Revati",
        sanskrit: "रेवती",
        lord: "Mercury",
        lordKey: "mercury",
        deity: "Pushan (Nourisher of Travelers & Animals)",
        symbol: "Fish / Drum",
        element: "Ether",
        rashiStart: 12,
        degreeStart: 346.666,
        degreeEnd: 360.0,
        dashaYears: 17,
        characteristics: "Nourishing kindness, completed journey, devotion, artistic imagination, protection.",
        padaDetails: [
            { pada: 1, navamshaRashi: "Sagittarius", range: "16°40' - 20°00' Pisces" },
            { pada: 2, navamshaRashi: "Capricorn", range: "20°00' - 23°20' Pisces" },
            { pada: 3, navamshaRashi: "Aquarius", range: "23°20' - 26°40' Pisces" },
            { pada: 4, navamshaRashi: "Pisces", range: "26°40' - 30°00' Pisces" }
        ]
    }
];

module.exports = nakshatras;
