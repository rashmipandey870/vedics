/**
 * Vimshottari Dasha Data & Sequence Definitions
 * Total Cycle: 120 Years
 */

const dashaData = {
    totalCycleYears: 120,
    lordsSequence: [
        { key: "ketu", name: "Ketu", years: 7, sanskrit: "केतु" },
        { key: "venus", name: "Venus (Shukra)", years: 20, sanskrit: "शुक्र" },
        { key: "sun", name: "Sun (Surya)", years: 6, sanskrit: "सूर्य" },
        { key: "moon", name: "Moon (Chandra)", years: 10, sanskrit: "चन्द्र" },
        { key: "mars", name: "Mars (Mangal)", years: 7, sanskrit: "मंगल" },
        { key: "rahu", name: "Rahu", years: 18, sanskrit: "राहु" },
        { key: "jupiter", name: "Jupiter (Guru)", years: 16, sanskrit: "गुरु" },
        { key: "saturn", name: "Saturn (Shani)", years: 19, sanskrit: "शनि" },
        { key: "mercury", name: "Mercury (Budha)", years: 17, sanskrit: "बुध" }
    ],
    descriptions: {
        ketu: "Period of spiritual introspection, detachment, research, sudden revelations, and karmic refinement.",
        venus: "Period of artistic creativity, romance, material comfort, relationships, refinement, and aesthetic growth.",
        sun: "Period of personal authority, focus, career vitality, leadership recognition, and self-realization.",
        moon: "Period of emotional growth, public interaction, intuitive development, family focus, and mental expansion.",
        mars: "Period of high energy, physical initiatives, property matters, courage, competition, and decisive action.",
        rahu: "Period of rapid material expansion, foreign connections, technological learning, ambitious focus, and innovation.",
        jupiter: "Period of higher wisdom, educational achievements, financial prosperity, moral growth, and mentorship.",
        saturn: "Period of structured discipline, patience, hard work, responsibility, lasting foundation, and maturity.",
        mercury: "Period of intellectual progress, communication, business success, learning, writing, and networking."
    }
};

module.exports = dashaData;
