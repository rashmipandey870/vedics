/**
 * JyotishSetu - Main Dashboard Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check if birth data exists in session storage
    const savedData = sessionStorage.getItem('jyotishsetu_birth_data');
    
    if (savedData) {
        const formData = JSON.parse(savedData);
        loadFullProfile(formData);
    } else {
        // Default demo load if visited directly
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

    // Attach Event Listener for Save Profile Button
    const saveBtn = document.getElementById('saveProfileBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveCurrentProfile);
    }

    // Attach Event Listener for Print Button
    const printBtn = document.getElementById('printProfileBtn');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }
});

let currentProfileData = null; // Store fetched result globally for save action

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
            renderUserBanner(data.userMeta);
            renderCoreCards(data.coreProfile);
            renderPlanetaryTable(data.planetaryPositions);
            renderKundliSVG(data.kundliChart, 'kundli-chart-container');
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

function renderUserBanner(meta) {
    const el = document.getElementById('user-banner-container');
    if (!el) return;

    el.innerHTML = `
        <div class="user-profile-banner">
            <div class="user-banner-info">
                <h2>Vedic Birth Profile for <span class="gold-text">${meta.name}</span></h2>
                <div class="user-meta-chips">
                    <span class="meta-chip">📅 Date: ${meta.dob}</span>
                    <span class="meta-chip">⏰ Time: ${meta.birthTime}</span>
                    <span class="meta-chip">📍 Place: ${meta.birthPlace}</span>
                    <span class="meta-chip">🌐 Coordinates: ${meta.latitude}°, ${meta.longitude}°</span>
                </div>
            </div>
            <div class="no-print" style="display: flex; gap: 0.75rem;">
                <button id="saveProfileBtn" class="btn btn-secondary btn-sm">💾 Save Report</button>
                <button id="printProfileBtn" class="btn btn-primary btn-sm" onclick="window.print()">🖨️ Print / Download Report</button>
            </div>
        </div>
    `;

    // Re-attach save event after dynamic render
    document.getElementById('saveProfileBtn').addEventListener('click', saveCurrentProfile);
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
            <button class="card-expand-toggle">Learn more ▼</button>
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
            <div class="card-subtext">${core.nakshatra.sanskrit} | Deity: ${core.nakshatra.deity}</div>
            <button class="card-expand-toggle">Learn more ▼</button>
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
            <div class="card-value">Pada ${core.pada}</div>
            <div class="card-subtext">Quarter ${core.pada} of ${core.nakshatra.name}</div>
            <button class="card-expand-toggle">Learn more ▼</button>
            <div class="card-expandable-content">
                <p>Each Nakshatra is divided into 4 Padas of 3°20' each. Pada ${core.pada} refines micro-level psychological and navigational traits.</p>
            </div>
        </div>

        <!-- 4. Nakshatra Lord Card -->
        <div class="profile-card">
            <span class="card-header-icon">👑</span>
            <span class="card-label">Nakshatra Lord</span>
            <div class="card-value">${core.nakshatraLord}</div>
            <div class="card-subtext">Governing Graha of Birth Nakshatra</div>
            <button class="card-expand-toggle">Learn more ▼</button>
            <div class="card-expandable-content">
                <p>${core.nakshatraLord} dictates your starting Vimshottari Mahadasha at birth and foundational life themes.</p>
            </div>
        </div>

        <!-- 5. Paya Card -->
        <div class="profile-card">
            <span class="card-header-icon">🏛️</span>
            <span class="card-label">Paya (Foundation)</span>
            <div class="card-value">${core.paya.symbol.split(' ')[0]} ${core.paya.name.split(' ')[0]}</div>
            <div class="card-subtext">${core.paya.name}</div>
            <button class="card-expand-toggle">Learn more ▼</button>
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
            <button class="card-expand-toggle">Learn more ▼</button>
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
            <button class="card-expand-toggle">Learn more ▼</button>
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
            <button class="card-expand-toggle">Learn more ▼</button>
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
        rowsHTML += `
            <tr>
                <td><strong>${p.symbol} ${p.planet}</strong> (${p.sanskrit})</td>
                <td><span class="gold-text">${p.sign}</span> (${p.signSanskrit})</td>
                <td>${p.degree}</td>
                <td>House ${p.house}</td>
            </tr>
        `;
    });

    tbody.innerHTML = rowsHTML;
}

function renderNumerologySummary(num) {
    const grid = document.getElementById('numerology-summary-grid');
    if (!grid) return;

    grid.innerHTML = `
        <div class="glass-card text-center">
            <div class="num-card-badge">${num.mulank}</div>
            <h3>Mulank (Birth Number)</h3>
            <p style="font-size: 0.9rem; margin-top: 0.3rem;">${num.mulankProfile.title} | Ruled by ${num.mulankProfile.planet}</p>
        </div>
        <div class="glass-card text-center">
            <div class="num-card-badge">${num.bhagyank}</div>
            <h3>Bhagyank (Life Path)</h3>
            <p style="font-size: 0.9rem; margin-top: 0.3rem;">${num.bhagyankProfile.title} | Ruled by ${num.bhagyankProfile.planet}</p>
        </div>
        <div class="glass-card text-center">
            <div class="num-card-badge">${num.nameNumber}</div>
            <h3>Name Number</h3>
            <p style="font-size: 0.9rem; margin-top: 0.3rem;">${num.nameNumberProfile.title} | Ruled by ${num.nameNumberProfile.planet}</p>
        </div>
    `;
}

async function saveCurrentProfile() {
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
        pada: currentProfileData.coreProfile.pada,
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
}
