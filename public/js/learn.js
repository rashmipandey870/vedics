/**
 * JeevanShaili - Learn Vedic Astrology & 27 Nakshatras Interactive Grid
 */

document.addEventListener('DOMContentLoaded', () => {
    loadEducationalTopics();
    loadNakshatrasGrid();
});

async function loadEducationalTopics() {
    const container = document.getElementById('educational-topics-grid');
    if (!container) return;

    try {
        const res = await fetch('/api/learn');
        const data = await res.json();

        if (data.success) {
            let html = '';
            data.topics.forEach(t => {
                html += `
                    <div class="glass-card">
                        <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">${t.icon}</div>
                        <h3 style="color: var(--gold-light); margin-bottom: 0.2rem;">${t.title}</h3>
                        <p style="font-size: 0.8rem; color: var(--gold-primary); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1rem;">Sanskrit: ${t.sanskrit}</p>
                        
                        <div style="margin-bottom: 0.85rem;">
                            <strong style="color: var(--text-primary); font-size: 0.9rem;">Simple Explanation:</strong>
                            <p style="font-size: 0.88rem;">${t.simpleExplanation}</p>
                        </div>
                        
                        <div style="margin-bottom: 0.85rem; padding-left: 0.75rem; border-left: 2px solid var(--gold-primary);">
                            <strong style="color: var(--gold-light); font-size: 0.85rem;">Technical Viva Detail:</strong>
                            <p style="font-size: 0.84rem; color: var(--text-secondary);">${t.technicalExplanation}</p>
                        </div>
                        
                        <div style="background: rgba(255, 255, 255, 0.03); padding: 0.6rem 0.85rem; border-radius: var(--radius-sm); font-size: 0.82rem; color: var(--text-muted);">
                            <strong>Example:</strong> ${t.example}
                        </div>
                    </div>
                `;
            });
            container.innerHTML = html;
        }
    } catch (err) {
        console.error("Failed to load learn topics:", err);
    }
}

async function loadNakshatrasGrid() {
    const container = document.getElementById('nakshatras-27-grid');
    if (!container) return;

    try {
        const res = await fetch('/api/nakshatras');
        const data = await res.json();

        if (data.success) {
            window.allNakshatrasData = data.nakshatras;
            let html = '';
            data.nakshatras.forEach(n => {
                html += `
                    <div class="glass-card" style="cursor: pointer;" onclick="openNakshatraModal(${n.id})">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                            <span class="meta-chip">#${n.id}</span>
                            <span style="font-size: 0.8rem; color: var(--gold-primary);">${n.sanskrit}</span>
                        </div>
                        <h4 style="color: var(--gold-light); margin-bottom: 0.3rem;">${n.name}</h4>
                        <p style="font-size: 0.82rem;">Lord: <strong>${n.lord}</strong> | Deity: ${n.deity.split(' ')[0]}</p>
                        <span style="font-size: 0.75rem; color: var(--gold-primary); margin-top: 0.5rem; display: inline-block;">Click for 4 Padas & Details ➔</span>
                    </div>
                `;
            });
            container.innerHTML = html;
        }
    } catch (err) {
        console.error("Failed to load 27 nakshatras grid:", err);
    }
}

window.openNakshatraModal = function(id) {
    if (!window.allNakshatrasData) return;
    const nak = window.allNakshatrasData.find(n => n.id === id);
    if (!nak) return;

    const modal = document.getElementById('nakshatra-modal-overlay');
    const body = document.getElementById('nakshatra-modal-body');
    if (!modal || !body) return;

    let padasHTML = nak.padaDetails.map(p => `
        <tr>
            <td><strong>Pada ${p.pada}</strong></td>
            <td>Navamsha Rashi: <span class="gold-text">${p.navamshaRashi}</span></td>
            <td>Longitude: ${p.range}</td>
        </tr>
    `).join('');

    body.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
            <span class="num-card-badge" style="width:40px; height:40px; font-size:1.1rem;">#${nak.id}</span>
            <div>
                <h2 style="color: var(--gold-light); margin:0;">${nak.name} (${nak.sanskrit})</h2>
                <p style="font-size:0.85rem;">Span: 13°20' | Element: ${nak.element}</p>
            </div>
        </div>

        <div style="margin: 1.25rem 0;">
            <p><strong>Nakshatra Lord:</strong> ${nak.lord} (${nak.dashaYears} Years Mahadasha)</p>
            <p><strong>Presiding Deity:</strong> ${nak.deity}</p>
            <p><strong>Symbol:</strong> ${nak.symbol}</p>
            <p><strong>Traditional Characteristics:</strong> ${nak.characteristics}</p>
        </div>

        <h4 style="margin-bottom: 0.6rem; color: var(--gold-light);">4 Pada (Quarter) Breakdown</h4>
        <div class="planetary-table-container">
            <table class="custom-table" style="font-size:0.85rem;">
                <tbody>
                    ${padasHTML}
                </tbody>
            </table>
        </div>
    `;

    modal.classList.add('active');
};

window.closeNakshatraModal = function() {
    const modal = document.getElementById('nakshatra-modal-overlay');
    if (modal) modal.classList.remove('active');
};
