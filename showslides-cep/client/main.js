/**
 * ShowSlides 3D Carousel Studio - Front-end Controller (main.js)
 * Shapes: Circular, Globe View, Card View, Linear
 * Supports 4 Shapes and 20 Production-Ready Carousel Styles (5 Styles each)
 */

(function () {
    "use strict";

    var csInterface = new CSInterface();

    // DOM Elements
    var modeCards = document.querySelectorAll(".mode-card");
    var selectStyle = document.getElementById("selectStyle");
    var styleBadge = document.getElementById("styleBadge");
    
    var sliderRadius = document.getElementById("sliderRadius");
    var valRadius = document.getElementById("valRadius");
    
    var sliderTiltX = document.getElementById("sliderTiltX");
    var valTiltX = document.getElementById("valTiltX");

    var sliderTiltZ = document.getElementById("sliderTiltZ");
    var valTiltZ = document.getElementById("valTiltZ");

    var sliderScale = document.getElementById("sliderScale");
    var valScale = document.getElementById("valScale");
    
    var checkDepthFade = document.getElementById("checkDepthFade");
    var checkDepthScale = document.getElementById("checkDepthScale");
    var checkAutoSpin = document.getElementById("checkAutoSpin");
    var checkAddCamera = document.getElementById("checkAddCamera");
    
    var btnBuild = document.getElementById("btnBuild");
    var btnDelete = document.getElementById("btnDelete");
    var btnRefresh = document.getElementById("btnRefresh");
    var btnDetach = document.getElementById("btnDetach");
    
    var helperMsg = document.getElementById("helperMsg");
    var statusText = document.getElementById("statusText");
    var statusDot = document.getElementById("statusDot");

    var currentShape = 1; // 1: Circular, 2: Globe View, 3: Card View, 4: Linear
    var currentStyleIndex = 0; // 0..4

    // --- 20 CAROUSEL STYLES CONFIGURATION ---
    var SHAPE_STYLES = {
        1: [ // Circular
            { name: "Style 1: Full 360° Ring (Outward)", radius: 700, depthAngle: 35, tiltZ: 0, speed: 40, gScale: 55, depthScale: 160, scaleMin: -35, depthFade: 50, rotFollow: 0, autoSpin: false, desc: "Full 360 Ring: Melingkar seimbang dengan sudut kemiringan 3D halus." },
            { name: "Style 2: 3D Inclined Orbit Ring", radius: 750, depthAngle: 45, tiltZ: 15, speed: 40, gScale: 55, depthScale: 160, scaleMin: -35, depthFade: 45, rotFollow: 100, autoSpin: false, desc: "Inclined Ring: Cincin orbit miring dengan orientasi tangensial." },
            { name: "Style 3: High-Speed Centered Spiral", radius: 600, depthAngle: -6, tiltZ: 0, speed: 250, gScale: 45, depthScale: 140, scaleMin: 40, depthFade: 40, rotFollow: 0, autoSpin: false, desc: "Centered Spiral: Putaran cepat melingkar fokus ke titik tengah." },
            { name: "Style 4: Extreme Tilt Vertical Wheel", radius: 720, depthAngle: 75, tiltZ: 0, speed: 30, gScale: 50, depthScale: 135, scaleMin: -25, depthFade: 50, rotFollow: 0, autoSpin: false, desc: "Vertical Wheel: Kemiringan vertikal dinamis seperti roda berputar." },
            { name: "Style 5: Deep Perspective Vortex", radius: 800, depthAngle: 65, tiltZ: -20, speed: 30, gScale: 45, depthScale: 180, scaleMin: 20, depthFade: 60, rotFollow: 0, autoSpin: false, desc: "Perspective Vortex: Cincin dengan kedalaman perspektif intens." }
        ],
        2: [ // Globe View (True 3D Spherical Physics)
            { name: "Style 1: Standard 3D Orbit Globe", radius: 850, depthAngle: 15, tiltZ: 25, speed: 40, gScale: 50, depthScale: 140, scaleMin: -20, depthFade: 60, rotFollow: 100, autoSpin: true, desc: "Standard Orbit: Terdistribusi merata mengitari bola 3D (Fibonacci)." },
            { name: "Style 2: Polar Orbital Meridian", radius: 840, depthAngle: 0, tiltZ: 90, speed: 35, gScale: 48, depthScale: 130, scaleMin: -30, depthFade: 55, rotFollow: 100, autoSpin: true, desc: "Polar Meridian: Cincin garis bujur kutub vertikal berputar." },
            { name: "Style 3: Tilted Latitude Spherical Band", radius: 950, depthAngle: -28, tiltZ: 36, speed: 30, gScale: 52, depthScale: 150, scaleMin: -20, depthFade: 50, rotFollow: 100, autoSpin: true, desc: "Tilted Latitude: Garis lintang khatulistiwa dan kutub bertingkat miring." },
            { name: "Style 4: Planetary Saturn Ring", radius: 880, depthAngle: 42, tiltZ: 10, speed: 45, gScale: 50, depthScale: 160, scaleMin: -20, depthFade: 60, rotFollow: 100, autoSpin: true, desc: "Planetary Ring: Cincin orbital planetary dengan sudut kemiringan kosmik." },
            { name: "Style 5: High-Density Golden Spiral Sphere", radius: 870, depthAngle: 20, tiltZ: 90, speed: 50, gScale: 45, depthScale: 170, scaleMin: 0, depthFade: 65, rotFollow: 100, autoSpin: true, desc: "Spiral Helix Sphere: Aliran spiral 3D mengelilingi bola dari atas ke bawah." }
        ],
        3: [ // Card View (Apple Vision Spatial HUD)
            { name: "Style 1: Spatial HUD Arc (Wide Angle)", radius: 800, depthAngle: 0, tiltZ: 0, speed: 20, gScale: 75, depthScale: 80, scaleMin: -45, depthFade: 0, rotFollow: 100, xSlider: -95, ySlider: 0, angle3D: -70, autoSpin: false, desc: "Spatial HUD Arc: Tampilan kartu mengambang melengkung ke dalam (Vision Pro style)." },
            { name: "Style 2: Deep Wrap-Around HUD (120° Flank)", radius: 850, depthAngle: 0, tiltZ: 0, speed: 10, gScale: 75, depthScale: 60, scaleMin: -110, depthFade: 0, rotFollow: 100, xSlider: -90, ySlider: 0, angle3D: -110, autoSpin: false, desc: "Wrap-Around HUD: Lengkungan sayap kartu 120 derajat membungkus viewport." },
            { name: "Style 3: Floating Tiered Spatial Stage", radius: 800, depthAngle: 0, tiltZ: 0, speed: 15, gScale: 75, depthScale: 60, scaleMin: -120, depthFade: 20, rotFollow: 100, xSlider: -82, ySlider: 25, angle3D: -100, autoSpin: false, desc: "Floating Tiered Stage: Kartu bertingkat dengan variasi ketinggian Y." },
            { name: "Style 4: Compact Focus Card Rack", radius: 750, depthAngle: 0, tiltZ: 0, speed: 10, gScale: 80, depthScale: 60, scaleMin: -120, depthFade: 20, rotFollow: 100, xSlider: -65, ySlider: 0, angle3D: -80, autoSpin: false, desc: "Compact Card Rack: Kartu fokus rapat dengan kartu aktif di tengah." },
            { name: "Style 5: High-Speed Glide HUD", radius: 850, depthAngle: 0, tiltZ: 0, speed: 100, gScale: 75, depthScale: 60, scaleMin: 0, depthFade: 0, rotFollow: 100, xSlider: -90, ySlider: 0, angle3D: -50, autoSpin: false, desc: "High-Speed Glide: Transisi meluncur cepat antar kartu horizontal." }
        ],
        4: [ // Linear
            { name: "Style 1: S-Curve Wave Runway", radius: 700, depthAngle: 25, tiltZ: 0, speed: -15, gScale: 55, depthScale: 130, scaleMin: -25, depthFade: 50, rotFollow: 0, autoSpin: false, desc: "S-Curve Wave: Aliran gelombang sinusoidal melintasi layar 3D." },
            { name: "Style 2: 3D Coverflow Runway", radius: 700, depthAngle: 0, tiltZ: 0, speed: 80, gScale: 58, depthScale: 150, scaleMin: -30, depthFade: 50, rotFollow: 75, autoSpin: false, desc: "3D Coverflow: Aliran kartu horizontal dengan orientasi sirip V-Shape." },
            { name: "Style 3: Ascending Staircase Runway", radius: 650, depthAngle: 15, tiltZ: 0, speed: 150, gScale: 55, depthScale: 100, scaleMin: -40, depthFade: 45, rotFollow: 25, autoSpin: false, desc: "Ascending Staircase: Lintasan tangga bertingkat diagonal naik." },
            { name: "Style 4: Serpentine S-Flow Wave", radius: 650, depthAngle: 35, tiltZ: 0, speed: -80, gScale: 52, depthScale: 70, scaleMin: -200, depthFade: 55, rotFollow: 50, autoSpin: false, desc: "Serpentine S-Flow: Jalur berkelok tajam dengan kedalaman dinamis." },
            { name: "Style 5: Cascading Waterfall Runway", radius: 600, depthAngle: -25, tiltZ: 0, speed: -80, gScale: 48, depthScale: 80, scaleMin: -10, depthFade: 60, rotFollow: 40, autoSpin: false, desc: "Cascading Waterfall: Aliran kartu vertikal meluncur dari atas ke latar." }
        ]
    };

    function populateStyleDropdown() {
        selectStyle.innerHTML = "";
        var styles = SHAPE_STYLES[currentShape];
        styles.forEach(function (st, idx) {
            var opt = document.createElement("option");
            opt.value = idx.toString();
            opt.textContent = st.name;
            selectStyle.appendChild(opt);
        });
        if (currentStyleIndex >= styles.length) currentStyleIndex = 0;
        selectStyle.value = currentStyleIndex.toString();
        styleBadge.textContent = "5 Styles Available";
        applyStyleConfig(styles[currentStyleIndex]);
    }

    function applyStyleConfig(cfg) {
        if (!cfg) return;
        sliderRadius.value = cfg.radius;
        valRadius.textContent = cfg.radius + " px";

        sliderTiltX.value = cfg.depthAngle;
        valTiltX.textContent = cfg.depthAngle + " deg";

        sliderTiltZ.value = cfg.tiltZ;
        valTiltZ.textContent = cfg.tiltZ + " deg";

        sliderScale.value = cfg.gScale;
        valScale.textContent = cfg.gScale + " %";

        checkDepthFade.checked = (cfg.depthFade > 0);
        checkDepthScale.checked = (cfg.depthScale > 0);
        checkAutoSpin.checked = cfg.autoSpin;

        showToast(cfg.desc);
        liveSync();
    }

    function liveSync() {
        var currentCfg = SHAPE_STYLES[currentShape][currentStyleIndex];
        var payload = {
            shape: currentShape,
            styleIndex: currentStyleIndex,
            radius: parseInt(sliderRadius.value, 10),
            depthAngle: parseInt(sliderTiltX.value, 10),
            tiltZ: parseInt(sliderTiltZ.value, 10),
            gScale: parseInt(sliderScale.value, 10),
            speed: checkAutoSpin.checked ? (currentCfg ? currentCfg.speed : 40) : 0,
            rotFollow: currentCfg ? currentCfg.rotFollow : 100,
            depthFade: checkDepthFade.checked ? (currentCfg ? currentCfg.depthFade : 50) : 0,
            depthScale: checkDepthScale.checked ? (currentCfg ? currentCfg.depthScale : 140) : 0,
            scaleMin: currentCfg ? currentCfg.scaleMin : -30,
            xSlider: currentCfg ? currentCfg.xSlider : -90,
            ySlider: currentCfg ? currentCfg.ySlider : 0,
            angle3D: currentCfg ? currentCfg.angle3D : -70
        };
        csInterface.evalScript("$._showslides_carousel.syncLive(" + JSON.stringify(payload) + ")");
    }

    // --- SLIDERS EVENT LISTENERS ---
    sliderRadius.addEventListener("input", function () {
        valRadius.textContent = sliderRadius.value + " px";
        liveSync();
    });

    sliderTiltX.addEventListener("input", function () {
        valTiltX.textContent = sliderTiltX.value + " deg";
        liveSync();
    });

    sliderTiltZ.addEventListener("input", function () {
        valTiltZ.textContent = sliderTiltZ.value + " deg";
        liveSync();
    });

    sliderScale.addEventListener("input", function () {
        valScale.textContent = sliderScale.value + " %";
        liveSync();
    });

    checkDepthFade.addEventListener("change", function () {
        liveSync();
    });

    checkDepthScale.addEventListener("change", function () {
        liveSync();
    });

    checkAutoSpin.addEventListener("change", function () {
        liveSync();
    });

    // --- SHAPE CARDS SWITCHING ---
    modeCards.forEach(function (card) {
        card.addEventListener("click", function () {
            modeCards.forEach(function (c) { c.classList.remove("active"); });
            card.classList.add("active");
            currentShape = parseInt(card.getAttribute("data-shape"), 10);
            currentStyleIndex = 0;
            populateStyleDropdown();
        });
    });

    // --- STYLE DROPDOWN CHANGE ---
    selectStyle.addEventListener("change", function () {
        currentStyleIndex = parseInt(selectStyle.value, 10);
        applyStyleConfig(SHAPE_STYLES[currentShape][currentStyleIndex]);
    });

    // --- BUILD ACTION ---
    btnBuild.addEventListener("click", function () {
        var currentCfg = SHAPE_STYLES[currentShape][currentStyleIndex];
        var payload = {
            shape: currentShape,
            styleIndex: currentStyleIndex,
            radius: parseInt(sliderRadius.value, 10),
            depthAngle: parseInt(sliderTiltX.value, 10),
            tiltZ: parseInt(sliderTiltZ.value, 10),
            gScale: parseInt(sliderScale.value, 10),
            speed: currentCfg ? currentCfg.speed : 40,
            rotFollow: currentCfg ? currentCfg.rotFollow : 100,
            depthFade: checkDepthFade.checked ? (currentCfg ? currentCfg.depthFade : 50) : 0,
            depthScale: checkDepthScale.checked ? (currentCfg ? currentCfg.depthScale : 140) : 0,
            scaleMin: currentCfg ? currentCfg.scaleMin : -30,
            xSlider: currentCfg ? currentCfg.xSlider : -90,
            ySlider: currentCfg ? currentCfg.ySlider : 0,
            angle3D: currentCfg ? currentCfg.angle3D : -70,
            autoSpin: checkAutoSpin.checked,
            addCamera: checkAddCamera.checked
        };

        var scriptCall = "$._showslides_carousel.buildRig(" + JSON.stringify(payload) + ")";
        
        statusText.textContent = "Building...";
        statusDot.style.background = "#00b4d8";
        
        csInterface.evalScript(scriptCall, function (result) {
            statusText.textContent = "Ready";
            statusDot.style.background = "#10b981";

            try {
                var res = JSON.parse(result);
                showToast(res.message, !res.success);
            } catch (e) {
                showToast("Response: " + result);
            }
        });
    });

    // --- DELETE RIG ACTION ---
    btnDelete.addEventListener("click", function () {
        csInterface.evalScript("$._showslides_carousel.deleteRig()", function (result) {
            try {
                var res = JSON.parse(result);
                showToast(res.message, !res.success);
            } catch (e) {
                showToast("Rig deleted.");
            }
        });
    });

    // --- DETACH RIG ACTION ---
    btnDetach.addEventListener("click", function () {
        csInterface.evalScript("$._showslides_carousel.detachRig()", function (result) {
            try {
                var res = JSON.parse(result);
                showToast(res.message, !res.success);
            } catch (e) {
                showToast("Expressions detached.");
            }
        });
    });

    // --- REFRESH / SYNC SELECTION ---
    btnRefresh.addEventListener("click", function () {
        csInterface.evalScript("$._showslides_carousel.checkSelection()", function (result) {
            try {
                var res = JSON.parse(result);
                showToast(res.message, !res.success);
            } catch (e) {
                showToast("Status: " + result);
            }
        });
    });

    // Toast helper
    function showToast(msg, isError) {
        if (!helperMsg) return;
        helperMsg.textContent = msg;
        helperMsg.style.color = isError ? "#f87171" : "#00d2ff";
        setTimeout(function () {
            helperMsg.style.color = "";
        }, 4000);
    }

    // Initialize
    populateStyleDropdown();

})();
