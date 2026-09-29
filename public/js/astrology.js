/**
 * JyotishSetu - Astrology Rendering Utilities
 * Renders Core Profile Cards and North Indian Style Kundli SVG Chart
 */

/**
 * Renders North Indian Style Kundli Chart (SVG)
 * Input: kundliChart object containing lagnaRashiId and houses array
 * Output: SVG string inserted into target element
 */
function renderKundliSVG(kundliChart, targetElementId = 'kundli-chart-container') {
    const container = document.getElementById(targetElementId);
    if (!container || !kundliChart) return;

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
        const planetList = h.planets.map(p => p.split(' ')[0]).join(' ');

        houseElements += `
            <text x="${coords.rashiX}" y="${coords.rashiY}" class="kundli-rashi-num">${h.rashiId}</text>
            <text x="${coords.planetsX}" y="${coords.planetsY}" class="kundli-planet-tag">${planetList}</text>
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
 * Formats expandable card toggle handlers
 */
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
