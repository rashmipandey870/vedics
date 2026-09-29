/**
 * Numerology Data Dictionary
 * 
 * Includes:
 * 1. Letter to Number mappings (Chaldean and Pythagorean)
 * 2. Profiles for Numbers 1 through 9 (Symbol, Ruling planet, Strengths, Challenges, Characteristics)
 * 3. Traditional Compatibility Matrix
 */

const numerologyData = {
    // Chaldean system letter mapping (Traditional Eastern/Vedic Numerology)
    chaldeanMap: {
        A: 1, I: 1, J: 1, Q: 1, Y: 1,
        B: 2, K: 2, R: 2,
        C: 3, G: 3, L: 3, S: 3,
        D: 4, M: 4, T: 4,
        E: 5, H: 5, N: 5, X: 5,
        U: 6, V: 6, W: 6,
        O: 7, Z: 7,
        F: 8, P: 8
    },

    // Pythagorean system letter mapping (Western Classic)
    pythagoreanMap: {
        A: 1, J: 1, S: 1,
        B: 2, K: 2, T: 2,
        C: 3, L: 3, U: 3,
        D: 4, M: 4, V: 4,
        E: 5, N: 5, W: 5,
        F: 6, O: 6, X: 6,
        G: 7, P: 7, Y: 7,
        H: 8, Q: 8, Z: 8,
        I: 9, R: 9
    },

    numberProfiles: {
        1: {
            number: 1,
            title: "The Pioneer & Leader",
            symbol: "Sun",
            planet: "Sun (Surya)",
            element: "Fire",
            luckyDays: ["Sunday", "Monday"],
            luckyColors: ["Gold", "Yellow", "Copper", "Orange"],
            luckyGem: "Ruby",
            luckyNumbers: [1, 2, 3, 9],
            characteristics: "Independent, ambitious, pioneering, confident, innovative, strong-willed.",
            strengths: ["Strong leadership", "Courage", "Self-reliance", "Original vision"],
            challenges: ["Impatience", "Egoism", "Dominating tendency", "Reluctance to take advice"],
            themes: "Initiative, independence, executive leadership, creation."
        },
        2: {
            number: 2,
            title: "The Diplomat & Peacemaker",
            symbol: "Moon",
            planet: "Moon (Chandra)",
            element: "Water",
            luckyDays: ["Monday", "Friday"],
            luckyColors: ["White", "Silver", "Green"],
            luckyGem: "Pearl",
            luckyNumbers: [1, 2, 4, 7],
            characteristics: "Intuitive, gentle, cooperative, imaginative, diplomatic, sensitive.",
            strengths: ["Empathy", "Mediating skills", "Artistic taste", "Tactful speech"],
            challenges: ["Over-sensitivity", "Mood swings", "Indecisiveness", "Self-doubt"],
            themes: "Partnership, harmony, intuition, emotional intelligence."
        },
        3: {
            number: 3,
            title: "The Educator & Optimist",
            symbol: "Jupiter",
            planet: "Jupiter (Guru)",
            element: "Ether",
            luckyDays: ["Thursday", "Friday"],
            luckyColors: ["Yellow", "Saffron", "Pink"],
            luckyGem: "Yellow Sapphire",
            luckyNumbers: [3, 6, 9, 1, 2],
            characteristics: "Wise, expressive, optimistic, joyful, scholarly, enthusiastic.",
            strengths: ["Eloquence", "Cheerfulness", "Generosity", "Broad vision"],
            challenges: ["Scattered focus", "Extravagance", "Tendency to exaggerate"],
            themes: "Wisdom, creative expression, spiritual expansion, joy."
        },
        4: {
            number: 4,
            title: "The Architect & Organizer",
            symbol: "Rahu / Uranus",
            planet: "Rahu (North Node)",
            element: "Earth",
            luckyDays: ["Sunday", "Saturday"],
            luckyColors: ["Blue", "Smoky Gray", "Khaki"],
            luckyGem: "Hessonite",
            luckyNumbers: [1, 2, 4, 7, 8],
            characteristics: "Pragmatic, disciplined, unconventional, systematic, hard-working, steadfast.",
            strengths: ["Methodical thinking", "Unbending loyalty", "Resilience", "Practical sense"],
            challenges: ["Rigidity", "Stubbornness", "Sudden unexpected disruptions"],
            themes: "Structure, foundation, endurance, unconventional success."
        },
        5: {
            number: 5,
            title: "The Explorer & Communicator",
            symbol: "Mercury",
            planet: "Mercury (Budha)",
            element: "Air",
            luckyDays: ["Wednesday", "Friday"],
            luckyColors: ["Green", "Light Ash", "Turquoise"],
            luckyGem: "Emerald",
            luckyNumbers: [1, 3, 5, 6],
            characteristics: "Versatile, quick-witted, adaptable, energetic, freedom-loving, curious.",
            strengths: ["Exceptional agility", "Nerve for business", "Multitasking", "Charming speech"],
            challenges: ["Restlessness", "Inconsistency", "Impulsive decisions"],
            themes: "Freedom, communication, commerce, quick adaptability."
        },
        6: {
            number: 6,
            title: "The Harmonizer & Nurturer",
            symbol: "Venus",
            planet: "Venus (Shukra)",
            element: "Water",
            luckyDays: ["Friday", "Tuesday"],
            luckyColors: ["White", "Light Blue", "Pink"],
            luckyGem: "Diamond / White Zircon",
            luckyNumbers: [3, 6, 9],
            characteristics: "Loving, artistic, magnetic, responsible, family-oriented, harmonious.",
            strengths: ["Aesthetic sense", "Compassionate heart", "Domestic care", "Reliability"],
            challenges: ["Perfectionism", "Over-possessiveness", "Difficulty saying no"],
            themes: "Love, beauty, family, luxury, balance."
        },
        7: {
            number: 7,
            title: "The Seeker & Philosopher",
            symbol: "Ketu / Neptune",
            planet: "Ketu (South Node)",
            element: "Water / Ether",
            luckyDays: ["Sunday", "Monday"],
            luckyColors: ["White", "Light Yellow", "Smoky Shades"],
            luckyGem: "Cat's Eye",
            luckyNumbers: [1, 2, 4, 7],
            characteristics: "Analytical, introspective, spiritual, secretive, research-oriented, intuitive.",
            strengths: ["Deep discernment", "Research talent", "Intuitive clarity", "Poise"],
            challenges: ["Aloofness", "Over-analyzing", "Melancholy"],
            themes: "Inner wisdom, research, spiritual truth, contemplation."
        },
        8: {
            number: 8,
            title: "The Powerhouse & Strategist",
            symbol: "Saturn",
            planet: "Saturn (Shani)",
            element: "Earth",
            luckyDays: ["Saturday", "Friday"],
            luckyColors: ["Dark Blue", "Black", "Purple"],
            luckyGem: "Blue Sapphire",
            luckyNumbers: [4, 8, 5, 6],
            characteristics: "Authoritative, practical, patient, resilient, karmic builder, ambitious.",
            strengths: ["Long-term persistence", "Financial acumen", "Capacity under pressure"],
            challenges: ["Heavy delays", "Strict frugality", "Workaholism"],
            themes: "Karmic justice, material discipline, endurance, mastery."
        },
        9: {
            number: 9,
            title: "The Humanitarian & Warrior",
            symbol: "Mars",
            planet: "Mars (Mangal)",
            element: "Fire",
            luckyDays: ["Tuesday", "Thursday"],
            luckyColors: ["Red", "Crimson", "Coral"],
            luckyGem: "Red Coral",
            luckyNumbers: [1, 3, 6, 9],
            characteristics: "Courageous, compassionate, energetic, philanthropic, protective, passionate.",
            strengths: ["Selfless service", "Valor", "Decisive courage", "Broader vision"],
            challenges: ["Quick temper", "Aggressiveness", "Burning out"],
            themes: "Completion, humanitarian service, courage, passion."
        }
    },

    // Compatibility matrix for numbers 1 to 9
    compatibility: {
        1: { best: [1, 2, 3, 9], moderate: [4, 5, 7], challenging: [6, 8] },
        2: { best: [1, 2, 4, 7], moderate: [3, 6], challenging: [5, 8, 9] },
        3: { best: [1, 3, 6, 9], moderate: [2, 5, 7], challenging: [4, 8] },
        4: { best: [1, 2, 4, 7, 8], moderate: [5, 6], challenging: [3, 9] },
        5: { best: [1, 3, 5, 6], moderate: [4, 8, 9], challenging: [2, 7] },
        6: { best: [3, 6, 9, 5], moderate: [4, 7], challenging: [1, 2, 8] },
        7: { best: [1, 2, 4, 7], moderate: [3, 5, 6], challenging: [8, 9] },
        8: { best: [4, 8, 5, 6], moderate: [7], challenging: [1, 2, 3, 9] },
        9: { best: [1, 3, 6, 9], moderate: [5], challenging: [2, 4, 7, 8] }
    }
};

module.exports = numerologyData;
