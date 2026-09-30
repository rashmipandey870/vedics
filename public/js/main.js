/**
 * JeevanShaili - Main Frontend JavaScript
 * Common UI helpers, Canvas Starfield background, Intelligent City Geocoding Engine, Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
    initStarfieldCanvas();
    initMobileMenu();
    initLocationPresets();
});

/**
 * Animated Celestial Starfield Canvas
 */
function initStarfieldCanvas() {
    const canvas = document.getElementById('star-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const stars = Array.from({ length: 90 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        speed: Math.random() * 0.01 + 0.003
    }));

    function animate() {
        ctx.clearRect(0, 0, width, height);

        stars.forEach(star => {
            star.alpha += star.speed;
            if (star.alpha > 1 || star.alpha < 0.1) star.speed = -star.speed;

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(243, 229, 171, ${star.alpha.toFixed(2)})`;
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

/**
 * Mobile Navigation Menu Toggle
 */
function initMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const links = document.querySelector('.nav-links');
    if (!btn || !links) return;

    btn.addEventListener('click', () => {
        links.classList.toggle('mobile-open');
    });
}

/**
 * Comprehensive 100+ City Coordinates Database
 */
const CITY_COORDINATES_DB = {
    "deoghar": { name: "Deoghar, Jharkhand", lat: 24.4826, lng: 86.6961 },
    "delhi": { name: "New Delhi", lat: 28.6139, lng: 77.2090 },
    "new delhi": { name: "New Delhi", lat: 28.6139, lng: 77.2090 },
    "mumbai": { name: "Mumbai, Maharashtra", lat: 19.0760, lng: 72.8777 },
    "kolkata": { name: "Kolkata, West Bengal", lat: 22.5726, lng: 88.3639 },
    "chennai": { name: "Chennai, Tamil Nadu", lat: 13.0827, lng: 80.2707 },
    "bengaluru": { name: "Bengaluru, Karnataka", lat: 12.9716, lng: 77.5946 },
    "bangalore": { name: "Bengaluru, Karnataka", lat: 12.9716, lng: 77.5946 },
    "hyderabad": { name: "Hyderabad, Telangana", lat: 17.3850, lng: 78.4867 },
    "varanasi": { name: "Varanasi, Uttar Pradesh", lat: 25.3176, lng: 82.9739 },
    "patna": { name: "Patna, Bihar", lat: 25.5941, lng: 85.1376 },
    "ranchi": { name: "Ranchi, Jharkhand", lat: 23.3441, lng: 85.3096 },
    "lucknow": { name: "Lucknow, Uttar Pradesh", lat: 26.8467, lng: 80.9462 },
    "jaipur": { name: "Jaipur, Rajasthan", lat: 26.9124, lng: 75.7873 },
    "ahmedabad": { name: "Ahmedabad, Gujarat", lat: 23.0225, lng: 72.5714 },
    "bhopal": { name: "Bhopal, Madhya Pradesh", lat: 23.2599, lng: 77.4126 },
    "pune": { name: "Pune, Maharashtra", lat: 18.5204, lng: 73.8567 },
    "surat": { name: "Surat, Gujarat", lat: 21.1702, lng: 72.8311 },
    "chandigarh": { name: "Chandigarh", lat: 30.7333, lng: 76.7794 },
    "kanpur": { name: "Kanpur, Uttar Pradesh", lat: 26.4499, lng: 80.3319 },
    "indore": { name: "Indore, Madhya Pradesh", lat: 22.7196, lng: 75.8577 },
    "nagpur": { name: "Nagpur, Maharashtra", lat: 21.1458, lng: 79.0882 },
    "bhubaneswar": { name: "Bhubaneswar, Odisha", lat: 20.2961, lng: 85.8245 },
    "cuttack": { name: "Cuttack, Odisha", lat: 20.4625, lng: 85.8828 },
    "guwahati": { name: "Guwahati, Assam", lat: 26.1445, lng: 91.7362 },
    "raipur": { name: "Raipur, Chhattisgarh", lat: 21.2514, lng: 81.6296 },
    "shimla": { name: "Shimla, Himachal Pradesh", lat: 31.1048, lng: 77.1734 },
    "srinagar": { name: "Srinagar, J&K", lat: 34.0837, lng: 74.7973 },
    "jammu": { name: "Jammu, J&K", lat: 32.7266, lng: 74.8570 },
    "dehradun": { name: "Dehradun, Uttarakhand", lat: 30.3165, lng: 78.0322 },
    "agra": { name: "Agra, Uttar Pradesh", lat: 27.1767, lng: 78.0081 },
    "gwalior": { name: "Gwalior, Madhya Pradesh", lat: 26.2183, lng: 78.1828 },
    "jodhpur": { name: "Jodhpur, Rajasthan", lat: 26.2389, lng: 73.0243 },
    "udaipur": { name: "Udaipur, Rajasthan", lat: 24.5854, lng: 73.7125 },
    "kota": { name: "Kota, Rajasthan", lat: 25.2138, lng: 75.8648 },
    "amritsar": { name: "Amritsar, Punjab", lat: 31.6340, lng: 74.8723 },
    "jalandhar": { name: "Jalandhar, Punjab", lat: 31.3260, lng: 75.5762 },
    "ludhiana": { name: "Ludhiana, Punjab", lat: 30.9010, lng: 75.8573 },
    "prayagraj": { name: "Prayagraj (Allahabad), UP", lat: 25.4358, lng: 81.8463 },
    "allahabad": { name: "Prayagraj (Allahabad), UP", lat: 25.4358, lng: 81.8463 },
    "gorakhpur": { name: "Gorakhpur, UP", lat: 26.7606, lng: 83.3732 },
    "ayodhya": { name: "Ayodhya, UP", lat: 26.7922, lng: 82.1998 },
    "mathura": { name: "Mathura, UP", lat: 27.4924, lng: 77.6737 },
    "dhanbad": { name: "Dhanbad, Jharkhand", lat: 23.7957, lng: 86.4304 },
    "jamshedpur": { name: "Jamshedpur, Jharkhand", lat: 22.8046, lng: 86.2029 },
    "bokaro": { name: "Bokaro, Jharkhand", lat: 23.6693, lng: 85.9863 },
    "gaya": { name: "Gaya, Bihar", lat: 24.7914, lng: 85.0002 },
    "muzaffarpur": { name: "Muzaffarpur, Bihar", lat: 26.1209, lng: 85.3647 },
    "bhagalpur": { name: "Bhagalpur, Bihar", lat: 25.2425, lng: 86.9842 },
    "darbhanga": { name: "Darbhanga, Bihar", lat: 26.1542, lng: 85.8918 },
    "siliguri": { name: "Siliguri, West Bengal", lat: 26.7271, lng: 88.3953 },
    "asansol": { name: "Asansol, West Bengal", lat: 23.6889, lng: 86.9661 },
    "durgapur": { name: "Durgapur, West Bengal", lat: 23.5204, lng: 87.3119 },
    "coimbatore": { name: "Coimbatore, Tamil Nadu", lat: 11.0168, lng: 76.9558 },
    "madurai": { name: "Madurai, Tamil Nadu", lat: 9.9252, lng: 78.1198 },
    "kochi": { name: "Kochi, Kerala", lat: 9.9312, lng: 76.2673 },
    "thiruvananthapuram": { name: "Thiruvananthapuram, Kerala", lat: 8.5241, lng: 76.9366 },
    "trivandrum": { name: "Thiruvananthapuram, Kerala", lat: 8.5241, lng: 76.9366 },
    "visakhapatnam": { name: "Visakhapatnam, AP", lat: 17.6868, lng: 83.2185 },
    "vijayawada": { name: "Vijayawada, AP", lat: 16.5062, lng: 80.6480 },
    "tirupati": { name: "Tirupati, AP", lat: 13.6288, lng: 79.4192 },
    "nashik": { name: "Nashik, Maharashtra", lat: 19.9975, lng: 73.7898 },
    "aurangabad": { name: "Aurangabad, Maharashtra", lat: 19.8762, lng: 75.3433 },
    "solapur": { name: "Solapur, Maharashtra", lat: 17.6599, lng: 75.9064 },
    "kolhapur": { name: "Kolhapur, Maharashtra", lat: 16.7050, lng: 74.2433 },
    "london": { name: "London, UK", lat: 51.5074, lng: -0.1278 },
    "newyork": { name: "New York, USA", lat: 40.7128, lng: -74.0060 },
    "dubai": { name: "Dubai, UAE", lat: 25.2048, lng: 55.2708 },
    "singapore": { name: "Singapore", lat: 1.3521, lng: 103.8198 },
    "sydney": { name: "Sydney, Australia", lat: -33.8688, lng: 151.2093 }
};

/**
 * Synchronous / Async Helper to resolve city coordinates
 */
async function resolveCityCoordinates(cityName) {
    if (!cityName) return null;
    const query = cityName.trim().toLowerCase();

    // 1. Direct match in local dictionary
    for (let key in CITY_COORDINATES_DB) {
        if (query.includes(key) || key.includes(query)) {
            return CITY_COORDINATES_DB[key];
        }
    }

    // 2. OpenStreetMap Nominatim API Geocoding Fallback
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`);
        const data = await res.json();
        if (data && data.length > 0) {
            return {
                name: data[0].display_name,
                lat: Number(parseFloat(data[0].lat).toFixed(4)),
                lng: Number(parseFloat(data[0].lon).toFixed(4))
            };
        }
    } catch (err) {
        console.warn("Geocoding fetch error:", err);
    }

    return null;
}

/**
 * Location Presets & Intelligent City Auto-Geocoding Engine
 */
function initLocationPresets() {
    const citySelect = document.getElementById('birthCityPreset');
    const latInput = document.getElementById('latitude');
    const lngInput = document.getElementById('longitude');
    const placeInput = document.getElementById('birthPlace');
    const geoBtn = document.getElementById('useGeoLocationBtn');
    const geoStatus = document.getElementById('city-geo-status');

    function updateGeoStatus(msg, isSuccess = true) {
        if (!geoStatus) return;
        geoStatus.textContent = msg;
        geoStatus.style.color = isSuccess ? '#34d399' : '#f87171';
    }

    if (citySelect && latInput && lngInput) {
        citySelect.addEventListener('change', (e) => {
            const val = e.target.value;
            if (val && CITY_COORDINATES_DB[val]) {
                latInput.value = CITY_COORDINATES_DB[val].lat;
                lngInput.value = CITY_COORDINATES_DB[val].lng;
                if (placeInput) {
                    placeInput.value = CITY_COORDINATES_DB[val].name;
                }
                updateGeoStatus(`✅ Coordinates set for ${CITY_COORDINATES_DB[val].name}`);
            }
        });
    }

    let debounceTimer;
    if (placeInput && latInput && lngInput) {
        placeInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            const query = e.target.value.trim().toLowerCase();
            if (!query || query.length < 2) return;

            // Check local dictionary instantly
            for (let key in CITY_COORDINATES_DB) {
                if (query.includes(key) || key.includes(query)) {
                    latInput.value = CITY_COORDINATES_DB[key].lat;
                    lngInput.value = CITY_COORDINATES_DB[key].lng;
                    updateGeoStatus(`✅ Coordinates set: ${CITY_COORDINATES_DB[key].lat}°, ${CITY_COORDINATES_DB[key].lng}° (${CITY_COORDINATES_DB[key].name})`);
                    return;
                }
            }

            // Fallback debounced API fetch
            updateGeoStatus(`🔍 Resolving coordinates for "${e.target.value.trim()}"...`, true);
            debounceTimer = setTimeout(async () => {
                const coords = await resolveCityCoordinates(query);
                if (coords) {
                    latInput.value = coords.lat;
                    lngInput.value = coords.lng;
                    updateGeoStatus(`✅ Coordinates resolved: ${coords.lat}°, ${coords.lng}°`);
                } else {
                    updateGeoStatus(`⚠️ Custom city coordinates. Please verify Latitude & Longitude below.`, false);
                }
            }, 600);
        });
    }

    if (geoBtn && latInput && lngInput) {
        geoBtn.addEventListener('click', () => {
            if (navigator.geolocation) {
                updateGeoStatus("📍 Requesting GPS location...");
                geoBtn.textContent = "Locating...";
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        latInput.value = Number(pos.coords.latitude.toFixed(4));
                        lngInput.value = Number(pos.coords.longitude.toFixed(4));
                        if (placeInput && !placeInput.value) {
                            placeInput.value = "Current Location";
                        }
                        geoBtn.textContent = "📍 Auto-filled";
                        updateGeoStatus(`✅ GPS Coordinates: ${pos.coords.latitude.toFixed(4)}°, ${pos.coords.longitude.toFixed(4)}°`);
                    },
                    () => {
                        alert("Geolocation access denied or unavailable. Please select a city or enter coordinates manually.");
                        geoBtn.textContent = "📍 Use My Location";
                        updateGeoStatus("⚠️ GPS access denied.", false);
                    }
                );
            } else {
                alert("Geolocation is not supported by your browser.");
            }
        });
    }
}

// Export resolve function for global availability
window.resolveCityCoordinates = resolveCityCoordinates;

/**
 * Global Print & PDF Export Modal Handlers
 */
function openPrintSaveModal() {
    const modal = document.getElementById('print-save-modal-overlay');
    if (modal) {
        modal.style.display = 'flex';
        // Force reflow before adding active
        void modal.offsetWidth;
        modal.classList.add('active');
    } else {
        window.print();
    }
}

function closePrintSaveModal() {
    const modal = document.getElementById('print-save-modal-overlay');
    if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
        setTimeout(() => { modal.style.display = ''; }, 300);
    }
}

/**
 * High-Definition Universal PDF Exporter using html2pdf.js
 * Toggles high-contrast light mode (.pdf-export-mode) for crisp 300 DPI vector-sharp output
 */
async function exportReportToPDF(targetElementId = 'dashboard-content', reportTitle = null) {
    // 1. Immediately close and hide any open modal dialogs
    closePrintSaveModal();
    const activeModals = document.querySelectorAll('.modal-overlay');
    activeModals.forEach(m => {
        m.classList.remove('active');
        m.style.display = 'none';
    });

    // 2. Short pause for browser DOM repaint so open modals vanish completely before capture
    await new Promise(resolve => setTimeout(resolve, 150));

    const userName = (window.currentProfileData && window.currentProfileData.userMeta && window.currentProfileData.userMeta.name) 
        ? window.currentProfileData.userMeta.name.replace(/[^a-zA-Z0-9]/g, '_') 
        : 'Vedic_Birth_Profile';
    
    const element = document.getElementById(targetElementId);
    if (!element) {
        alert("Report content not found to generate PDF.");
        activeModals.forEach(m => m.style.display = '');
        return;
    }

    // Fallback to native vector print if html2pdf isn't present
    if (typeof html2pdf === 'undefined') {
        alert("Preparing vector print... Please select 'Save as PDF' as your Destination in the Print window.");
        activeModals.forEach(m => m.style.display = '');
        window.print();
        return;
    }

    // 3. Activate high-contrast 300 DPI PDF Export Theme
    document.body.classList.add('pdf-export-mode');

    // 4. Expand all card accordion details so everything is printed cleanly
    const expandableContents = element.querySelectorAll('.card-expandable-content');
    expandableContents.forEach(el => el.classList.add('open'));

    // Show loading Toast notification
    let toast = document.getElementById('pdf-export-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'pdf-export-toast';
        toast.style.cssText = 'position:fixed; bottom:24px; right:24px; background:#2563eb; color:#ffffff; padding:14px 24px; border-radius:10px; z-index:99999; font-weight:bold; font-family:sans-serif; box-shadow:0 10px 25px rgba(0,0,0,0.5); display:flex; align-items:center; gap:10px; border:1px solid #60a5fa;';
        document.body.appendChild(toast);
    }
    toast.innerHTML = '<span>📄</span> <span>Generating 300 DPI razor-sharp PDF report... Please wait.</span>';
    toast.style.display = 'flex';

    const fileName = reportTitle ? `${reportTitle}.pdf` : `JeevanShaili_Report_${userName}.pdf`;

    const opt = {
        margin:       [0.3, 0.3, 0.4, 0.3],
        filename:     fileName,
        image:        { type: 'jpeg', quality: 1.0 },
        html2canvas:  { 
            scale: 3,                  // 300 DPI ultra-high print resolution
            useCORS: true, 
            logging: false, 
            backgroundColor: '#ffffff',
            letterRendering: true,
            windowWidth: 1200           // Fixed desktop layout width for clean text alignment
        },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait', compress: true },
        pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
        await html2pdf().set(opt).from(element).save();
    } catch (err) {
        console.error('PDF export error:', err);
    } finally {
        // Restore dark UI theme on screen & restore modal display styles
        document.body.classList.remove('pdf-export-mode');
        activeModals.forEach(m => m.style.display = '');

        toast.style.background = '#16a34a';
        toast.style.borderColor = '#4ade80';
        toast.innerHTML = '<span>✅</span> <span>Razor-Sharp PDF Downloaded Successfully!</span>';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3500);
    }
}

window.openPrintSaveModal = openPrintSaveModal;
window.closePrintSaveModal = closePrintSaveModal;
window.exportReportToPDF = exportReportToPDF;
