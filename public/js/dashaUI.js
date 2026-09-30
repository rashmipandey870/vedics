/**
 * JeevanShaili - Dasha Timeline UI Renderer
 * Includes Vimshottari Mahadasha timeline, Antardasha sub-period breakdown, and calculation steps modal trigger.
 * 
 * Author: Rashmi Pandey
 */

function renderDashaSection(dashaData, targetContainerId = 'dasha-section-container') {
    const container = document.getElementById(targetContainerId);
    if (!container || !dashaData) return;

    const { nakshatraName, nakshatraLord, remainingBalanceYears, activeMahadasha, timeline, antardashas, calculationSteps } = dashaData;

    let timelineNodesHTML = '';
    timeline.forEach(node => {
        const isActive = node.planetKey === activeMahadasha.planetKey;
        timelineNodesHTML += `
            <div class="dasha-node ${isActive ? 'active' : ''}">
                <div class="dasha-node-planet">${node.planetName}</div>
                <div class="dasha-node-years">${node.startDate.substring(0, 4)} – ${node.endDate.substring(0, 4)}</div>
                <div style="font-size: 0.7rem; color: var(--gold-light); margin-top: 2px;">${node.totalYears} Years</div>
            </div>
        `;
    });

    let antardashaRowsHTML = '';
    antardashas.forEach(sub => {
        antardashaRowsHTML += `
            <tr style="${sub.isActive ? 'background: rgba(212, 175, 55, 0.15); font-weight: bold;' : ''}">
                <td>${sub.isActive ? '⭐ ' : ''}${sub.planetName} (${sub.sanskrit})</td>
                <td>${sub.startDate}</td>
                <td>${sub.endDate}</td>
                <td>${sub.durationMonths} months</td>
            </tr>
        `;
    });

    const stepsJson = JSON.stringify(calculationSteps || []);

    const html = `
        <div class="glass-card dasha-container">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
                <div>
                    <h3 style="color: var(--gold-light); font-size: 1.5rem;">Vimshottari Dasha Timeline</h3>
                    <p style="font-size: 0.9rem;">Birth Nakshatra: <strong style="color: var(--text-primary);">${nakshatraName}</strong> (Lord: ${nakshatraLord}) | Starting Balance: <strong>${remainingBalanceYears} Years</strong></p>
                </div>
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <span class="hero-subtitle-badge">Current: ${activeMahadasha.planetName} Mahadasha</span>
                    <button class="btn btn-secondary btn-sm" onclick='showCalculationStepsModal("Vimshottari Dasha Calculation", ${stepsJson})'>🧮 View Math</button>
                </div>
            </div>

            <!-- Horizontal Scrollable Timeline -->
            <div class="dasha-timeline-scroll">
                ${timelineNodesHTML}
            </div>

            <!-- Active Mahadasha Banner -->
            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--gold-border); border-radius: var(--radius-sm); padding: 1.25rem; margin-bottom: 1.5rem;">
                <h4 style="color: var(--gold-light); margin-bottom: 0.3rem;">Active Period: ${activeMahadasha.planetName} Mahadasha</h4>
                <p style="font-size: 0.88rem; margin-bottom: 0.5rem;">${activeMahadasha.description}</p>
                <p style="font-size: 0.82rem; color: var(--text-muted);">Period Range: ${activeMahadasha.startDate} to ${activeMahadasha.endDate}</p>
            </div>

            <!-- Antardasha Breakdown Table -->
            <h4 style="margin-bottom: 1rem; color: var(--text-primary);">Antardasha Sub-Periods (${activeMahadasha.planetName} Mahadasha)</h4>
            <div class="planetary-table-container">
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th>Antardasha Planet</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${antardashaRowsHTML}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    container.innerHTML = html;
}
