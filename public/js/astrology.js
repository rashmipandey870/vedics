/**
 * RashmiSutra - Frontend Astrology Rendering & Calculation Details Engine
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

    // Coordinate mapping for 12 Houses in North Indian Diamond Kundli
    const houseCoords = {
        1:  { rashiX: 200, rashiY: 90,  planetsX: 200, planetsY: 130 },
        2:  { rashiX: 110, rashiY: 45,  planetsX: 110, planetsY: 75  },
        3:  { rashiX: 45,  rashiY: 110, planetsX: 75,  planetsY: 110 },
        4:  { rashiX: 100, rashiY: 200, planetsX: 120, planetsY: 230 },
        5:  { rashiX: 45,  rashiY: 290, planetsX: 75,  planetsY: 290 },
        6:  { rashiX: 110, rashiY: 355, planetsX: 110, planetsY: 325 },
        7:  { rashiX: 200, rashiY: 310, planetsX: 200, planetsY: 270 },
        8:  { rashiX: 290, rashiY: 355, planetsX: 290, planetsY: 325 },
        9:  { rashiX: 355, rashiY: 290, planetsX: 325, planetsY: 290 },
        10: { rashiX: 300, rashiY: 200, planetsX: 280, planetsY: 230 },
        11: { rashiX: 355, rashiY: 110, planetsX: 325, planetsY: 110 },
        12: { rashiX: 290, rashiY: 45,  planetsX: 290, planetsY: 75  }
    };

    let houseElements = '';

    kundliChart.houses.forEach(h => {
        const coords = houseCoords[h.house];
        const planetList = h.planets.map(p => typeof p === 'string' ? p.split(' ')[0] : p.symbol + p.name).join(' ');

        houseElements += `
            <g class="kundli-house-group" onclick="showHouseDetailModal(${h.house})" style="cursor: pointer;">
                <text x="${coords.rashiX}" y="${coords.rashiY}" class="kundli-rashi-num">${h.rashiId}</text>
                <text x="${coords.planetsX}" y="${coords.planetsY}" class="kundli-planet-tag">${planetList}</text>
            </g>
        `;
    });

    const svgHTML = `
        <div class="kundli-svg-container">
            <svg viewBox="0 0 400 400" class="kundli-svg" xmlns="http://www.w3.org/2000/svg">
                <!-- Outer Square -->
                <rect x="10" y="10" width="380" height="380" fill="none" stroke="#d4af37" stroke-width="2"/>
                
                <!-- Diagonals -->
                <line x1="10" y1="10" x2="390" y2="390" stroke="#d4af37" stroke-width="1.5"/>
                <line x1="390" y1="10" x2="10" y2="390" stroke="#d4af37" stroke-width="1.5"/>
                
                <!-- Inner Diamond -->
                <polygon points="200,10 390,200 200,390 10,200" fill="none" stroke="#d4af37" stroke-width="1.5"/>
                
                <!-- House Numbers & Planet Overlay -->
                ${houseElements}
            </svg>
        </div>
    `;

    container.innerHTML = svgHTML;
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
window.showCalculationStepsModal = function(title, stepsArray) {
    const modal = document.getElementById('calc-modal-overlay');
    const body = document.getElementById('calc-modal-body');
    if (!modal || !body || !stepsArray) return;

    let stepsHTML = stepsArray.map((s, idx) => `
        <div style="background: rgba(255, 255, 255, 0.03); border-left: 3px solid var(--gold-primary); padding: 0.75rem 1rem; margin-bottom: 0.75rem; border-radius: 4px;">
            <span style="font-size: 0.75rem; color: var(--gold-light); display: block; margin-bottom: 2px;">Step ${idx + 1}</span>
            <code style="font-size: 0.92rem; color: var(--text-primary); font-family: monospace;">${s}</code>
        </div>
    `).join('');

    body.innerHTML = `
        <h3 style="color: var(--gold-light); margin-bottom: 0.3rem;">How was this calculated?</h3>
        <p style="font-size: 0.88rem; color: var(--gold-primary); margin-bottom: 1.25rem;">${title} — Mathematical & Rule-Engine Pipeline</p>
        ${stepsHTML}
    `;

    modal.classList.add('active');
};

function attachCardExpandListeners() {
    const buttons = document.querySelectorAll('.card-expand-toggle');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            if (content) {
                content.classList.toggle('open');
                const isOpen = content.classList.contains('open');
                btn.innerHTML = isOpen ? 'Show less ▲' : 'Learn more ▼';
            }
        });
    });
}
