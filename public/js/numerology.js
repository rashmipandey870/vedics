/**
 * JeevanShaili - Dedicated Numerology Module Frontend Logic
 * Author: Rashmi Pandey
 */

document.addEventListener('DOMContentLoaded', () => {
    initNumerologyForm();
    initCompatibilityTool();
    loadTodayNumber();
});

let lastNumerologyResult = null;

function initNumerologyForm() {
    const form = document.getElementById('numerologyCalcForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('numName').value.trim();
        const dob = document.getElementById('numDob').value;
        const system = document.getElementById('numSystem').value;

        if (!dob) {
            alert("Please select a Date of Birth.");
            return;
        }

        try {
            const res = await fetch('/api/calculate/numerology', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, dob, system })
            });

            const data = await res.json();
            if (data.success) {
                lastNumerologyResult = data;
                renderNumerologyResults(data);
            }
        } catch (err) {
            alert("Error communicating with numerology server.");
        }
    });
}

function renderNumerologyResults(data) {
    const resultsBox = document.getElementById('numerology-results-box');
    if (!resultsBox) return;

    resultsBox.style.display = 'block';

    const { mulank, bhagyank, nameNumber } = data;

    resultsBox.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <h2>Your <span class="gold-text">Numerology Profile</span></h2>
            <p>Calculated using traditional mathematical digit reduction (${nameNumber.system.toUpperCase()} Mapping).</p>
        </div>

        <div class="numerology-highlights-grid">
            <!-- Mulank Card -->
            <div class="glass-card text-center">
                <div class="num-card-badge">${mulank.mulank}</div>
                <h3>Mulank (Birth Number)</h3>
                <p style="margin: 0.4rem 0;"><strong>${mulank.profile.title}</strong></p>
                <p style="font-size: 0.88rem; color: var(--gold-primary); margin-bottom: 1rem;">Ruled by ${mulank.graha.planet}</p>
                <button class="btn btn-secondary btn-sm" onclick="showCalculationModal('mulank')">Show Calculation Step-by-Step</button>
            </div>

            <!-- Bhagyank Card -->
            <div class="glass-card text-center">
                <div class="num-card-badge">${bhagyank.bhagyank}</div>
                <h3>Bhagyank (Destiny Number)</h3>
                <p style="margin: 0.4rem 0;"><strong>${bhagyank.profile.title}</strong></p>
                <p style="font-size: 0.88rem; color: var(--gold-primary); margin-bottom: 1rem;">Ruled by ${bhagyank.graha.planet}</p>
                <button class="btn btn-secondary btn-sm" onclick="showCalculationModal('bhagyank')">Show Calculation Step-by-Step</button>
            </div>

            <!-- Name Number Card -->
            <div class="glass-card text-center">
                <div class="num-card-badge">${nameNumber.nameNumber}</div>
                <h3>Name Number (${nameNumber.system.toUpperCase()})</h3>
                <p style="margin: 0.4rem 0;"><strong>${nameNumber.profile.title}</strong></p>
                <p style="font-size: 0.88rem; color: var(--gold-primary); margin-bottom: 1rem;">Ruled by ${nameNumber.graha.planet}</p>
                <button class="btn btn-secondary btn-sm" onclick="showCalculationModal('nameNumber')">Show Calculation Step-by-Step</button>
            </div>
        </div>
    `;

    resultsBox.scrollIntoView({ behavior: 'smooth' });
}

window.showCalculationModal = function(type) {
    if (!lastNumerologyResult) return;
    const item = lastNumerologyResult[type];
    if (!item || !item.steps) return;

    const modal = document.getElementById('calc-modal-overlay');
    const modalBody = document.getElementById('calc-modal-body');
    if (!modal || !modalBody) return;

    let stepsHTML = item.steps.map((s, idx) => `
        <div style="background: rgba(255,255,255,0.04); border-left: 3px solid var(--gold-primary); padding: 0.75rem 1rem; margin-bottom: 0.75rem; border-radius: 4px;">
            <span style="font-size: 0.75rem; color: var(--gold-light); display: block;">Step ${idx + 1}</span>
            <code style="font-size: 1rem; color: var(--text-primary);">${s}</code>
        </div>
    `).join('');

    modalBody.innerHTML = `
        <h3 style="color: var(--gold-light); margin-bottom: 0.5rem;">Step-by-Step Math Breakdown</h3>
        <p style="font-size: 0.9rem; margin-bottom: 1.25rem;">Transparent digit reduction process for demonstration.</p>
        ${stepsHTML}
    `;

    modal.classList.add('active');
};

window.closeCalcModal = function() {
    const modal = document.getElementById('calc-modal-overlay');
    if (modal) modal.classList.remove('active');
};

function initCompatibilityTool() {
    const btn = document.getElementById('checkCompatBtn');
    if (!btn) return;

    btn.addEventListener('click', async () => {
        const numA = document.getElementById('compatNumA').value;
        const numB = document.getElementById('compatNumB').value;

        if (!numA || !numB) {
            alert("Please select both birth numbers.");
            return;
        }

        try {
            const res = await fetch('/api/calculate/compatibility', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ numA, numB })
            });

            const data = await res.json();
            if (data.success) {
                const resBox = document.getElementById('compat-result-box');
                if (resBox) {
                    const c = data.compatibility;
                    resBox.innerHTML = `
                        <div class="glass-card" style="margin-top: 1.5rem;">
                            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 0.75rem;">
                                <h4 style="color: var(--gold-light); margin:0;">
                                    Number ${c.numA} (${c.grahaA.planet}) ⚡ Number ${c.numB} (${c.grahaB.planet})
                                </h4>
                                <span class="hero-subtitle-badge" style="margin:0;">${c.category}</span>
                            </div>
                            <p style="font-size: 0.92rem; margin-bottom: 0.75rem;">${c.description}</p>
                            <p style="font-size: 0.78rem; color: var(--text-muted); italic;">${c.disclaimer}</p>
                        </div>
                    `;
                }
            }
        } catch (err) {
            alert("Error assessing compatibility.");
        }
    });
}

async function loadTodayNumber() {
    const el = document.getElementById('today-number-container');
    if (!el) return;

    try {
        const res = await fetch('/api/calculate/numerology', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dob: new Date().toISOString().split('T')[0] })
        });
        const data = await res.json();
        if (data.success) {
            const t = data.todayNumber;
            el.innerHTML = `
                <div class="glass-card" style="display: flex; align-items: center; gap: 1.5rem;">
                    <div class="num-card-badge" style="width:60px; height:60px; font-size:1.8rem;">${t.todayNumber}</div>
                    <div>
                        <span class="card-label">Universal Day Number (${t.dateString})</span>
                        <h3 style="color: var(--gold-light); margin: 0.2rem 0;">${t.profile.title}</h3>
                        <p style="font-size: 0.88rem;">Ruled by ${t.graha.planet} | Theme: ${t.profile.themes}</p>
                    </div>
                </div>
            `;
        }
    } catch (e) {}
}
