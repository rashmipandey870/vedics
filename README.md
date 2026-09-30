# 🌌 JeevanShaili
### Vedic Astrology • Numerology • Dasha

> **Tagline:** *"Traditional calculations, structured through modern code."*  
> **Author:** Built by **Rashmi Pandey** (B.Tech Computer Science & Engineering)

JeevanShaili is a full-stack web software project that implements traditional Vedic Sidereal astrology calculations (Rashi, Nakshatra, Pada, Paya, Lagna, Navagraha Sidereal longitudes, interactive North Indian Kundli chart visualization, Vimshottari Dasha timeline) and a transparent numerology calculation engine (Mulank, Bhagyank, Name Number with step-by-step digit reduction math).

---

## 💡 Concept & Identity
```text
Rashmi      = Ray of light / Identity
Sutra       = Structured principle or calculation rule
JeevanShaili = Traditional calculation rules implemented through modern software
```

The primary objective of JeevanShaili is to provide a clean, visually impressive, and feature-rich web platform for traditional Vedic calculations while keeping the software architecture modular, transparent, and easy to explain during a college B.Tech viva examination.

---

## 🛠️ Technology Stack

### Frontend
- **HTML5:** Semantic document structure.
- **CSS3:** Midnight navy & celestial gold aesthetic (`#070b14`), glassmorphism cards, CSS Grid & Flexbox, `@media print` print stylesheet.
- **Vanilla JavaScript (ES6+):** Animated starfield canvas, DOM manipulation, Fetch API, interactive SVG Kundli chart renderer with house popups, and Viva calculation step modals.

### Backend
- **Node.js:** JavaScript runtime environment.
- **Express.js:** Web application framework for REST API endpoints and static asset serving.

### Database
- **Local MongoDB (Mongoose ODM):** Local database storage (`mongodb://127.0.0.1:27017/rashmisutra`).
- **Session Fallback:** If local MongoDB is offline, the server automatically uses an in-memory store so that profile saving works reliably during viva demonstrations without crashing.

---

## 🌟 Key Features

1. **Hero & Interactive Birth Details Form:** Full name, DOB, birth time (24h), birth place, and geographic coordinates (latitude/longitude) with quick Indian city presets and browser Geolocation auto-fill.
2. **Core Cosmic Profile Cards:** 8 core cards for Rashi, Nakshatra, Pada (1–4), Nakshatra Lord, Paya (Gold, Silver, Copper, Iron), Lagna (Ascendant), Sun Sign, and Moon Sign with expandable descriptions and **"🧮 View Math"** viva calculation step modals.
3. **Interactive North Indian Kundli SVG Chart:** 12-house diamond chart rendering placed Rashi numbers (1–12) and Graha abbreviations. Clicking any house opens an interactive modal detailing placed Grahas, degrees, and traditional house significations (*Tanu Bhava, Dhana Bhava... Vyaya Bhava*).
4. **Planetary Positions Table:** Exact Sidereal degrees, sign names, and house placements for all 9 Grahas (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu).
5. **Vimshottari Dasha Engine:** 120-year planetary timeline with starting balance at birth, active Mahadasha highlight, and Antardasha sub-period table (`dashaCalculator.js`).
6. **Numerology Calculator Suite:**
   - **Mulank (Birth Number):** Reduced birth day digit.
   - **Bhagyank (Life Path Number):** Reduced total DOB string.
   - **Name Number:** Letter-to-number mapping using Chaldean (Vedic) or Pythagorean system.
   - **Step-by-step Math Modal:** Displays exact digit reduction sequence (e.g. `15 → 1 + 5 = 6`) for demonstration.
   - **Number Profiles (1–9):** Ruling planets, strengths, challenges, lucky days/colors.
   - **Compatibility Explorer:** Evaluates number combinations (Person A & Person B).
   - **Universal Today's Number:** Date-based daily profile.
7. **Educational Center (`learn.html`):** Concept cards explaining Rashi, Nakshatra, Pada, Paya, Lagna, Tithi, Yoga, Karana, Graha, Mahadasha, Antardasha, Mulank, and Bhagyank + 27 Nakshatras directory with popup modals.
8. **Calculation Methodology Page (`methodology.html`):** Documents Nirayana system, Lahiri Ayanamsha (`23.85° + (Year - 1950) × 0.01361°`), Nakshatra divisions (`13°20'`), and project scope limitations.
9. **Report Generation & Print:** Clean printable CSS layout triggered via `window.print()`.

---

## 📁 System Architecture & Folder Structure

```text
JeevanShaili/
├── package.json               # Project dependencies (express, mongoose, cors, dotenv)
├── server.js                  # Main Express Server & MongoDB Connection setup
├── README.md                  # Comprehensive Documentation & Viva Q&A Guide
│
├── data/                      # Structured Data Dictionaries
│   ├── rashis.js              # 12 Rashis metadata
│   ├── nakshatras.js          # 27 Nakshatras, Lords, Deities, Symbols, Padas
│   ├── planets.js             # Navagraha metadata
│   ├── numerology.js          # Chaldean/Pythagorean maps, 1-9 profiles, compatibility
│   ├── dasha.js               # Vimshottari 120-year planetary sequence
│   └── interpretations.js    # Educational content for Learn page
│
├── models/
│   └── Profile.js             # Mongoose Model for saved birth profiles
│
├── server/
│   ├── calculations/          # Transparent Calculation Engines
│   │   ├── astronomy.js       # Julian Day, Local Sidereal Time, Lahiri Ayanamsha, Lagna
│   │   ├── astrology.js       # Rashi, Nakshatra, Pada, Paya rule engine
│   │   ├── dashaCalculator.js # Vimshottari Mahadasha & Antardasha timeline logic
│   │   └── numerology.js      # Mulank, Bhagyank, Name Number & step breakdown math
│   │
│   ├── controllers/
│   │   ├── calculationController.js # API Controller for profile & numerology calculations
│   │   └── profileController.js     # API Controller for DB saving & history
│   │
│   └── routes/
│       └── apiRoutes.js       # Express Router mounting REST API endpoints
│
└── public/                    # Client Application
    ├── index.html             # Landing page, hero, birth form, location presets
    ├── profile.html           # Cosmic Profile Dashboard (Kundli SVG, Dasha, Core Cards)
    ├── numerology.html        # Numerology Suite (Step math modal, Compatibility, 1-9 Cards)
    ├── learn.html             # Educational Center & 27 Nakshatras Directory
    ├── methodology.html       # Calculation Methodology & Limitations page
    ├── history.html           # Saved Birth Reports History
    ├── css/
    │   ├── style.css          # Celestial dark theme, gold gradients, glass cards, typography
    │   ├── dashboard.css      # Kundli SVG, Dasha timeline, position table styling
    │   ├── print.css          # @media print layout for paper printing / PDF
    │   └── responsive.css     # Mobile & tablet responsive media queries
    └── js/
        ├── main.js            # Starfield canvas, location presets, nav toggle
        ├── astrology.js       # Kundli SVG chart renderer, house popups, viva modals
        ├── dashaUI.js         # Dasha timeline & Antardasha table UI renderer
        ├── dashboard.js       # Dashboard page loader & API handler
        ├── numerology.js      # Numerology page loader & step-by-step math modal
        └── learn.js           # Learn page loader & 27 Nakshatra detail modal
```

---

## 📐 Calculation Methodology & Formulas

### 1. Astronomical Sidereal Longitude & Lagna (`server/calculations/astronomy.js`)
* **Julian Day Number (JD):** Converts Gregorian birth date and UTC time into continuous Julian days.
* **Greenwich Mean Sidereal Time (GMST):** `GMST = (280.46061837 + 360.98564736629 * (JD - 2451545.0)) % 360`.
* **Local Sidereal Time (LST):** `LST = (GMST + Longitude) % 360`.
* **Lahiri Ayanamsha:** `Ayanamsha = 23.85° + (Year - 1950) * 0.01361°` (~24.23° in 2026).
* **Sidereal Ascendant (Lagna):** Calculated from LST, latitude, and obliquity of ecliptic (`ε ≈ 23.44°`), then converted from Tropical to Sidereal by subtracting Lahiri Ayanamsha.

### 2. Rashi & Nakshatra Division (`server/calculations/astrology.js`)
* **Rashi Index (1 to 12):** `Math.floor(Longitude / 30) + 1`.
* **Nakshatra Index (0 to 26):** `Math.floor(MoonLongitude / 13.333333)`. Each Nakshatra spans 13°20' (13.3333°).
* **Pada Index (1 to 4):** `Math.floor(ElapsedInNakshatra / 3.333333) + 1`. Each Pada spans 3°20' (3.3333°).

### 3. Paya (Foundational Metal) Rule Engine
* Calculated based on the house position of the Moon relative to the Lagna house:
  * **House 1, 6, 11:** Gold (Suvarna Paya) — High ambition, fiery vitality.
  * **House 2, 5, 9:** Silver (Rajat Paya) — Highly auspicious, emotional stability & wealth.
  * **House 3, 7, 10:** Copper (Tamra Paya) — Favorable commercial growth & courage.
  * **House 4, 8, 12:** Iron (Loha Paya) — Teaches endurance and hard work.

### 4. Vimshottari Dasha Algorithm (`server/calculations/dashaCalculator.js`)
* **Total Cycle:** 120 Years across 9 Grahas (Ketu 7y, Venus 20y, Sun 6y, Moon 10y, Mars 7y, Rahu 18y, Jupiter 16y, Saturn 19y, Mercury 17y).
* **Balance at Birth:** `RemainingFraction = 1 - (ElapsedDegrees / 13.3333)`. `BalanceYears = LordTotalYears * RemainingFraction`.
* **Antardasha Sub-period Duration:** `SubPeriodYears = (MahadashaYears * SubLordYears) / 120`.

### 5. Numerology Digit Reduction (`server/calculations/numerology.js`)
* **Mulank:** Sum digits of birth day (e.g. `29 → 2 + 9 = 11 → 1 + 1 = 2`).
* **Bhagyank:** Sum all digits in `DD + MM + YYYY` until reduced to a single digit (1–9).
* **Name Number:** Maps letters via Chaldean values (`A=1, B=2, C=3, D=4, E=5, F=8, G=3, H=5, I=1, J=1, K=2, L=3, M=4, N=5, O=7, P=8, Q=1, R=2, S=3, T=4, U=6, V=6, W=6, X=5, Y=1, Z=7`), sums them, and reduces to single digit.

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/calculate/profile` | Accepts birth details; calculates Rashi, Nakshatra, Pada, Paya, Lagna, Kundli grid, planetary positions, Dasha, and numerology with viva calculation step metadata. |
| `POST` | `/api/calculate/numerology` | Calculates Mulank, Bhagyank, Name Number with step-by-step math array. |
| `POST` | `/api/calculate/compatibility` | Evaluates numerological compatibility between Person A and Person B. |
| `GET` | `/api/rashis` | Returns 12 Rashis dataset. |
| `GET` | `/api/nakshatras` | Returns 27 Nakshatras dataset with Padas, deities, and symbols. |
| `GET` | `/api/learn` | Returns educational topic definitions for Learn page. |
| `POST` | `/api/profile/save` | Saves birth profile to local MongoDB (or session store fallback). |
| `GET` | `/api/profile/history` | Fetches saved birth profiles list. |

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16+) installed.
- (Optional) Local MongoDB daemon running on `localhost:27017`.

### Quick Start
1. **Navigate to project directory:**
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
> **Answer:** Lagna is the zodiac sign rising on the eastern horizon at the exact time and location of birth. It is calculated using Greenwich Mean Sidereal Time (GMST), adjusting for Local Longitude to obtain Local Sidereal Time (LST), and applying the trigonometric formula `tan(Asc) = cos(LST) / (-sin(ε)*tan(lat) - cos(ε)*sin(LST))`, then subtracting Lahiri Ayanamsha.

**Q3: How does the Vimshottari Dasha calculation work in your code?**
> **Answer:** In `server/calculations/dashaCalculator.js`, we determine the Moon's birth Nakshatra and its ruling Graha. The total Nakshatra span is 13°20'. We calculate the fraction of Nakshatra remaining at birth, multiply it by the ruling Graha's standard Mahadasha years to find the balance at birth, and then chain the 9 planetary Mahadashas in sequence for 120 total years.

**Q4: How does the system handle database connectivity if MongoDB is offline?**
> **Answer:** In `server/controllers/profileController.js`, we check `mongoose.connection.readyState`. If MongoDB is connected (State 1), records are saved directly to the local MongoDB database. If offline, the controller seamlessly uses an in-memory fallback array (`memoryProfiles`), preventing any server crash during demonstration.

---

## 🔮 Scope & Limitations
- **JeevanShaili** is an educational software implementation of selected traditional calculation methods.
- Derived results are based on transparent mathematical rule-engines and are not presented as scientific facts.

---

## 👩‍💻 Author
**Rashmi Pandey**  
B.Tech Computer Science & Engineering
