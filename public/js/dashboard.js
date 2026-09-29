/**
 * RashmiSutra - Dashboard Page Controller
 * Author: Rashmi Pandey
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check if birth data exists in session storage
    const savedData = sessionStorage.getItem('jyotishsetu_birth_data');
    
    if (savedData) {
        const formData = JSON.parse(savedData);
        loadFullProfile(formData);
    } else {
        // Default demo profile load
        const demoData = {
            name: "Rahul Sharma",
            dob: "2004-08-15",
            birthTime: "10:30",
            birthPlace: "Deoghar, Jharkhand, India",
            gender: "Male",
            latitude: 24.4826,
            longitude: 86.6961
        };
        loadFullProfile(demoData);
    }
});

let currentProfileData = null;
let activeVargaCode = 'D1';

async function loadFullProfile(formData) {
    const loadingBanner = document.getElementById('dashboard-loading');
    const contentBox = document.getElementById('dashboard-content');

    if (loadingBanner) loadingBanner.style.display = 'block';
    if (contentBox) contentBox.style.display = 'none';

    try {
        const response = await fetch('/api/calculate/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.success) {
            currentProfileData = data;
            renderUserBanner(data.userMeta, data.methodologyMeta);
            renderCoreCards(data.coreProfile);
            renderPlanetaryTable(data.planetaryPositions);
            renderPlanetaryAspectsTable(data.planetaryAspects);
            
            // Render Varga Charts Selector & Kundli Chart
            renderVargaSelector(data.vargaCharts, data.vargottamaPlanets);
            renderSelectedVargaChart('D1');

            // Render Vedic Yogas & Life Benefits
            renderYogasSection(data.yogas, 'yogas-section-container');

            renderDashaSection(data.dasha, 'dasha-section-container');
            renderNumerologySummary(data.numerology);

            if (loadingBanner) loadingBanner.style.display = 'none';
            if (contentBox) contentBox.style.display = 'block';

            attachCardExpandListeners();
        } else {
            alert(data.message || "Could not calculate profile.");
        }
    } catch (err) {
        console.error("Failed to load profile:", err);
        alert("Failed to connect to backend server.");
    }
}

function renderUserBanner(meta, methodology) {
    const el = document.getElementById('user-banner-container');
    if (!el) return;

    el.innerHTML = `
        <div class="user-profile-banner">
            <div class="user-banner-info">
                <h2>Vedic Birth Profile for <span class="gold-text">${meta.name}</span></h2>
                <div class="user-meta-chips" style="margin-bottom: 0.5rem;">
                    <span class="meta-chip">📅 Date: ${meta.dob}</span>
                    <span class="meta-chip">⏰ Time: ${meta.birthTime}</span>
                    <span class="meta-chip">📍 Place: ${meta.birthPlace}</span>
                    <span class="meta-chip">🌐 Coordinates: ${meta.latitude}°, ${meta.longitude}°</span>
                </div>
                <div class="user-meta-chips">
                    <span class="meta-chip" style="color: var(--gold-light);">Zodiac: ${methodology.zodiac}</span>
                    <span class="meta-chip" style="color: var(--gold-light);">Ayanamsha: ${methodology.ayanamsha}</span>
                    <span class="meta-chip" style="color: var(--gold-light);">Dasha: ${methodology.dashaSystem}</span>
                </div>
            </div>
            <div class="no-print" style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                <button id="saveProfileBtn" class="btn btn-secondary btn-sm" onclick="saveCurrentProfile()">💾 Save Report</button>
                <button class="btn btn-primary btn-sm" onclick="window.print()">🖨️ Print / Download Report</button>
            </div>
        </div>
    `;
}

function renderCoreCards(core) {
    const grid = document.getElementById('core-cards-grid');
    if (!grid) return;

    const cardsHTML = `
        <!-- 1. Rashi Card -->
        <div class="profile-card">
            <span class="card-header-icon">🌙</span>
            <span class="card-label">Rashi (Moon Sign)</span>
            <div class="card-value">${core.rashi.name}</div>
            <div class="card-subtext">${core.rashi.sanskrit} | Ruled by ${core.rashi.ruler}</div>
            
            <div style="display: flex; gap: 0.5rem; margin-top: auto;">
                <button class="card-expand-toggle">Learn more ▼</button>
                <button class="btn btn-secondary btn-sm" style="font-size:0.75rem; padding: 0.2rem 0.6rem;" onclick='showCalculationStepsModal("Rashi Calculation", ${JSON.stringify(core.rashi.calculationSteps)})'>🧮 View Math</button>
            </div>
            
            <div class="card-expandable-content">
                <p><strong>Element:</strong> ${core.rashi.element}</p>
                <p><strong>Degree:</strong> ${core.rashi.degree}</p>
                <p>${core.rashi.description}</p>
            </div>
        </div>

        <!-- 2. Nakshatra Card -->
        <div class="profile-card">
            <span class="card-header-icon">✨</span>
            <span class="card-label">Nakshatra</span>
            <div class="card-value">${core.nakshatra.name}</div>
            <div class="card-subtext">${core.nakshatra.sanskrit} | Deity: ${core.nakshatra.deity.split(' ')[0]}</div>
            
            <div style="display: flex; gap: 0.5rem; margin-top: auto;">
                <button class="card-expand-toggle">Learn more ▼</button>
                <button class="btn btn-secondary btn-sm" style="font-size:0.75rem; padding: 0.2rem 0.6rem;" onclick='showCalculationStepsModal("Nakshatra Calculation", ${JSON.stringify(core.nakshatra.calculationSteps)})'>🧮 View Math</button>
            </div>
            
            <div class="card-expandable-content">
                <p><strong>Nakshatra Lord:</strong> ${core.nakshatra.lord}</p>
                <p><strong>Symbol:</strong> ${core.nakshatra.symbol}</p>
                <p>${core.nakshatra.characteristics}</p>
            </div>
        </div>

        <!-- 3. Pada Card -->
        <div class="profile-card">
            <span class="card-header-icon">🧩</span>
            <span class="card-label">Pada (Quarter)</span>
            <div class="card-value">Pada ${core.pada.number}</div>
            <div class="card-subtext">Quarter ${core.pada.number} (${core.pada.elapsedFormatted} in Nakshatra)</div>
            
            <div style="display: flex; gap: 0.5rem; margin-top: auto;">
                <button class="card-expand-toggle">Learn more ▼</button>
                <button class="btn btn-secondary btn-sm" style="font-size:0.75rem; padding: 0.2rem 0.6rem;" onclick='showCalculationStepsModal("Pada Calculation", ${JSON.stringify(core.pada.calculationSteps)})'>🧮 View Math</button>
            </div>

            <div class="card-expandable-content">
                <p>Each Nakshatra is divided into 4 Padas of 3°20' (3.3333°) each. Pada ${core.pada.number} refines micro-level psychological and navigational traits.</p>
            </div>
        </div>

        <!-- 4. Nakshatra Lord Card -->
        <div class="profile-card">
            <span class="card-header-icon">👑</span>
            <span class="card-label">Nakshatra Lord</span>
            <div class="card-value">${core.nakshatraLord.name}</div>
            <div class="card-subtext">Governing Graha of Birth Nakshatra</div>
            
            <div style="display: flex; gap: 0.5rem; margin-top: auto;">
                <button class="card-expand-toggle">Learn more ▼</button>
                <button class="btn btn-secondary btn-sm" style="font-size:0.75rem; padding: 0.2rem 0.6rem;" onclick='showCalculationStepsModal("Nakshatra Lord Mapping", ${JSON.stringify(core.nakshatraLord.calculationSteps)})'>🧮 View Math</button>
            </div>

            <div class="card-expandable-content">
                <p>${core.nakshatraLord.name} dictates your starting Vimshottari Mahadasha at birth and foundational life themes.</p>
            </div>
        </div>

        <!-- 5. Paya Card -->
        <div class="profile-card">
            <span class="card-header-icon">🏛️</span>
            <span class="card-label">Paya (Foundation)</span>
            <div class="card-value">${core.paya.symbol.split(' ')[0]} ${core.paya.name.split(' ')[0]}</div>
            <div class="card-subtext">${core.paya.name}</div>
            
            <div style="display: flex; gap: 0.5rem; margin-top: auto;">
                <button class="card-expand-toggle">Learn more ▼</button>
                <button class="btn btn-secondary btn-sm" style="font-size:0.75rem; padding: 0.2rem 0.6rem;" onclick='showCalculationStepsModal("Paya Metal Rule", ${JSON.stringify(core.paya.calculationSteps)})'>🧮 View Math</button>
            </div>

            <div class="card-expandable-content">
                <p>${core.paya.traditionalMeaning}</p>
                <p style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">Basis: ${core.paya.calculationBasis}</p>
            </div>
        </div>

        <!-- 6. Lagna Card -->
        <div class="profile-card">
            <span class="card-header-icon">🌅</span>
            <span class="card-label">Lagna (Ascendant)</span>
            <div class="card-value">${core.lagna.name}</div>
            <div class="card-subtext">${core.lagna.sanskrit} (${core.lagna.degree})</div>
            
            <div style="display: flex; gap: 0.5rem; margin-top: auto;">
                <button class="card-expand-toggle">Learn more ▼</button>
                <button class="btn btn-secondary btn-sm" style="font-size:0.75rem; padding: 0.2rem 0.6rem;" onclick='showCalculationStepsModal("Lagna Calculation", ${JSON.stringify(core.lagna.calculationSteps)})'>🧮 View Math</button>
            </div>

            <div class="card-expandable-content">
                <p>The eastern horizon sign rising at birth. Establishes the 1st House of your Kundli grid.</p>
            </div>
        </div>

        <!-- 7. Sun Sign Card -->
        <div class="profile-card">
            <span class="card-header-icon">☀️</span>
            <span class="card-label">Sun Sign (Surya Rashi)</span>
            <div class="card-value">${core.sunSign.name}</div>
            <div class="card-subtext">${core.sunSign.sanskrit} (${core.sunSign.degree})</div>
            <button class="card-expand-toggle" style="margin-top: auto;">Learn more ▼</button>
            <div class="card-expandable-content">
                <p>Represents soul purpose, core vitality, and self-realization trajectory.</p>
            </div>
        </div>

        <!-- 8. Moon Sign Card -->
        <div class="profile-card">
            <span class="card-header-icon">🌕</span>
            <span class="card-label">Moon Sign (Janma Rashi)</span>
            <div class="card-value">${core.moonSign.name}</div>
            <div class="card-subtext">${core.moonSign.sanskrit} (${core.moonSign.degree})</div>
            <button class="card-expand-toggle" style="margin-top: auto;">Learn more ▼</button>
            <div class="card-expandable-content">
                <p>Represents emotional mind (Manas), intuition, memory, and instinctual nature.</p>
            </div>
        </div>
    `;

    grid.innerHTML = cardsHTML;
}

function renderPlanetaryTable(planets) {
    const tbody = document.getElementById('planetary-table-body');
    if (!tbody) return;

    let rowsHTML = '';
    planets.forEach(p => {
        const combustBadge = p.isCombust ? `<span class="meta-chip" style="color:#f87171; border-color:rgba(248,113,113,0.4);">Combust (${p.combustDiff}°)</span>` : '';
        const retroBadge = p.isRetrograde ? `<span class="meta-chip" style="color:#a855f7; border-color:rgba(168,85,247,0.4);">Retrograde (Vakra)</span>` : '';

        rowsHTML += `
            <tr>
                <td>
                    <strong>${p.symbol} ${p.planet}</strong> (${p.sanskrit})
                    <div style="margin-top: 2px;">${combustBadge} ${retroBadge}</div>
                </td>
                <td><span class="gold-text">${p.sign}</span> (${p.signSanskrit})</td>
                <td>${p.degree}</td>
                <td>House ${p.house}</td>
                <td><span style="font-size: 0.85rem; color: var(--gold-light);">${p.dignity}</span></td>
            </tr>
        `;
    });

    tbody.innerHTML = rowsHTML;
}

function renderPlanetaryAspectsTable(aspects) {
    const el = document.getElementById('planetary-aspects-container');
    if (!el || !aspects) return;

    let rows = aspects.map(a => `
        <tr>
            <td><strong>${a.symbol} ${a.planet}</strong></td>
            <td>House ${a.sourceHouse}</td>
            <td>Aspects Houses: <strong class="gold-text">${a.targetHouses.map(h => `House ${h}`).join(', ')}</strong></td>
        </tr>
    `).join('');

    el.innerHTML = `
        <div class="glass-card" style="margin-bottom: 3.5rem;">
            <h3 style="color: var(--gold-light); margin-bottom: 0.5rem;">Graha Drishti (Planetary Aspects)</h3>
            <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
                All Grahas cast a 7th house aspect. Mars (4th, 7th, 8th), Jupiter (5th, 7th, 9th), and Saturn (3rd, 7th, 10th) cast special Parashari aspects.
            </p>
            <div class="planetary-table-container">
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th>Graha (Planet)</th>
                            <th>Placed House</th>
                            <th>Aspected Houses (Graha Drishti)</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        </div>
    `;
}

function renderVargaSelector(vargaCharts, vargottamaPlanets) {
    const el = document.getElementById('varga-selector-container');
    if (!el || !vargaCharts) return;

    let vargottamaBadgeHTML = '';
    if (vargottamaPlanets && vargottamaPlanets.length > 0) {
        vargottamaBadgeHTML = `
            <div style="margin-bottom: 1.25rem; background: rgba(212, 175, 55, 0.1); border: 1px solid var(--gold-border); border-radius: var(--radius-sm); padding: 0.75rem 1.25rem; display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-size: 1.2rem;">🌟</span>
                <span style="font-size: 0.9rem;"><strong>Vargottama Grahas:</strong> ${vargottamaPlanets.join(', ')} occupy the exact same sign in D1 (Rashi) and D9 (Navamsha), granting exceptional inner strength.</span>
            </div>
        `;
    }

    el.innerHTML = `
        ${vargottamaBadgeHTML}
        <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1.5rem;">
            <button class="btn btn-secondary varga-tab-btn active" onclick="switchVargaChart('D1')">D1 — Rashi</button>
            <button class="btn btn-secondary varga-tab-btn" onclick="switchVargaChart('D4')">D4 — Chaturthamsha</button>
            <button class="btn btn-secondary varga-tab-btn" onclick="switchVargaChart('D9')">D9 — Navamsha</button>
            <button class="btn btn-secondary varga-tab-btn" onclick="switchVargaChart('D10')">D10 — Dashamsha</button>
        </div>
        <div id="varga-info-box" style="text-align: center; margin-bottom: 1rem;"></div>
    `;
}

window.switchVargaChart = function(vargaCode) {
    if (!currentProfileData || !currentProfileData.vargaCharts) return;
    
    activeVargaCode = vargaCode;

    // Update active tab buttons
    const btns = document.querySelectorAll('.varga-tab-btn');
    btns.forEach(b => {
        if (b.textContent.startsWith(vargaCode)) {
            b.classList.add('active');
            b.style.borderColor = 'var(--gold-primary)';
            b.style.color = 'var(--gold-light)';
        } else {
            b.classList.remove('active');
            b.style.borderColor = 'var(--gold-border)';
            b.style.color = 'var(--text-primary)';
        }
    });

    renderSelectedVargaChart(vargaCode);
};

function renderSelectedVargaChart(vargaCode) {
    if (!currentProfileData || !currentProfileData.vargaCharts) return;
    const vargaObj = currentProfileData.vargaCharts[vargaCode];
    if (!vargaObj) return;

    const infoBox = document.getElementById('varga-info-box');
    if (infoBox) {
        infoBox.innerHTML = `
            <h3 style="color: var(--gold-light);">${vargaObj.title}</h3>
            <p style="font-size: 0.9rem; max-width: 750px; margin: 0.3rem auto 0 auto;">${vargaObj.description}</p>
        `;
    }

    renderKundliSVG(vargaObj, 'kundli-chart-container');
}

function renderNumerologySummary(num) {
    const grid = document.getElementById('numerology-summary-grid');
    if (!grid) return;

    grid.innerHTML = `
        <div class="glass-card text-center">
            <div class="num-card-badge">${num.mulank}</div>
            <h3>Mulank (Birth Number)</h3>
            <p style="font-size: 0.9rem; margin: 0.3rem 0 0.85rem 0;">${num.mulankData.profile.title}</p>
            <button class="btn btn-secondary btn-sm" onclick='showCalculationStepsModal("Mulank Calculation", ${JSON.stringify(num.mulankData.steps)})'>🧮 View Reduction Steps</button>
        </div>
        <div class="glass-card text-center">
            <div class="num-card-badge">${num.bhagyank}</div>
            <h3>Bhagyank (Life Path / Destiny)</h3>
            <p style="font-size: 0.9rem; margin: 0.3rem 0 0.85rem 0;">${num.bhagyankData.profile.title}</p>
            <button class="btn btn-secondary btn-sm" onclick='showCalculationStepsModal("Bhagyank Calculation", ${JSON.stringify(num.bhagyankData.steps)})'>🧮 View Reduction Steps</button>
        </div>
        <div class="glass-card text-center">
            <div class="num-card-badge">${num.nameNumber}</div>
            <h3>Name Number</h3>
            <p style="font-size: 0.9rem; margin: 0.3rem 0 0.85rem 0;">${num.nameNumberData.profile.title}</p>
            <button class="btn btn-secondary btn-sm" onclick='showCalculationStepsModal("Name Number Calculation", ${JSON.stringify(num.nameNumberData.steps)})'>🧮 View Letter Mapping</button>
        </div>
    `;
}

window.saveCurrentProfile = async function() {
    if (!currentProfileData) return;

    const payload = {
        name: currentProfileData.userMeta.name,
        dob: currentProfileData.userMeta.dob,
        birthTime: currentProfileData.userMeta.birthTime,
        birthPlace: currentProfileData.userMeta.birthPlace,
        gender: currentProfileData.userMeta.gender,
        latitude: currentProfileData.userMeta.latitude,
        longitude: currentProfileData.userMeta.longitude,
        rashi: currentProfileData.coreProfile.rashi.name,
        nakshatra: currentProfileData.coreProfile.nakshatra.name,
        pada: currentProfileData.coreProfile.pada.number,
        paya: currentProfileData.coreProfile.paya.name,
        lagna: currentProfileData.coreProfile.lagna.name,
        numerology: {
            mulank: currentProfileData.numerology.mulank,
            bhagyank: currentProfileData.numerology.bhagyank,
            nameNumber: currentProfileData.numerology.nameNumber
        }
    };

    try {
        const res = await fetch('/api/profile/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await res.json();
        if (result.success) {
            alert(`✅ ${result.message}`);
        } else {
            alert(`❌ Could not save: ${result.message}`);
        }
    } catch (err) {
        alert("Failed to connect to database API.");
    }
};

/**
 * Renders Vedic Yogas & Life Benefits Section
 */
function renderYogasSection(yogas, containerId = 'yogas-section-container') {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!yogas || yogas.length === 0) {
        container.innerHTML = `
            <div class="glass-card text-center" style="padding: 2rem; margin-bottom: 3rem;">
                <p style="color: var(--text-secondary); margin: 0;">No prominent classical Yogas detected in the primary birth chart. General planetary aspects apply.</p>
            </div>
        `;
        return;
    }

    let cardsHTML = yogas.map(y => `
        <div class="glass-card" style="margin-bottom: 1.25rem; border-left: 4px solid var(--gold-primary); background: rgba(14, 21, 38, 0.75);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.5rem;">
                <h3 style="color: var(--gold-light); font-size: 1.2rem; margin: 0;">${y.title}</h3>
                <span class="meta-chip" style="color: var(--gold-light); border-color: var(--gold-border);">${y.category}</span>
            </div>
            
            <p style="font-size: 0.88rem; color: var(--gold-primary); margin-bottom: 0.75rem;">
                <strong>Forming Planets:</strong> ${y.formingPlanets.join(', ')}
            </p>

            <p style="font-size: 0.92rem; color: var(--text-primary); margin-bottom: 0.75rem; line-height: 1.6;">
                <strong>Condition:</strong> ${y.description}
            </p>

            <div style="background: rgba(212, 175, 55, 0.08); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: var(--radius-sm); padding: 0.85rem 1rem; margin-bottom: 0.5rem;">
                <p style="font-size: 0.9rem; color: var(--text-primary); margin: 0; line-height: 1.6;">
                    <strong style="color: var(--gold-light);">✨ Life Benefits & Effects:</strong> ${y.benefit}
                </p>
            </div>

            <p style="font-size: 0.78rem; color: var(--text-muted); margin: 0;">
                <em>Rule Engine Basis:</em> ${y.calculationRule}
            </p>
        </div>
    `).join('');

    container.innerHTML = cardsHTML;
}
