/**
 * Planetary Data Dictionary - 9 Grahas in Vedic Astrology (Navagraha)
 */

const planets = {
    sun: {
        name: "Sun",
        sanskrit: "Surya (सूर्य)",
        symbol: "☉",
        rashiRuled: ["Leo"],
        nature: "Malefic (Benefic when well placed)",
        element: "Fire",
        gender: "Masculine",
        gemstone: "Ruby (Manikya)",
        day: "Sunday",
        color: "Copper, Orange, Red",
        significance: "Soul (Atman), Ego, Vitality, Father, Authority, Leadership, Self-expression."
    },
    moon: {
        name: "Moon",
        sanskrit: "Chandra (चन्द्र)",
        symbol: "☽",
        rashiRuled: ["Cancer"],
        nature: "Benefic (Waxing) / Malefic (Waning)",
        element: "Water",
        gender: "Feminine",
        gemstone: "Pearl (Moti)",
        day: "Monday",
        color: "White, Silver",
        significance: "Mind (Manas), Emotions, Mother, Intuition, Memory, Psychological peace."
    },
    mars: {
        name: "Mars",
        sanskrit: "Mangal (मंगल)",
        symbol: "♂",
        rashiRuled: ["Aries", "Scorpio"],
        nature: "Malefic",
        element: "Fire",
        gender: "Masculine",
        gemstone: "Red Coral (Moonga)",
        day: "Tuesday",
        color: "Bright Red",
        significance: "Courage, Energy, Brother, Land, Physical Strength, Determination, Initiative."
    },
    mercury: {
        name: "Mercury",
        sanskrit: "Budha (बुध)",
        symbol: "☿",
        rashiRuled: ["Gemini", "Virgo"],
        nature: "Neutral / Adaptable Benefic",
        element: "Earth",
        gender: "Neuter",
        gemstone: "Emerald (Panna)",
        day: "Wednesday",
        color: "Green",
        significance: "Intellect, Communication, Speech, Mathematics, Trade, Analytical Logic."
    },
    jupiter: {
        name: "Jupiter",
        sanskrit: "Guru / Brihaspati (गुरु)",
        symbol: "♃",
        rashiRuled: ["Sagittarius", "Pisces"],
        nature: "Great Benefic",
        element: "Ether / Wood",
        gender: "Masculine",
        gemstone: "Yellow Sapphire (Pukhraj)",
        day: "Thursday",
        color: "Yellow, Gold",
        significance: "Wisdom, Dharma, Higher Knowledge, Guru, Wealth, Children, Spirituality."
    },
    venus: {
        name: "Venus",
        sanskrit: "Shukra (शुक्र)",
        symbol: "♀",
        rashiRuled: ["Taurus", "Libra"],
        nature: "Benefic",
        element: "Water",
        gender: "Feminine",
        gemstone: "Diamond (Heera) / White Sapphire",
        day: "Friday",
        color: "White, Light Pink",
        significance: "Love, Harmony, Beauty, Arts, Relationships, Luxury, Devotion."
    },
    saturn: {
        name: "Saturn",
        sanskrit: "Shani (शनि)",
        symbol: "♄",
        rashiRuled: ["Capricorn", "Aquarius"],
        nature: "Great Malefic (Teacher)",
        element: "Air",
        gender: "Neuter",
        gemstone: "Blue Sapphire (Neelam)",
        day: "Saturday",
        color: "Black, Dark Blue",
        significance: "Karma, Discipline, Patience, Hard Work, Time (Kala), Longevity, Justice."
    },
    rahu: {
        name: "Rahu (North Node)",
        sanskrit: "Rahu (राहु)",
        symbol: "☊",
        rashiRuled: ["Co-ruler of Aquarius"],
        nature: "Shadow Planet (Chhaya Graha)",
        element: "Air",
        gender: "Neuter",
        gemstone: "Hessonite (Gomed)",
        day: "Saturday (Associated)",
        color: "Smoky Gray, Blue",
        significance: "Worldly desire, innovation, technology, ambition, unconventional path, illusion."
    },
    ketu: {
        name: "Ketu (South Node)",
        sanskrit: "Ketu (केतु)",
        symbol: "☋",
        rashiRuled: ["Co-ruler of Scorpio"],
        nature: "Shadow Planet (Chhaya Graha)",
        element: "Fire",
        gender: "Neuter",
        gemstone: "Cat's Eye (Lehsuniya)",
        day: "Tuesday (Associated)",
        color: "Multi-colored, Smoky",
        significance: "Spiritual liberation (Moksha), detachment, mastery, intuition, research."
    }
};

module.exports = planets;
