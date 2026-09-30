/**
 * JeevanShaili - Frontend Astrology Rendering & Calculation Details Engine
 * Renders North Indian Kundli SVG Chart with interactive House Popups and Calculation Modals.
 * 
 * Author: Rashmi Pandey
 */

/**
 * Renders North Indian Style Kundli Chart (SVG) with interactive House click/hover popups
 */
function renderKundliSVG(kundliChart, targetElementId = 'kundli-chart-container') {
    const container = document.getElementById(targetElementId);
    if (!container || !kundliChart) return;

    window.activeKundliChart = kundliChart; // Store globally for house popup details

    // Exact geometric coordinates for 12 Houses in North Indian Diamond Kundli (400x400 viewBox)
    const houseConfigs = {
        1:  { polygon: "200,12 294,106 200,200 106,106", rashiX: 200, rashiY: 45,  centerX: 200, centerY: 110 },
        2:  { polygon: "12,12 200,12 106,106",          rashiX: 106, rashiY: 38,  centerX: 106, centerY: 72  },
        3:  { polygon: "12,12 106,106 12,200",          rashiX: 45,  rashiY: 98,  centerX: 52,  centerY: 132 },
        4:  { polygon: "12,200 106,106 200,200 106,294", rashiX: 106, rashiY: 145, centerX: 106, centerY: 198 },
        5:  { polygon: "12,200 106,294 12,388",          rashiX: 45,  rashiY: 275, centerX: 52,  centerY: 308 },
        6:  { polygon: "12,388 106,294 200,388",          rashiX: 106, rashiY: 362, centerX: 106, centerY: 328 },
        7:  { polygon: "200,200 294,294 200,388 106,294", rashiX: 200, rashiY: 355, centerX: 200, centerY: 288 },
        8:  { polygon: "200,388 294,294 388,388",          rashiX: 294, rashiY: 362, centerX: 294, centerY: 328 },
        9:  { polygon: "388,200 294,294 388,388",          rashiX: 355, rashiY: 275, centerX: 348, centerY: 308 },
        10: { polygon: "200,200 294,106 388,200 294,294", rashiX: 294, rashiY: 145, centerX: 294, centerY: 198 },
        11: { polygon: "388,12 388,200 294,106",          rashiX: 355, rashiY: 98,  centerX: 348, centerY: 132 },
        12: { polygon: "200,12 388,12 294,106",          rashiX: 294, rashiY: 38,  centerX: 294, centerY: 72  }
    };

    let houseElements = '';

    kundliChart.houses.forEach(h => {
        const config = houseConfigs[h.house];
        const planetsSVG = formatHousePlanetsSVG(h.house, h.planets, config.centerX, config.centerY);

        houseElements += `
            <g class="kundli-house-group" onclick="showHouseDetailModal(${h.house})">
                <polygon points="${config.polygon}" class="kundli-house-poly" />
                <text x="${config.rashiX}" y="${config.rashiY}" class="kundli-rashi-num">${h.rashiId}</text>
                ${planetsSVG}
            </g>
        `;
    });

    const vargaLabel = kundliChart.vargaCode || 'D1';

    const svgHTML = `
        <div class="kundli-svg-container">
            <svg viewBox="0 0 400 400" class="kundli-svg" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="kundliBg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#0b1120"/>
                        <stop offset="100%" stop-color="#161e31"/>
                    </linearGradient>
                    <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="rgba(212,175,55,0.12)"/>
                        <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
                    </radialGradient>
                </defs>

                <!-- Outer Frame -->
                <rect x="5" y="5" width="390" height="390" rx="10" fill="url(#kundliBg)" stroke="#d4af37" stroke-width="2.5"/>
                <rect x="12" y="12" width="376" height="376" rx="6" fill="url(#centerGlow)" stroke="rgba(212, 175, 55, 0.4)" stroke-width="1"/>

                <!-- Corner Ornaments -->
                <circle cx="12" cy="12" r="4" fill="#d4af37"/>
                <circle cx="388" cy="12" r="4" fill="#d4af37"/>
                <circle cx="12" cy="388" r="4" fill="#d4af37"/>
                <circle cx="388" cy="388" r="4" fill="#d4af37"/>

                <!-- House Polygons & Overlay Data -->
                ${houseElements}

                <!-- Inner Diamond Lines Overlay for Crisp Borders -->
                <polygon points="200,12 388,200 200,388 12,200" fill="none" stroke="#d4af37" stroke-width="1.5" pointer-events="none"/>
                <line x1="12" y1="12" x2="388" y2="388" stroke="#d4af37" stroke-width="1.5" pointer-events="none"/>
                <line x1="388" y1="12" x2="12" y2="388" stroke="#d4af37" stroke-width="1.5" pointer-events="none"/>

                <!-- Chart Title Badge in Center -->
                <g pointer-events="none">
                    <circle cx="200" cy="200" r="16" fill="rgba(11, 17, 32, 0.95)" stroke="#d4af37" stroke-width="1.2"/>
                    <text x="200" y="204" fill="#f5e4a3" font-family="serif" font-weight="bold" font-size="11" text-anchor="middle">${vargaLabel}</text>
                </g>
            </svg>
        </div>
    `;

    container.innerHTML = svgHTML;
}

/**
 * Formats planet representations inside an SVG house polygon
 */
function formatHousePlanetsSVG(houseNum, planetsArray, centerX, centerY) {
    const abbrevMap = {
        'Sun':     { abbr: 'Su', color: '#f59e0b' },
        'Moon':    { abbr: 'Mo', color: '#f8fafc' },
        'Mars':    { abbr: 'Ma', color: '#ef4444' },
        'Mercury': { abbr: 'Me', color: '#34d399' },
        'Jupiter': { abbr: 'Ju', color: '#fbbf24' },
        'Venus':   { abbr: 'Ve', color: '#f472b6' },
        'Saturn':  { abbr: 'Sa', color: '#60a5fa' },
        'Rahu':    { abbr: 'Ra', color: '#c084fc' },
        'Ketu':    { abbr: 'Ke', color: '#2dd4bf' }
    };

    let items = [];
    
    // Always mark Lagna (Lg) in House 1
    if (houseNum === 1) {
        items.push({ text: 'Lg', color: '#ffd700' });
    }

    if (planetsArray && Array.isArray(planetsArray)) {
        planetsArray.forEach(p => {
            let nameStr = typeof p === 'string' ? p.split(' ')[0] : p.name;
            let mapped = abbrevMap[nameStr] || { abbr: nameStr.substring(0, 2), color: '#e0e7ff' };
            let label = mapped.abbr;
            if (p.isRetrograde) label += '(R)';
            if (p.isVargottama) label += '⭐';
            items.push({ text: label, color: mapped.color });
        });
    }

    if (items.length === 0) return '';

    if (items.length === 1) {
        return `<text x="${centerX}" y="${centerY}" fill="${items[0].color}" font-weight="700" font-size="12" text-anchor="middle">${items[0].text}</text>`;
    }

    if (items.length === 2) {
        return `
            <text x="${centerX}" y="${centerY - 7}" fill="${items[0].color}" font-weight="700" font-size="11.5" text-anchor="middle">${items[0].text}</text>
            <text x="${centerX}" y="${centerY + 8}" fill="${items[1].color}" font-weight="700" font-size="11.5" text-anchor="middle">${items[1].text}</text>
        `;
    }

    if (items.length === 3) {
        return `
            <text x="${centerX}" y="${centerY - 13}" fill="${items[0].color}" font-weight="700" font-size="11" text-anchor="middle">${items[0].text}</text>
            <text x="${centerX}" y="${centerY + 1}" fill="${items[1].color}" font-weight="700" font-size="11" text-anchor="middle">${items[1].text}</text>
            <text x="${centerX}" y="${centerY + 15}" fill="${items[2].color}" font-weight="700" font-size="11" text-anchor="middle">${items[2].text}</text>
        `;
    }

    let line1 = items.slice(0, Math.ceil(items.length / 2));
    let line2 = items.slice(Math.ceil(items.length / 2));

    let tspan1 = line1.map(it => `<tspan fill="${it.color}">${it.text}</tspan>`).join(' ');
    let tspan2 = line2.map(it => `<tspan fill="${it.color}">${it.text}</tspan>`).join(' ');

    return `
        <text x="${centerX}" y="${centerY - 7}" font-weight="700" font-size="10.5" text-anchor="middle">${tspan1}</text>
        <text x="${centerX}" y="${centerY + 8}" font-weight="700" font-size="10.5" text-anchor="middle">${tspan2}</text>
    `;
}

/**
 * Interactive Modal Popup when user clicks any House in Kundli SVG
 */
window.showHouseDetailModal = function(houseNum) {
    if (!window.activeKundliChart) return;
    const houseInfo = window.activeKundliChart.houses.find(h => h.house === houseNum);
    if (!houseInfo) return;

    const modal = document.getElementById('calc-modal-overlay');
    const body = document.getElementById('calc-modal-body');
    if (!modal || !body) return;

    let planetsListHTML = houseInfo.planets.length > 0 
        ? houseInfo.planets.map(p => `<li><strong>${p.symbol || ''} ${p.name || p}</strong> (${p.sanskrit || ''}) — ${p.degree || ''}</li>`).join('')
        : '<em>No Grahas placed in this house at birth.</em>';

    body.innerHTML = `
        <h3 style="color: var(--gold-light); margin-bottom: 0.4rem;">House ${houseInfo.house} Breakdown</h3>
        <p style="font-size: 0.88rem; color: var(--gold-primary); margin-bottom: 1rem;">${houseInfo.bhavaName}</p>
        
        <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1.25rem; font-size: 0.9rem;">
            <p><strong>Placed Rashi:</strong> ${houseInfo.rashiName} (${houseInfo.rashiSanskrit || ''}) — Sign #${houseInfo.rashiId}</p>
            <p><strong>Rashi Ruler:</strong> ${houseInfo.rashiRuler || 'N/A'}</p>
        </div>

        <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">Grahas (Planets) in House ${houseInfo.house}:</h4>
        <ul style="padding-left: 1.25rem; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.8;">
            ${planetsListHTML}
        </ul>
    `;

    modal.classList.add('active');
};

/**
 * Universal Calculation Breakdown Modal Handler for Viva Presentation
 */
window.showCalculationStepsModal = function(keyOrTitle, stepsArray = null) {
    const modal = document.getElementById('calc-modal-overlay');
    const body = document.getElementById('calc-modal-body');
    if (!modal || !body) return;

    let steps = [];
    let title = "Calculation Steps";

    const data = window.currentProfileData;
    const core = data ? data.coreProfile : null;
    const num = data ? data.numerology : null;

    if (keyOrTitle === 'rashi' && core && core.rashi) {
        title = "Rashi (Moon Sign) Calculation";
        steps = core.rashi.calculationSteps || [];
    } else if (keyOrTitle === 'nakshatra' && core && core.nakshatra) {
        title = "Nakshatra Calculation";
        steps = core.nakshatra.calculationSteps || [];
    } else if (keyOrTitle === 'pada' && core && core.pada) {
        title = "Pada (Quarter) Calculation";
        steps = core.pada.calculationSteps || [];
    } else if (keyOrTitle === 'nakshatraLord' && core && core.nakshatraLord) {
        title = "Nakshatra Lord Mapping";
        steps = core.nakshatraLord.calculationSteps || [];
    } else if (keyOrTitle === 'paya' && core && core.paya) {
        title = "Paya Metal Rule";
        steps = core.paya.calculationSteps || [];
    } else if (keyOrTitle === 'lagna' && core && core.lagna) {
        title = "Lagna (Ascendant) Calculation";
        steps = core.lagna.calculationSteps || [];
    } else if (keyOrTitle === 'mulank' && num && num.mulankData) {
        title = "Mulank (Birth Number) Calculation";
        steps = num.mulankData.steps || [];
    } else if (keyOrTitle === 'bhagyank' && num && num.bhagyankData) {
        title = "Bhagyank (Destiny Number) Calculation";
        steps = num.bhagyankData.steps || [];
    } else if (keyOrTitle === 'nameNumber' && num && num.nameNumberData) {
        title = "Name Number Calculation";
        steps = num.nameNumberData.steps || [];
    } else if (Array.isArray(stepsArray)) {
        title = keyOrTitle || "Calculation Steps";
        steps = stepsArray;
    } else if (Array.isArray(keyOrTitle)) {
        steps = keyOrTitle;
    }

    if (!steps || steps.length === 0) {
        steps = ["Calculation pipeline executed using VSOP87 Sidereal Astrological Engine."];
    }

    let stepsHTML = steps.map((s, idx) => `
        <div style="background: rgba(255, 255, 255, 0.04); border-left: 3px solid var(--gold-primary); padding: 0.75rem 1rem; margin-bottom: 0.75rem; border-radius: 4px;">
            <span style="font-size: 0.75rem; color: var(--gold-light); display: block; margin-bottom: 2px;">Step ${idx + 1}</span>
            <code style="font-size: 0.92rem; color: var(--text-primary); font-family: monospace;">${typeof s === 'object' ? JSON.stringify(s) : s}</code>
        </div>
    `).join('');

    body.innerHTML = `
        <h3 style="color: var(--gold-light); margin-bottom: 0.3rem;">How was this calculated?</h3>
        <p style="font-size: 0.88rem; color: var(--gold-primary); margin-bottom: 1.25rem;">${title} — Mathematical & Rule-Engine Pipeline</p>
        ${stepsHTML}
    `;

    modal.style.display = 'flex';
    void modal.offsetWidth;
    modal.classList.add('active');
};

function attachCardExpandListeners() {
    const buttons = document.querySelectorAll('.card-expand-toggle');
    buttons.forEach(btn => {
        // Prevent duplicate listener registration
        btn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const card = btn.closest('.profile-card, .glass-card');
            if (card) {
                const content = card.querySelector('.card-expandable-content');
                if (content) {
                    content.classList.toggle('open');
                    const isOpen = content.classList.contains('open');
                    btn.innerHTML = isOpen ? 'Show less ▲' : 'Learn more ▼';
                }
            }
        };
    });
}

window.attachCardExpandListeners = attachCardExpandListeners;
