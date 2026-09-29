/**
 * JyotishSetu - Main Frontend JavaScript
 * Common UI helpers, Canvas Starfield background, Location Presets, Navigation
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
 * Location Presets & Automatic Geolocation Helper
 */
function initLocationPresets() {
    const citySelect = document.getElementById('birthCityPreset');
    const latInput = document.getElementById('latitude');
    const lngInput = document.getElementById('longitude');
    const placeInput = document.getElementById('birthPlace');
    const geoBtn = document.getElementById('useGeoLocationBtn');

    const cityCoords = {
        "deoghar": { name: "Deoghar, Jharkhand, India", lat: 24.4826, lng: 86.6961 },
        "delhi": { name: "New Delhi, India", lat: 28.6139, lng: 77.2090 },
        "mumbai": { name: "Mumbai, Maharashtra, India", lat: 19.0760, lng: 72.8777 },
        "kolkata": { name: "Kolkata, West Bengal, India", lat: 22.5726, lng: 88.3639 },
        "chennai": { name: "Chennai, Tamil Nadu, India", lat: 13.0827, lng: 80.2707 },
        "bengaluru": { name: "Bengaluru, Karnataka, India", lat: 12.9716, lng: 77.5946 },
        "hyderabad": { name: "Hyderabad, Telangana, India", lat: 17.3850, lng: 78.4867 },
        "varanasi": { name: "Varanasi, Uttar Pradesh, India", lat: 25.3176, lng: 82.9739 },
        "london": { name: "London, UK", lat: 51.5074, lng: -0.1278 },
        "newyork": { name: "New York, USA", lat: 40.7128, lng: -74.0060 }
    };

    if (citySelect && latInput && lngInput) {
        citySelect.addEventListener('change', (e) => {
            const val = e.target.value;
            if (val && cityCoords[val]) {
                latInput.value = cityCoords[val].lat;
                lngInput.value = cityCoords[val].lng;
                if (placeInput && !placeInput.value) {
                    placeInput.value = cityCoords[val].name;
                }
            }
        });
    }

    if (geoBtn && latInput && lngInput) {
        geoBtn.addEventListener('click', () => {
            if (navigator.geolocation) {
                geoBtn.textContent = "Locating...";
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        latInput.value = Number(pos.coords.latitude.toFixed(4));
                        lngInput.value = Number(pos.coords.longitude.toFixed(4));
                        if (placeInput && !placeInput.value) {
                            placeInput.value = "Current Location";
                        }
                        geoBtn.textContent = "📍 Auto-filled";
                    },
                    () => {
                        alert("Geolocation access denied or unavailable. Please select a city or enter coordinates manually.");
                        geoBtn.textContent = "📍 Use My Location";
                    }
                );
            } else {
                alert("Geolocation is not supported by your browser.");
            }
        });
    }
}
