# 🌌 JyotishSetu
### "Vedic Astrology & Numerology Calculator"

> **Tagline:** *"Discover your Vedic birth profile through traditional calculations."*

JyotishSetu is a full-stack web application designed as a college-level project for B.Tech Computer Science & Engineering students. It provides astronomical coordinate transformations, traditional Vedic astrology calculations (Rashi, Nakshatra, Pada, Paya, Lagna, Navagraha positions, North Indian Kundli chart visualization, Vimshottari Dasha timeline), and a numerology calculation engine (Mulank, Bhagyank, Name Number with step-by-step reduction math).

The application is built using simple technologies without complex frameworks or black-box libraries, making every single formula explainable during a college viva examination.

---

## 📋 Table of Contents
1. [Objective & Purpose](#-objective--purpose)
2. [Technology Stack](#-technology-stack)
3. [Key Features](#-key-features)
4. [System Architecture & Folder Structure](#-system-architecture--folder-structure)
5. [Calculation Methodology & Formulas](#-calculation-methodology--formulas)
6. [API Endpoints](#-api-endpoints)
7. [Database Schema (MongoDB)](#-database-schema-mongodb)
8. [Installation & Setup](#-installation--setup)
9. [🎓 B.Tech Viva Q&A Guide](#-btech-viva-qa-guide)
10. [Future Scope](#-future-scope)

---

## 🎯 Objective & Purpose
The main objective of JyotishSetu is to provide a clean, visually impressive, and feature-rich web platform for traditional Vedic calculations while keeping the code clean, modular, and easy to explain.

* **Educational Disclaimer:** The platform clearly states that calculations are based on selected traditional Vedic astrology methodologies and are intended for educational/informational purposes.

---

## 🛠️ Technology Stack

### Frontend
- **HTML5:** Semantic document structure.
- **CSS3:** Custom midnight navy & celestial gold theme, glassmorphism cards, CSS Grid/Flexbox layouts, `@media print` print stylesheet (No external CSS frameworks like Bootstrap/Tailwind).
- **Vanilla JavaScript (ES6+):** Starfield canvas animation, DOM manipulation, Fetch API, SVG Kundli chart rendering (No frontend frameworks like React/Angular/Vue).

### Backend
- **Node.js:** JavaScript runtime.
- **Express.js:** Lightweight Web Application Framework for REST API routing and serving static files.

### Database
- **Local MongoDB (Mongoose ODM):** Used for saving user birth profiles and calculation history (`mongodb://127.0.0.1:27017/jyotishsetu`).
- **Graceful Fallback:** If local MongoDB is not running, the application seamlessly uses an in-memory session store so that saved profiles operate reliably during viva demos.

---

## 🌟 Key Features

1. **Hero & Interactive Birth Details Form:** Full name, DOB, time of birth, birth place, and geographic coordinates (latitude/longitude) with quick Indian city presets and browser Geolocation auto-fill.
2. **Core Cosmic Profile Cards:** 8 core cards for Rashi, Nakshatra, Pada (1–4), Nakshatra Lord, Paya (Gold, Silver, Copper, Iron), Lagna (Ascendant), Sun Sign, and Moon Sign with expandable "Learn More" sections.
3. **North Indian Kundli Visualization:** Clean HTML/SVG diamond chart representing all 12 houses, placed Rashi numbers (1–12), and Graha abbreviations (`Su`, `Mo`, `Ma`, `Me`, `Ju`, `Ve`, `Sa`, `Ra`, `Ke`).
4. **Planetary Positions Table:** Sidereal longitudes, Rashi sign names, sign degrees, and house placements for all 9 Grahas.
5. **Vimshottari Dasha Engine:** 120-year planetary timeline with starting balance at birth, active Mahadasha highlight, and Antardasha sub-period breakdown (`dashaCalculator.js`).
6. **Numerology Calculator Suite:**
   - **Mulank (Birth Number):** Reduced birth day digit.
   - **Bhagyank (Life Path Number):** Reduced total DOB string.
   - **Name Number:** Letter-to-number mapping using Chaldean (Vedic) or Pythagorean system.
   - **Step-by-step Math Modal:** Displays exact digit reduction sequence (e.g. `15 → 1 + 5 = 6`) for demonstration.
   - **Number Profiles (1–9):** Ruling planets, strengths, challenges, lucky days/colors.
   - **Compatibility Explorer:** Evaluates number combinations (Person A & Person B).
   - **Universal Today's Number:** Date-based daily profile.
7. **Educational Center (`learn.html`):** Cards explaining Rashi, Nakshatra, Pada, Paya, Lagna, Tithi, Yoga, Karana, Mahadasha, and Antardasha with simple explanation, technical explanation, and examples + 27 Nakshatras interactive grid & modal directory.
8. **Report Generation & Print:** Clean printable CSS layout triggered via `window.print()`.

---

## 📁 System Architecture & Folder Structure

```text
JyotishSetu/
├── package.json               # Dependencies (express, mongoose, cors, dotenv)
├── server.js                  # Main Express Server & MongoDB Connection
├── README.md                  # Comprehensive Project Documentation
│
├── data/                      # Structured Data Objects & Dictionaries
│   ├── rashis.js              # 12 Rashis details
│   ├── nakshatras.js          # 27 Nakshatras, Lords, Deities, Symbols, Padas
│   ├── planets.js             # Navagraha metadata
│   ├── numerology.js          # Chaldean/Pythagorean maps, 1-9 profiles, compatibility
│   ├── dasha.js               # Vimshottari 120-year planetary sequence & descriptions
│   └── interpretations.js    # Educational content for Learn page
│
├── models/
│   └── Profile.js             # Mongoose Model for saved birth reports
│
├── server/
│   ├── calculations/          # Transparent Calculation Engines
│   │   ├── astronomy.js       # Julian Day, Local Sidereal Time, Lahiri Ayanamsha, Lagna
│   │   ├── astrology.js       # Rashi, Nakshatra, Pada, Paya rule engine
│   │   ├── dashaCalculator.js # Vimshottari Mahadasha & Antardasha timeline logic
│   │   └── numerology.js      # Mulank, Bhagyank, Name Number & step breakdown generator
│   │
│   ├── controllers/
│   │   ├── calculationController.js # API Controller for profile & numerology calculations
│   │   └── profileController.js     # API Controller for DB saving & history
│   │
│   └── routes/
│       └── apiRoutes.js       # Express Router mounting API endpoints
│
└── public/                    # Frontend Client Application
    ├── index.html             # Hero section & Birth Form
    ├── profile.html           # Cosmic Profile Dashboard (Kundli, Dasha, Cards)
    ├── numerology.html        # Numerology Suite (Step modal, Compatibility, 1-9 Cards)
    ├── learn.html             # Educational Center & 27 Nakshatras Grid
    ├── history.html           # Saved Birth Reports History
    ├── css/
    │   ├── style.css          # Base celestial dark theme, gold accents, buttons
    │   ├── dashboard.css      # Kundli SVG, Dasha timeline, position table styling
    │   ├── print.css          # @media print layout for paper printing / PDF
    │   └── responsive.css     # Mobile & tablet media queries
    └── js/
        ├── main.js            # Canvas starfield, location presets, nav toggle
        ├── astrology.js       # Kundli SVG generator & card expanders
        ├── dashaUI.js         # Dasha timeline & Antardasha table UI renderer
        ├── dashboard.js       # Dashboard page loader & API calls
        ├── numerology.js      # Numerology page loader & step-by-step modal
        └── learn.js           # Learn page loader & 27 Nakshatra detail modal
```

---

## 🧮 Calculation Methodology & Formulas

### 1. Astronomical Sidereal Longitude & Lagna (`server/calculations/astronomy.js`)
* **Julian Day Number (JD):** Converts Gregorian birth date and UTC time into continuous Julian days.
* **Greenwich Mean Sidereal Time (GMST):** `GMST = 280.46061837 + 360.98564736629 * (JD - 2451545.0)`.
* **Local Sidereal Time (LST):** `LST = (GMST + Longitude) % 360`.
* **Lahiri Ayanamsha:** `Ayanamsha = 23.85 + (Year - 1950) * 0.01361` (~24.23° in 2026).
* **Sidereal Ascendant (Lagna):** Calculated from LST, birth latitude, and obliquity of ecliptic (`ε ≈ 23.44°`), then converted from Tropical to Sidereal by subtracting Lahiri Ayanamsha.

### 2. Rashi & Nakshatra Division (`server/calculations/astrology.js`)
* **Rashi Index (1 to 12):** `Math.floor(Longitude / 30) + 1`.
* **Nakshatra Index (0 to 26):** `Math.floor(MoonLongitude / 13.333333)`. Each Nakshatra spans 13°20' (13.3333°).
* **Pada Index (1 to 4):** `Math.floor(ElapsedInNakshatra / 3.333333) + 1`. Each Pada spans 3°20' (3.3333°).

### 3. Paya (Foundational Metal) Rule Engine
* Calculated based on the house position of the Moon relative to the Lagna house:
  * **House 1, 6, 11:** Gold (Suvarna Paya) — Fiery vitality, requires balance.
  * **House 2, 5, 9:** Silver (Rajat Paya) — Highly auspicious, emotional stability & wealth.
  * **House 3, 7, 10:** Copper (Tamra Paya) — Favorable commercial growth & courage.
  * **House 4, 8, 12:** Iron (Loha Paya) — Teaches endurance and hard work.

### 4. Vimshottari Dasha Algorithm (`server/calculations/dashaCalculator.js`)
* **Total Cycle:** 120 Years across 9 Grahas (Ketu 7y, Venus 20y, Sun 6y, Moon 10y, Mars 7y, Rahu 18y, Jupiter 16y, Saturn 19y, Mercury 17y).
* **Balance at Birth:** `RemainingFraction = 1 - (ElapsedDegrees / 13.3333)`. `BalanceYears = LordTotalYears * RemainingFraction`.
* **Antardasha Sub-period Duration:** `SubPeriodYears = (MahadashaYears * SubLordYears) / 120`.

### 5. Numerology Digit Reduction (`server/calculations/numerology.js`)
* **Mulank:** Repeatedly sum digits of birth day (e.g. `29 → 2 + 9 = 11 → 1 + 1 = 2`).
* **Bhagyank:** Sum all digits in `DD + MM + YYYY` until reduced to a single digit (1–9).
* **Name Number:** Maps letters via Chaldean values (`A=1, B=2, C=3, D=4, E=5, F=8, G=3, H=5, I=1, J=1, K=2, L=3, M=4, N=5, O=7, P=8, Q=1, R=2, S=3, T=4, U=6, V=6, W=6, X=5, Y=1, Z=7`), sums them, and reduces to single digit.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/calculate/profile` | Accepts birth details; calculates Rashi, Nakshatra, Pada, Paya, Lagna, Kundli grid, planetary positions, Dasha, and numerology. |
| `POST` | `/api/calculate/numerology` | Calculates Mulank, Bhagyank, Name Number with step-by-step math array. |
| `POST` | `/api/calculate/compatibility` | Evaluates numerological compatibility between Person A and Person B. |
| `GET` | `/api/rashis` | Returns 12 Rashis dataset. |
| `GET` | `/api/nakshatras` | Returns 27 Nakshatras dataset with Padas, deities, and symbols. |
| `GET` | `/api/learn` | Returns educational topic definitions for Learn page. |
| `POST` | `/api/profile/save` | Saves birth profile to local MongoDB (or memory store fallback). |
| `GET` | `/api/profile/history` | Fetches saved birth profiles list. |

---

## 💾 Database Schema (MongoDB)

```javascript
const ProfileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: String, required: true },
    birthTime: { type: String, required: true },
    birthPlace: { type: String, required: true },
    gender: { type: String, default: 'Not Specified' },
    latitude: { type: Number, default: 28.6139 },
    longitude: { type: Number, default: 77.2090 },
    rashi: String,
    nakshatra: String,
    pada: Number,
    paya: String,
    lagna: String,
    numerology: { mulank: Number, bhagyank: Number, nameNumber: Number },
    createdAt: { type: Date, default: Date.now }
});
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16+) installed.
- (Optional) Local MongoDB daemon running on `localhost:27017`.

### Quick Start
1. **Clone or navigate to project directory:**
   ```bash
   cd JyotishSetu
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Open in Browser:**
   Visit `http://localhost:3000` in your web browser.

---

## 🎓 B.Tech Viva Q&A Guide

### Key Questions External Examiners Might Ask:

**Q1: What is the difference between Tropical (Sayana) and Sidereal (Nirayana) Astrology?**
> **Answer:** Tropical astrology measures positions relative to the Vernal Equinox point (which precesses over time). Vedic astrology uses the Sidereal (Nirayana) system, which measures positions relative to fixed stellar constellations. The difference between them is called **Ayanamsha** (Lahiri Ayanamsha is approximately ~24.23° in 2026).

**Q2: How is Lagna (Ascendant) calculated?**
> **Answer:** Lagna is the zodiac sign rising on the eastern horizon at the exact time and location of birth. It is calculated using Greenwich Mean Sidereal Time (GMST), adjusting for Local Longitude to obtain Local Sidereal Time (LST), and applying the trigonometric formula `tan(Asc) = cos(LST) / (-sin(ε)*tan(lat) - cos(ε)*sin(LST))`, then subtracting Ayanamsha.

**Q3: How does the Vimshottari Dasha calculation work in your code?**
> **Answer:** In `server/calculations/dashaCalculator.js`, we determine the Moon's birth Nakshatra and its ruling Graha. The total Nakshatra span is 13°20'. We calculate the fraction of Nakshatra remaining at birth, multiply it by the ruling Graha's standard Mahadasha years to find the balance at birth, and then chain the 9 planetary Mahadashas in sequence for 120 total years.

**Q4: How does the system handle database connectivity if MongoDB is offline?**
> **Answer:** In `server/controllers/profileController.js`, we check `mongoose.connection.readyState`. If MongoDB is connected (State 1), records are saved directly to the local MongoDB database. If offline, the controller seamlessly uses an in-memory fallback array (`memoryProfiles`), preventing any server crash during demonstration.

---

## 🔮 Future Scope

- Integration with high-precision Swiss Ephemeris astronomical C-bindings (`swisseph`) for exact planetary arc-seconds.
- Additional divisional charts (D-9 Navamsha, D-10 Dashamsha SVG chart generators).
- Multilingual support for Hindi, Sanskrit, and regional Indian languages.
- Progressive Web App (PWA) offline installation support.
