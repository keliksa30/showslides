/**
 * =========================================================================
 *  ShowSlides 3D Carousel Studio v3.0
 *  Custom Dockable ScriptUI Panel for Adobe After Effects (CC 2020 - 2025+)
 * =========================================================================
 *  Shapes:
 *   1. Circular (360° Ring, Semi-Arc, Spiral)
 *   2. Globe View (True 3D Spherical Orbit & Fibonacci)
 *   3. Card View (Apple Vision Spatial HUD & Flanked Arc)
 *   4. Linear (3D Coverflow, Wave & Runway)
 *  Total: 20 Production-Ready Carousel Styles (5 per Shape)
 * =========================================================================
 */

(function (thisObj) {
    "use strict";

    // -------------------------------------------------------------
    // Flat Lightweight UI Theme
    // -------------------------------------------------------------
    var THEME = {
        bg: [0.12, 0.12, 0.14, 1],         // #1f1f24
        panelBg: [0.15, 0.15, 0.18, 1],    // #26262e
        cardBg: [0.18, 0.18, 0.22, 1],     // #2e2e38
        cardActive: [0.08, 0.40, 0.55, 1], // #14668c
        accent: [0.00, 0.75, 0.90, 1],     // Clean Cyan #00c0e6
        btnPrimary: [0.00, 0.60, 0.85, 1], // Flat Blue
        btnDanger: [0.85, 0.25, 0.25, 1],  // Red
        textLight: [0.92, 0.93, 0.95, 1],
        textMuted: [0.60, 0.62, 0.68, 1],
        border: [0.25, 0.26, 0.30, 1]
    };

    var currentShape = 1; // 1: Circular, 2: Globe View, 3: Card View, 4: Linear
    var currentStyleIndex = 0; // 0..4 (Style 1..5)

    // -------------------------------------------------------------
    // 20 Carousel Styles Definitions (4 Shapes x 5 Styles)
    // -------------------------------------------------------------
    var SHAPE_STYLES = {
        1: [ // Circular
            { name: "Style 1: Full 360° Ring (Outward)", radius: 700, spread: 360, depthAngle: 35, tiltZ: 0, speed: 40, gScale: 55, depthScale: 160, scaleMin: -35, depthFade: 50, rotFollow: 0, autoSpin: false },
            { name: "Style 2: 3D Inclined Orbit Ring", radius: 750, spread: 360, depthAngle: 45, tiltZ: 15, speed: 40, gScale: 55, depthScale: 160, scaleMin: -35, depthFade: 45, rotFollow: 100, autoSpin: false },
            { name: "Style 3: High-Speed Centered Spiral", radius: 600, spread: 360, depthAngle: -6, tiltZ: 0, speed: 250, gScale: 45, depthScale: 140, scaleMin: 40, depthFade: 40, rotFollow: 0, autoSpin: false },
            { name: "Style 4: Extreme Tilt Vertical Wheel", radius: 720, spread: 360, depthAngle: 75, tiltZ: 0, speed: 30, gScale: 50, depthScale: 135, scaleMin: -25, depthFade: 50, rotFollow: 0, autoSpin: false },
            { name: "Style 5: Deep Perspective Vortex", radius: 800, spread: 360, depthAngle: 65, tiltZ: -20, speed: 30, gScale: 45, depthScale: 180, scaleMin: 20, depthFade: 60, rotFollow: 0, autoSpin: false }
        ],
        2: [ // Globe View (True 3D Spherical Physics)
            { name: "Style 1: Standard 3D Orbit Globe", radius: 850, spread: 360, depthAngle: 15, tiltZ: 25, speed: 40, gScale: 50, depthScale: 140, scaleMin: -20, depthFade: 60, rotFollow: 100, autoSpin: true },
            { name: "Style 2: Polar Orbital Meridian", radius: 840, spread: 360, depthAngle: 0, tiltZ: 90, speed: 35, gScale: 48, depthScale: 130, scaleMin: -30, depthFade: 55, rotFollow: 100, autoSpin: true },
            { name: "Style 3: Tilted Latitude Spherical Band", radius: 950, spread: 360, depthAngle: -28, tiltZ: 36, speed: 30, gScale: 52, depthScale: 150, scaleMin: -20, depthFade: 50, rotFollow: 100, autoSpin: true },
            { name: "Style 4: Planetary Saturn Ring", radius: 880, spread: 360, depthAngle: 42, tiltZ: 10, speed: 45, gScale: 50, depthScale: 160, scaleMin: -20, depthFade: 60, rotFollow: 100, autoSpin: true },
            { name: "Style 5: High-Density Golden Spiral Sphere", radius: 870, spread: 360, depthAngle: 20, tiltZ: 90, speed: 50, gScale: 45, depthScale: 170, scaleMin: 0, depthFade: 65, rotFollow: 100, autoSpin: true }
        ],
        3: [ // Card View (Apple Vision Spatial HUD)
            { name: "Style 1: Spatial HUD Arc (Wide Angle)", radius: 800, spread: 130, depthAngle: 0, tiltZ: 0, speed: 20, gScale: 75, depthScale: 80, scaleMin: -45, depthFade: 0, rotFollow: 100, xSlider: -95, ySlider: 0, angle3D: -70, autoSpin: false },
            { name: "Style 2: Deep Wrap-Around HUD (120° Flank)", radius: 850, spread: 200, depthAngle: 0, tiltZ: 0, speed: 10, gScale: 75, depthScale: 60, scaleMin: -110, depthFade: 0, rotFollow: 100, xSlider: -90, ySlider: 0, angle3D: -110, autoSpin: false },
            { name: "Style 3: Floating Tiered Spatial Stage", radius: 800, spread: 120, depthAngle: 0, tiltZ: 0, speed: 15, gScale: 75, depthScale: 60, scaleMin: -120, depthFade: 20, rotFollow: 100, xSlider: -82, ySlider: 25, angle3D: -100, autoSpin: false },
            { name: "Style 4: Compact Focus Card Rack", radius: 750, spread: 140, depthAngle: 0, tiltZ: 0, speed: 10, gScale: 80, depthScale: 60, scaleMin: -120, depthFade: 20, rotFollow: 100, xSlider: -65, ySlider: 0, angle3D: -80, autoSpin: false },
            { name: "Style 5: High-Speed Glide HUD", radius: 850, spread: 130, depthAngle: 0, tiltZ: 0, speed: 100, gScale: 75, depthScale: 60, scaleMin: 0, depthFade: 0, rotFollow: 100, xSlider: -90, ySlider: 0, angle3D: -50, autoSpin: false }
        ],
        4: [ // Linear
            { name: "Style 1: S-Curve Wave Runway", radius: 700, spread: 180, depthAngle: 25, tiltZ: 0, speed: -15, gScale: 55, depthScale: 130, scaleMin: -25, depthFade: 50, rotFollow: 0, autoSpin: false },
            { name: "Style 2: 3D Coverflow Runway", radius: 700, spread: 180, depthAngle: 0, tiltZ: 0, speed: 80, gScale: 58, depthScale: 150, scaleMin: -30, depthFade: 50, rotFollow: 75, autoSpin: false },
            { name: "Style 3: Ascending Staircase Runway", radius: 650, spread: 180, depthAngle: 15, tiltZ: 0, speed: 150, gScale: 55, depthScale: 100, scaleMin: -40, depthFade: 45, rotFollow: 25, autoSpin: false },
            { name: "Style 4: Serpentine S-Flow Wave", radius: 650, spread: 180, depthAngle: 35, tiltZ: 0, speed: -80, gScale: 52, depthScale: 70, scaleMin: -200, depthFade: 55, rotFollow: 50, autoSpin: false },
            { name: "Style 5: Cascading Waterfall Runway", radius: 600, spread: 180, depthAngle: -25, tiltZ: 0, speed: -80, gScale: 48, depthScale: 80, scaleMin: -10, depthFade: 60, rotFollow: 40, autoSpin: false }
        ]
    };

    // -------------------------------------------------------------
    // Clean Vector Drawing for Icons
    // -------------------------------------------------------------
    function drawCircularIcon(g, x, y, size, color) {
        var r = size / 2;
        var cx = x + r;
        var cy = y + r;
        g.newPath();
        for (var a = 0; a <= 360; a += 30) {
            var rad = (a * Math.PI) / 180;
            var px = cx + (r - 2) * Math.cos(rad);
            var py = cy + (r - 2) * Math.sin(rad);
            if (a === 0) g.moveTo(px, py);
            else g.lineTo(px, py);
        }
        g.closePath();
        g.strokePath(g.newPen(g.PenType.SOLID_COLOR, color, 1.5));

        var dots = [[cx, cy - r + 3], [cx + r - 3, cy], [cx, cy + r - 3], [cx - r + 3, cy]];
        for (var d = 0; d < dots.length; d++) {
            g.newPath();
            g.ellipsePath(dots[d][0] - 1.5, dots[d][1] - 1.5, 3, 3);
            g.fillPath(g.newBrush(g.BrushType.SOLID_COLOR, color));
        }
    }

    function drawGlobeIcon(g, x, y, size, color) {
        var cx = x + size / 2;
        var cy = y + size / 2;
        var r = size / 2 - 2;

        g.newPath();
        g.ellipsePath(cx - r, cy - r, r * 2, r * 2);
        g.strokePath(g.newPen(g.PenType.SOLID_COLOR, color, 1.5));

        g.newPath();
        g.ellipsePath(cx - r, cy - (r * 0.35), r * 2, r * 0.7);
        g.strokePath(g.newPen(g.PenType.SOLID_COLOR, color, 1));

        g.newPath();
        g.ellipsePath(cx - (r * 0.45), cy - r, r * 0.9, r * 2);
        g.strokePath(g.newPen(g.PenType.SOLID_COLOR, color, 1));
    }

    function drawCardViewIcon(g, x, y, size, color) {
        var cx = x + size / 2;
        var cy = y + size / 2;
        var w = size - 6;
        g.newPath();
        g.moveTo(cx - w / 2, cy - 3);
        g.lineTo(cx + w / 2, cy - 3);
        g.lineTo(cx + w / 2 - 2, cy + 5);
        g.lineTo(cx - w / 2 + 2, cy + 5);
        g.closePath();
        g.strokePath(g.newPen(g.PenType.SOLID_COLOR, color, 1.5));

        var dots = [[cx - 5, cy], [cx, cy], [cx + 5, cy]];
        for (var i = 0; i < dots.length; i++) {
            g.newPath();
            g.ellipsePath(dots[i][0] - 1.5, dots[i][1] - 1.5, 3, 3);
            g.fillPath(g.newBrush(g.BrushType.SOLID_COLOR, color));
        }
    }

    function drawLinearIcon(g, x, y, size, color) {
        var cx = x + size / 2;
        var cy = y + size / 2;
        g.newPath();
        g.moveTo(cx - 8, cy + 4);
        g.lineTo(cx - 3, cy - 4);
        g.lineTo(cx + 3, cy + 4);
        g.lineTo(cx + 8, cy - 4);
        g.strokePath(g.newPen(g.PenType.SOLID_COLOR, color, 1.5));

        var nodes = [[cx - 8, cy + 4], [cx - 3, cy - 4], [cx + 3, cy + 4], [cx + 8, cy - 4]];
        for (var i = 0; i < nodes.length; i++) {
            g.newPath();
            g.ellipsePath(nodes[i][0] - 1.5, nodes[i][1] - 1.5, 3, 3);
            g.fillPath(g.newBrush(g.BrushType.SOLID_COLOR, color));
        }
    }

    // -------------------------------------------------------------
    // Helper: Safe Property Setter & Effect Manager
    // -------------------------------------------------------------
    function setSafeExpr(layer, matchNames, altNames, exprStr) {
        var prop = null;
        var tGroup = null;
        try { tGroup = layer.property("ADBE Transform Group"); } catch (e) {}

        if (tGroup) {
            for (var m = 0; m < matchNames.length; m++) {
                try { prop = tGroup.property(matchNames[m]); if (prop) break; } catch (e) {}
            }
        }
        if (!prop) {
            for (var a = 0; a < altNames.length; a++) {
                try { prop = layer.property(altNames[a]); if (prop) break; } catch (e) {}
            }
        }
        if (prop) {
            try { prop.expression = exprStr; } catch (e) {}
        }
    }

    function getOrCreateSlider(effects, name, val) {
        var fx = null;
        try { fx = effects.property(name); } catch (e) {}
        if (!fx) {
            fx = effects.addProperty("ADBE Slider Control");
            fx.name = name;
        }
        try { fx.property(1).setValue(val); } catch (e) {}
        return fx;
    }

    function getOrCreateAngle(effects, name, val) {
        var fx = null;
        try { fx = effects.property(name); } catch (e) {}
        if (!fx) {
            fx = effects.addProperty("ADBE Angle Control");
            fx.name = name;
        }
        try { fx.property(1).setValue(val); } catch (e) {}
        return fx;
    }

    // -------------------------------------------------------------
    // Core Engine Logic (Rig Builder & Expressions)
    // -------------------------------------------------------------
    function buildShowSlidesCarousel(options) {
        var comp = app.project.activeItem;
        if (!(comp instanceof CompItem)) {
            alert("Buka atau aktifkan komposisi After Effects terlebih dahulu.");
            return false;
        }

        var selectedLayers = comp.selectedLayers;
        var total = selectedLayers.length;
        if (total < 2) {
            alert("Pilih minimal 2 layer di timeline untuk membuat Carousel.");
            return false;
        }

        app.beginUndoGroup("ShowSlides 3D Carousel Studio");

        try {
            var ctrlName = "ShowSlides_Controller";
            var existingCtrl = null;
            try { existingCtrl = comp.layer(ctrlName); } catch (e) {}

            var controller = existingCtrl;
            if (!controller) {
                controller = comp.layers.addNull();
                controller.name = ctrlName;
            }
            controller.threeDLayer = true;
            controller.property("Position").setValue([comp.width / 2, comp.height / 2, 0]);

            var effects = controller.property("ADBE Effect Parade") || controller.property("Effects");

            // Add standard controller effects
            getOrCreateSlider(effects, "Shape (1:Circ 2:Globe 3:Card 4:Linear)", options.shape);
            getOrCreateSlider(effects, "Style Variant (1-5)", options.styleIndex + 1);
            getOrCreateAngle(effects, "Move Carousel", 0);
            getOrCreateSlider(effects, "Speed", options.speed !== undefined ? options.speed : (options.autoSpin ? 40 : 0));
            getOrCreateSlider(effects, "Spacing", options.spacing !== undefined ? options.spacing : 100);
            getOrCreateAngle(effects, "Phase Offset", 0);
            getOrCreateSlider(effects, "Global Scale %", options.gScale !== undefined ? options.gScale : 55);
            getOrCreateSlider(effects, "Scale Depth %", options.depthScale !== undefined ? options.depthScale : 140);
            getOrCreateSlider(effects, "Scale Min %", options.scaleMin !== undefined ? options.scaleMin : -30);
            getOrCreateAngle(effects, "Depth Angle / Tilt X", options.depthAngle !== undefined ? options.depthAngle : 0);
            getOrCreateAngle(effects, "Tilt Z", options.tiltZ !== undefined ? options.tiltZ : 0);
            getOrCreateSlider(effects, "Radius / Distance", options.radius || 750);
            getOrCreateSlider(effects, "Rotation Follow %", options.rotFollow !== undefined ? options.rotFollow : 100);
            getOrCreateAngle(effects, "3D Y Angle", options.angle3D !== undefined ? options.angle3D : -70);
            getOrCreateSlider(effects, "X slider", options.xSlider !== undefined ? options.xSlider : -90);
            getOrCreateSlider(effects, "Y slider", options.ySlider !== undefined ? options.ySlider : 0);
            getOrCreateSlider(effects, "Depth Fade %", options.depthFade !== undefined ? options.depthFade : 50);

            // Expressions for each selected layer
            for (var i = 0; i < total; i++) {
                var l = selectedLayers[i];
                l.threeDLayer = true;

                // Disable separated dimensions on Position so 3D expressions evaluate seamlessly
                try {
                    var tGroup = l.property("ADBE Transform Group");
                    if (tGroup) {
                        var posProp = tGroup.property("ADBE Position");
                        if (posProp && posProp.dimensionsSeparated) {
                            posProp.dimensionsSeparated = false;
                        }
                    }
                } catch (e) {}

                // 1. POSITION EXPRESSION
                var posExpr = [
                    'try {',
                    '  var ctrl = thisComp.layer("' + ctrlName + '");',
                    '  if (!ctrl) { value; } else {',
                    '    function getFx(name, def) {',
                    '      try {',
                    '        var fx = ctrl.effect(name);',
                    '        if (fx && fx(1) != null) {',
                    '          return fx(1).value !== undefined ? fx(1).value : fx(1);',
                    '        }',
                    '      } catch(e) {}',
                    '      return def;',
                    '    }',
                    '    var shape = Math.round(getFx("Shape (1:Circ 2:Globe 3:Card 4:Linear)", 1));',
                    '    var styleVar = Math.round(getFx("Style Variant (1-5)", 1));',
                    '    var radius = Math.max(10, getFx("Radius / Distance", 750));',
                    '    var speed = getFx("Speed", 0);',
                    '    var masterRot = getFx("Move Carousel", 0) + getFx("Phase Offset", 0) + (time * speed * 0.1);',
                    '    var spacing = getFx("Spacing", 100) / 100;',
                    '    var depthAngle = getFx("Depth Angle / Tilt X", 0) * Math.PI / 180;',
                    '    var tiltZ = getFx("Tilt Z", 0) * Math.PI / 180;',
                    '    var total = ' + total + ';',
                    '    var idx = ' + i + ';',
                    '    var center = ctrl.transform.position;',
                    '    var px = 0, py = 0, pz = 0;',
                    '',
                    '    if (shape == 1) {',
                    '      // ⭕ 1. CIRCULAR (360° Ring)',
                    '      var step = (360 / total) * spacing;',
                    '      var ang = (masterRot + (idx * step)) * Math.PI / 180;',
                    '      px = radius * Math.sin(ang);',
                    '      var spiralY = (styleVar == 3) ? (idx - (total - 1) / 2) * 50 : 0;',
                    '      var pz0 = radius * Math.cos(ang);',
                    '      py = spiralY * Math.cos(depthAngle) - pz0 * Math.sin(depthAngle);',
                    '      pz = spiralY * Math.sin(depthAngle) + pz0 * Math.cos(depthAngle);',
                    '    } else if (shape == 2) {',
                    '      // 🌐 2. GLOBE VIEW (True 3D Spherical Surface)',
                    '      var x0 = 0, y0 = 0, z0 = 0;',
                    '      var uRot = masterRot * Math.PI / 180;',
                    '      if (styleVar == 1) {',
                    '        // Fibonacci Golden Sphere',
                    '        var golden = 2.3999632;',
                    '        var yNorm = (total <= 1) ? 0 : (1 - (idx / (total - 1)) * 2);',
                    '        var radAtY = Math.sqrt(Math.max(0.02, 1 - yNorm * yNorm));',
                    '        var theta = (idx * golden) + uRot;',
                    '        x0 = radius * radAtY * Math.sin(theta);',
                    '        y0 = -yNorm * radius * 0.9;',
                    '        z0 = radius * radAtY * Math.cos(theta);',
                    '      } else if (styleVar == 2) {',
                    '        // Polar Meridian Band',
                    '        var u = ((idx / total) * 2 * Math.PI) + uRot;',
                    '        x0 = radius * Math.sin(u) * 0.35;',
                    '        y0 = -radius * Math.cos(u);',
                    '        z0 = radius * Math.sin(u);',
                    '      } else if (styleVar == 3) {',
                    '        // Tilted Latitude Band',
                    '        var band = idx % 3;',
                    '        var lat = (band == 0) ? 0 : ((band == 1) ? 0.55 : -0.55);',
                    '        var bandTotal = Math.max(1, Math.ceil(total / 3));',
                    '        var u = ((Math.floor(idx / 3) / bandTotal) * 2 * Math.PI) + uRot + (band * 0.5);',
                    '        x0 = radius * Math.cos(lat) * Math.sin(u);',
                    '        y0 = -radius * Math.sin(lat);',
                    '        z0 = radius * Math.cos(lat) * Math.cos(u);',
                    '      } else if (styleVar == 4) {',
                    '        // Planetary Saturn Ring',
                    '        var u = ((idx / total) * 2 * Math.PI) + uRot;',
                    '        x0 = radius * 1.25 * Math.sin(u);',
                    '        y0 = Math.sin(u * 2) * (radius * 0.15);',
                    '        z0 = radius * 1.25 * Math.cos(u);',
                    '      } else {',
                    '        // Golden Spiral Helix',
                    '        var prog = (total <= 1) ? 0.5 : (idx / (total - 1));',
                    '        var lat = (0.5 - prog) * 2.2;',
                    '        var u = uRot + (prog * 4 * Math.PI);',
                    '        x0 = radius * Math.cos(lat) * Math.sin(u);',
                    '        y0 = -radius * Math.sin(lat);',
                    '        z0 = radius * Math.cos(lat) * Math.cos(u);',
                    '      }',
                    '      var y1 = y0 * Math.cos(depthAngle) - z0 * Math.sin(depthAngle);',
                    '      var z1 = y0 * Math.sin(depthAngle) + z0 * Math.cos(depthAngle);',
                    '      px = x0; py = y1; pz = z1;',
                    '    } else if (shape == 3) {',
                    '      // 🗂️ 3. CARD VIEW (Spatial Apple Vision HUD)',
                    '      var xSlider = getFx("X slider", -90);',
                    '      var ySlider = getFx("Y slider", 0);',
                    '      var scaleDepth = getFx("Scale Depth %", 80);',
                    '      var relIdx = (idx - (total - 1) / 2) + (masterRot / 35);',
                    '      var dist = Math.abs(relIdx);',
                    '      px = relIdx * (-xSlider * 4.2);',
                    '      py = relIdx * ySlider;',
                    '      pz = -dist * (scaleDepth * 2.8);',
                    '    } else {',
                    '      // 〰️ 4. LINEAR (Coverflow, Wave, Runway)',
                    '      var spacingDist = radius * 0.65 * spacing;',
                    '      var offsetPos = ((idx - (total - 1) / 2) * spacingDist) + (masterRot * 4);',
                    '      if (styleVar == 1) {',
                    '        px = offsetPos; py = 0; pz = -Math.abs(offsetPos) * 0.45;',
                    '      } else if (styleVar == 2) {',
                    '        px = offsetPos; py = Math.sin(offsetPos / 220) * 140; pz = Math.cos(offsetPos / 220) * 160;',
                    '      } else if (styleVar == 3) {',
                    '        px = offsetPos; py = -offsetPos * 0.4; pz = -Math.abs(offsetPos) * 0.35;',
                    '      } else if (styleVar == 4) {',
                    '        px = Math.sin(offsetPos / 280) * 60; py = offsetPos; pz = -Math.pow(offsetPos / 260, 2) * 45;',
                    '      } else {',
                    '        px = Math.sin(offsetPos / 260) * 80; py = Math.cos(offsetPos / 260) * 35; pz = offsetPos * 1.5;',
                    '      }',
                    '      var y1 = py * Math.cos(depthAngle) - pz * Math.sin(depthAngle);',
                    '      var z1 = py * Math.sin(depthAngle) + pz * Math.cos(depthAngle);',
                    '      py = y1; pz = z1;',
                    '    }',
                    '',
                    '    // Apply Tilt Z (Roll)',
                    '    if (tiltZ != 0) {',
                    '      var x2 = px * Math.cos(tiltZ) - py * Math.sin(tiltZ);',
                    '      var y2 = px * Math.sin(tiltZ) + py * Math.cos(tiltZ);',
                    '      px = x2; py = y2;',
                    '    }',
                    '',
                    '    [center[0] + px, center[1] + py, center[2] + pz];',
                    '  }',
                    '} catch(err) {',
                    '  value;',
                    '}'
                ].join('\n');
                setSafeExpr(l, ["ADBE Position"], ["Position", "position"], posExpr);

                // 2. X ROTATION EXPRESSION (Elevation Pitch)
                var xRotExpr = [
                    'try {',
                    '  var ctrl = thisComp.layer("' + ctrlName + '");',
                    '  if (!ctrl) { value; } else {',
                    '    function getFx(name, def) {',
                    '      try {',
                    '        var fx = ctrl.effect(name);',
                    '        if (fx && fx(1) != null) {',
                    '          return fx(1).value !== undefined ? fx(1).value : fx(1);',
                    '        }',
                    '      } catch(e) {}',
                    '      return def;',
                    '    }',
                    '    var shape = Math.round(getFx("Shape (1:Circ 2:Globe 3:Card 4:Linear)", 1));',
                    '    var rotFollow = getFx("Rotation Follow %", 100) / 100;',
                    '    var tiltX = getFx("Depth Angle / Tilt X", 0);',
                    '    var targetRot = 0;',
                    '    if (shape == 2) {',
                    '      targetRot = tiltX * 0.5;',
                    '    } else if (shape == 1 || shape == 4) {',
                    '      targetRot = tiltX * 0.3;',
                    '    }',
                    '    targetRot * rotFollow;',
                    '  }',
                    '} catch(err) {',
                    '  value;',
                    '}'
                ].join('\n');
                setSafeExpr(l, ["ADBE Rotate X"], ["X Rotation", "xRotation"], xRotExpr);

                // 3. Y ROTATION EXPRESSION (Azimuth / Yaw)
                var yRotExpr = [
                    'try {',
                    '  var ctrl = thisComp.layer("' + ctrlName + '");',
                    '  if (!ctrl) { value; } else {',
                    '    function getFx(name, def) {',
                    '      try {',
                    '        var fx = ctrl.effect(name);',
                    '        if (fx && fx(1) != null) {',
                    '          return fx(1).value !== undefined ? fx(1).value : fx(1);',
                    '        }',
                    '      } catch(e) {}',
                    '      return def;',
                    '    }',
                    '    var shape = Math.round(getFx("Shape (1:Circ 2:Globe 3:Card 4:Linear)", 1));',
                    '    var styleVar = Math.round(getFx("Style Variant (1-5)", 1));',
                    '    var rotFollow = getFx("Rotation Follow %", 100) / 100;',
                    '    var speed = getFx("Speed", 0);',
                    '    var masterRot = getFx("Move Carousel", 0) + getFx("Phase Offset", 0) + (time * speed * 0.1);',
                    '    var total = ' + total + ';',
                    '    var idx = ' + i + ';',
                    '    var targetY = 0;',
                    '',
                    '    if (shape == 1) {',
                    '      // Circular',
                    '      var step = 360 / total;',
                    '      targetY = -(masterRot + (idx * step));',
                    '    } else if (shape == 2) {',
                    '      // Globe View Azimuth',
                    '      if (styleVar == 1) {',
                    '        var goldenDeg = 2.3999632 * 180 / Math.PI;',
                    '        targetY = -((idx * goldenDeg) + masterRot);',
                    '      } else {',
                    '        var u = ((idx / total) * 360) + masterRot;',
                    '        targetY = -u;',
                    '      }',
                    '    } else if (shape == 3) {',
                    '      // Card View Spatial Flanking',
                    '      var angle3D = getFx("3D Y Angle", -70);',
                    '      var relIdx = (idx - (total - 1) / 2) + (masterRot / 35);',
                    '      var clampedRel = Math.max(-1.5, Math.min(1.5, relIdx));',
                    '      targetY = -(clampedRel / 1.5) * angle3D;',
                    '    } else {',
                    '      // Linear Coverflow',
                    '      var offsetPos = ((idx - (total - 1) / 2) * 300) + (masterRot * 4);',
                    '      if (styleVar == 1) {',
                    '        targetY = -Math.min(Math.max((offsetPos / 300) * 55, -60), 60);',
                    '      } else if (styleVar == 2) {',
                    '        targetY = -Math.cos(offsetPos / 220) * 35;',
                    '      } else {',
                    '        targetY = -Math.min(Math.max(offsetPos / 10, -45), 45);',
                    '      }',
                    '    }',
                    '    targetY * rotFollow;',
                    '  }',
                    '} catch(err) {',
                    '  value;',
                    '}'
                ].join('\n');
                setSafeExpr(l, ["ADBE Rotate Y"], ["Y Rotation", "yRotation"], yRotExpr);

                // 4. Z ROTATION EXPRESSION (Roll)
                var zRotExpr = [
                    'try {',
                    '  var ctrl = thisComp.layer("' + ctrlName + '");',
                    '  if (!ctrl) { value; } else {',
                    '    function getFx(name, def) {',
                    '      try {',
                    '        var fx = ctrl.effect(name);',
                    '        if (fx && fx(1) != null) {',
                    '          return fx(1).value !== undefined ? fx(1).value : fx(1);',
                    '        }',
                    '      } catch(e) {}',
                    '      return def;',
                    '    }',
                    '    var rotFollow = getFx("Rotation Follow %", 100) / 100;',
                    '    var tiltZ = getFx("Tilt Z", 0);',
                    '    tiltZ * rotFollow;',
                    '  }',
                    '} catch(err) {',
                    '  value;',
                    '}'
                ].join('\n');
                setSafeExpr(l, ["ADBE Rotate Z"], ["Z Rotation", "zRotation"], zRotExpr);

                // 5. SCALE EXPRESSION (Perspective Depth Scaling)
                var scaleExpr = [
                    'try {',
                    '  var ctrl = thisComp.layer("' + ctrlName + '");',
                    '  if (!ctrl) { value; } else {',
                    '    function getFx(name, def) {',
                    '      try {',
                    '        var fx = ctrl.effect(name);',
                    '        if (fx && fx(1) != null) {',
                    '          return fx(1).value !== undefined ? fx(1).value : fx(1);',
                    '        }',
                    '      } catch(e) {}',
                    '      return def;',
                    '    }',
                    '    var gScale = getFx("Global Scale %", 55) / 100;',
                    '    var depthScale = getFx("Scale Depth %", 140) / 100;',
                    '    var scaleMin = getFx("Scale Min %", -30) / 100;',
                    '    var radius = Math.max(10, getFx("Radius / Distance", 750));',
                    '    var centerZ = ctrl.transform.position[2];',
                    '    var relZ = transform.position[2] - centerZ;',
                    '    var depthNorm = relZ / radius;',
                    '    var factor = 1.0 + (depthNorm * depthScale * 0.5);',
                    '    var minClamp = Math.max(0.15, 1.0 + scaleMin);',
                    '    var finalFactor = Math.max(minClamp, Math.min(2.5, factor));',
                    '    value * gScale * finalFactor;',
                    '  }',
                    '} catch(err) {',
                    '  value;',
                    '}'
                ].join('\n');
                setSafeExpr(l, ["ADBE Scale"], ["Scale", "scale"], scaleExpr);

                // 6. OPACITY EXPRESSION (Depth Fading)
                var opacityExpr = [
                    'try {',
                    '  var ctrl = thisComp.layer("' + ctrlName + '");',
                    '  if (!ctrl) { value; } else {',
                    '    function getFx(name, def) {',
                    '      try {',
                    '        var fx = ctrl.effect(name);',
                    '        if (fx && fx(1) != null) {',
                    '          return fx(1).value !== undefined ? fx(1).value : fx(1);',
                    '        }',
                    '      } catch(e) {}',
                    '      return def;',
                    '    }',
                    '    var depthFade = getFx("Depth Fade %", 50) / 100;',
                    '    if (depthFade > 0) {',
                    '      var radius = Math.max(10, getFx("Radius / Distance", 750));',
                    '      var centerZ = ctrl.transform.position[2];',
                    '      var relZ = transform.position[2] - centerZ;',
                    '      var depthNorm = Math.min(Math.max((relZ + radius) / (2 * radius + 0.001), 0), 1);',
                    '      var fade = 1 - ((1 - depthNorm) * depthFade);',
                    '      value * Math.max(0.08, fade);',
                    '    } else {',
                    '      value;',
                    '    }',
                    '  }',
                    '} catch(err) {',
                    '  value;',
                    '}'
                ].join('\n');
                setSafeExpr(l, ["ADBE Opacity"], ["Opacity", "opacity"], opacityExpr);
            }

            app.endUndoGroup();
            return true;
        } catch (err) {
            app.endUndoGroup();
            alert("Error: " + err.toString());
            return false;
        }
    }

    function deleteRig() {
        var comp = app.project.activeItem;
        if (!(comp instanceof CompItem)) return;

        app.beginUndoGroup("Delete ShowSlides Carousel Rig");
        try {
            for (var i = 1; i <= comp.numLayers; i++) {
                var l = comp.layer(i);
                setSafeExpr(l, ["ADBE Position"], ["Position", "position"], "");
                setSafeExpr(l, ["ADBE Rotate X"], ["X Rotation", "xRotation"], "");
                setSafeExpr(l, ["ADBE Rotate Y"], ["Y Rotation", "yRotation"], "");
                setSafeExpr(l, ["ADBE Rotate Z"], ["Z Rotation", "zRotation"], "");
                setSafeExpr(l, ["ADBE Scale"], ["Scale", "scale"], "");
                setSafeExpr(l, ["ADBE Opacity"], ["Opacity", "opacity"], "");
            }
            var ctrl = null;
            try { ctrl = comp.layer("ShowSlides_Controller"); } catch (e) {}
            if (ctrl) { ctrl.remove(); }
            app.endUndoGroup();
            return true;
        } catch (err) {
            app.endUndoGroup();
            alert("Error: " + err.toString());
            return false;
        }
    }

    function detachExpressions() {
        var comp = app.project.activeItem;
        if (!(comp instanceof CompItem)) return;
        var selectedLayers = comp.selectedLayers;
        if (selectedLayers.length === 0) {
            alert("Pilih layer yang ingin dilepas expression-nya.");
            return;
        }
        app.beginUndoGroup("Detach ShowSlides Rig");
        for (var i = 0; i < selectedLayers.length; i++) {
            var l = selectedLayers[i];
            setSafeExpr(l, ["ADBE Position"], ["Position", "position"], "");
            setSafeExpr(l, ["ADBE Rotate X"], ["X Rotation", "xRotation"], "");
            setSafeExpr(l, ["ADBE Rotate Y"], ["Y Rotation", "yRotation"], "");
            setSafeExpr(l, ["ADBE Rotate Z"], ["Z Rotation", "zRotation"], "");
            setSafeExpr(l, ["ADBE Scale"], ["Scale", "scale"], "");
            setSafeExpr(l, ["ADBE Opacity"], ["Opacity", "opacity"], "");
        }
        app.endUndoGroup();
    }

    // -------------------------------------------------------------
    // Build ScriptUI Window (Clean Flat Dark Theme)
    // -------------------------------------------------------------
    function createUI(thisObj) {
        var win = (thisObj instanceof Panel) 
            ? thisObj 
            : new Window("palette", "ShowSlides 3D Carousel Studio", undefined, { resizeable: true });

        win.orientation = "column";
        win.alignChildren = ["fill", "top"];
        win.spacing = 8;
        win.margins = 10;

        win.graphics.backgroundColor = win.graphics.newBrush(win.graphics.BrushType.SOLID_COLOR, THEME.bg);

        // Header
        var headerGroup = win.add("group");
        headerGroup.orientation = "row";
        headerGroup.alignment = ["fill", "top"];
        headerGroup.alignChildren = ["left", "center"];

        var titleTxt = headerGroup.add("statictext", undefined, "✦ ShowSlides 3D");
        titleTxt.graphics.foregroundColor = titleTxt.graphics.newPen(titleTxt.graphics.PenType.SOLID_COLOR, THEME.accent, 1);

        var subTxt = headerGroup.add("statictext", undefined, "Carousel Studio v3.0");
        subTxt.graphics.foregroundColor = subTxt.graphics.newPen(subTxt.graphics.PenType.SOLID_COLOR, THEME.textMuted, 1);

        // --- 1. SELECT SHAPE PANEL ---
        var shapePanel = win.add("panel", undefined, "SELECT SHAPE");
        shapePanel.orientation = "row";
        shapePanel.alignChildren = ["fill", "center"];
        shapePanel.spacing = 6;
        shapePanel.margins = [8, 12, 8, 8];

        var shapes = [
            { id: 1, name: "Circular", draw: drawCircularIcon },
            { id: 2, name: "Globe View", draw: drawGlobeIcon },
            { id: 3, name: "Card View", draw: drawCardViewIcon },
            { id: 4, name: "Linear", draw: drawLinearIcon }
        ];

        var shapeButtons = [];

        function updateShapeCards() {
            for (var m = 0; m < shapeButtons.length; m++) {
                shapeButtons[m].notify("onDraw");
            }
        }

        // Live sync controller if it already exists
        function syncLiveController() {
            try {
                var comp = app.project.activeItem;
                if (!(comp instanceof CompItem)) return;
                var ctrl = null;
                try { ctrl = comp.layer("ShowSlides_Controller"); } catch (e) {}
                if (!ctrl) return;

                var effects = ctrl.property("ADBE Effect Parade") || ctrl.property("Effects");
                if (!effects) return;

                function setFxVal(name, val) {
                    try {
                        var fx = effects.property(name);
                        if (fx && fx.property(1)) {
                            fx.property(1).setValue(val);
                        }
                    } catch (e) {}
                }

                var currentCfg = SHAPE_STYLES[currentShape][currentStyleIndex];
                setFxVal("Shape (1:Circ 2:Globe 3:Card 4:Linear)", currentShape);
                setFxVal("Style Variant (1-5)", currentStyleIndex + 1);
                setFxVal("Radius / Distance", Math.round(radSlider.value));
                setFxVal("Depth Angle / Tilt X", Math.round(tiltXSlider.value));
                setFxVal("Tilt Z", Math.round(tiltZSlider.value));
                setFxVal("Global Scale %", Math.round(scaleSlider.value));
                setFxVal("Rotation Follow %", currentCfg ? currentCfg.rotFollow : 100);
                setFxVal("Scale Depth %", depthScaleCheck.value ? (currentCfg ? currentCfg.depthScale : 140) : 0);
                setFxVal("Scale Min %", currentCfg ? currentCfg.scaleMin : -30);
                setFxVal("Depth Fade %", depthFadeCheck.value ? (currentCfg ? currentCfg.depthFade : 50) : 0);
                setFxVal("Speed", autoSpinCheck.value ? (currentCfg ? currentCfg.speed : 40) : 0);
                if (currentCfg && currentCfg.xSlider !== undefined) setFxVal("X slider", currentCfg.xSlider);
                if (currentCfg && currentCfg.ySlider !== undefined) setFxVal("Y slider", currentCfg.ySlider);
                if (currentCfg && currentCfg.angle3D !== undefined) setFxVal("3D Y Angle", currentCfg.angle3D);
            } catch (e) {}
        }

        // --- 2. SELECT STYLE DROPDOWN PANEL ---
        var stylePanel = win.add("panel", undefined, "SELECT STYLE");
        stylePanel.orientation = "column";
        stylePanel.alignChildren = ["fill", "top"];
        stylePanel.spacing = 4;
        stylePanel.margins = [8, 10, 8, 8];

        var styleDropdown = stylePanel.add("dropdownlist", undefined, []);
        styleDropdown.preferredSize.height = 24;

        function refreshStyleDropdown() {
            styleDropdown.removeAll();
            var styles = SHAPE_STYLES[currentShape];
            for (var s = 0; s < styles.length; s++) {
                styleDropdown.add("item", styles[s].name);
            }
            if (currentStyleIndex >= styles.length) currentStyleIndex = 0;
            styleDropdown.selection = currentStyleIndex;
            applyStyleToControls(styles[currentStyleIndex]);
        }

        function applyStyleToControls(cfg) {
            if (!cfg) return;
            radSlider.value = cfg.radius;
            radValTxt.text = cfg.radius + " px";

            tiltXSlider.value = cfg.depthAngle;
            tiltXValTxt.text = cfg.depthAngle + " deg";

            tiltZSlider.value = cfg.tiltZ;
            tiltZValTxt.text = cfg.tiltZ + " deg";

            scaleSlider.value = cfg.gScale;
            scaleValTxt.text = cfg.gScale + " %";

            depthScaleCheck.value = (cfg.depthScale > 0);
            depthFadeCheck.value = (cfg.depthFade > 0);
            autoSpinCheck.value = cfg.autoSpin;
            syncLiveController();
        }

        styleDropdown.onChange = function () {
            if (styleDropdown.selection) {
                currentStyleIndex = styleDropdown.selection.index;
                applyStyleToControls(SHAPE_STYLES[currentShape][currentStyleIndex]);
            }
        };

        for (var i = 0; i < shapes.length; i++) {
            (function (idx) {
                var shp = shapes[idx];
                var card = shapePanel.add("customControl", undefined, undefined);
                card.size = [60, 50];

                card.onDraw = function () {
                    var g = this.graphics;
                    var isSelected = (currentShape === shp.id);
                    var bgCol = isSelected ? THEME.cardActive : THEME.cardBg;
                    var iconCol = isSelected ? THEME.textLight : THEME.accent;

                    g.newPath();
                    g.rectPath(0, 0, this.size[0], this.size[1]);
                    g.fillPath(g.newBrush(g.BrushType.SOLID_COLOR, bgCol));
                    g.strokePath(g.newPen(g.PenType.SOLID_COLOR, isSelected ? THEME.accent : THEME.border, 1));

                    shp.draw(g, (this.size[0] - 20) / 2, 5, 20, iconCol);

                    var displayName = shp.name;
                    if (displayName === "Globe View") displayName = "Globe";
                    if (displayName === "Card View") displayName = "Card";

                    g.drawString(displayName, g.newPen(g.PenType.SOLID_COLOR, isSelected ? THEME.textLight : THEME.textMuted, 1), 
                        (this.size[0] - (displayName.length * 6)) / 2, 33);
                };

                card.addEventListener("mousedown", function () {
                    currentShape = shp.id;
                    currentStyleIndex = 0;
                    updateShapeCards();
                    refreshStyleDropdown();
                });

                shapeButtons.push(card);
            })(i);
        }

        // --- 3. PARAMETERS PANEL ---
        var paramPanel = win.add("panel", undefined, "CONTROLS & PHYSICS");
        paramPanel.orientation = "column";
        paramPanel.alignChildren = ["fill", "top"];
        paramPanel.spacing = 5;
        paramPanel.margins = [10, 12, 10, 10];

        // Radius Slider
        var radRow = paramPanel.add("group");
        radRow.orientation = "row";
        var radLbl = radRow.add("statictext", undefined, "Radius:");
        radLbl.preferredSize.width = 75;
        var radSlider = radRow.add("slider", undefined, 750, 150, 2500);
        var radValTxt = radRow.add("statictext", undefined, "750 px");
        radValTxt.preferredSize.width = 50;
        radSlider.onChanging = function () { 
            radValTxt.text = Math.round(radSlider.value) + " px"; 
            syncLiveController();
        };

        // Depth Angle / Tilt X Slider
        var tiltXRow = paramPanel.add("group");
        tiltXRow.orientation = "row";
        var tiltXLbl = tiltXRow.add("statictext", undefined, "Depth Angle:");
        tiltXLbl.preferredSize.width = 75;
        var tiltXSlider = tiltXRow.add("slider", undefined, 0, -90, 90);
        var tiltXValTxt = tiltXRow.add("statictext", undefined, "0 deg");
        tiltXValTxt.preferredSize.width = 50;
        tiltXSlider.onChanging = function () { 
            tiltXValTxt.text = Math.round(tiltXSlider.value) + " deg"; 
            syncLiveController();
        };

        // Tilt Z Slider
        var tiltZRow = paramPanel.add("group");
        tiltZRow.orientation = "row";
        var tiltZLbl = tiltZRow.add("statictext", undefined, "Tilt Z:");
        tiltZLbl.preferredSize.width = 75;
        var tiltZSlider = tiltZRow.add("slider", undefined, 0, -90, 90);
        var tiltZValTxt = tiltZRow.add("statictext", undefined, "0 deg");
        tiltZValTxt.preferredSize.width = 50;
        tiltZSlider.onChanging = function () { 
            tiltZValTxt.text = Math.round(tiltZSlider.value) + " deg"; 
            syncLiveController();
        };

        // Global Scale % Slider
        var scaleRow = paramPanel.add("group");
        scaleRow.orientation = "row";
        var scaleLbl = scaleRow.add("statictext", undefined, "Scale %:");
        scaleLbl.preferredSize.width = 75;
        var scaleSlider = scaleRow.add("slider", undefined, 55, 10, 150);
        var scaleValTxt = scaleRow.add("statictext", undefined, "55 %");
        scaleValTxt.preferredSize.width = 50;
        scaleSlider.onChanging = function () { 
            scaleValTxt.text = Math.round(scaleSlider.value) + " %"; 
            syncLiveController();
        };

        // Depth Toggles
        var depthRow = paramPanel.add("group");
        depthRow.orientation = "row";
        var depthFadeCheck = depthRow.add("checkbox", undefined, "Depth Fade");
        depthFadeCheck.value = true;
        depthFadeCheck.onClick = function () { syncLiveController(); };

        var depthScaleCheck = depthRow.add("checkbox", undefined, "Depth Scale");
        depthScaleCheck.value = true;
        depthScaleCheck.onClick = function () { syncLiveController(); };

        var autoSpinCheck = paramPanel.add("checkbox", undefined, "Auto-Spin Loop");
        autoSpinCheck.value = false;

        // --- 4. BUTTONS & ACTIONS ---
        var btnGroup = win.add("group");
        btnGroup.orientation = "column";
        btnGroup.alignChildren = ["fill", "center"];
        btnGroup.spacing = 6;

        var buildBtn = btnGroup.add("button", undefined, "+ CREATE CAROUSEL");
        buildBtn.preferredSize.height = 32;

        var utilRow = btnGroup.add("group");
        utilRow.orientation = "row";
        utilRow.alignChildren = ["fill", "center"];
        var deleteBtn = utilRow.add("button", undefined, "✕ Delete Rig");
        var unbindBtn = utilRow.add("button", undefined, "Detach Expr");

        // Status Label
        var statusTxt = win.add("statictext", undefined, "Pilih 2+ layer lalu klik + CREATE.");
        statusTxt.alignment = ["center", "bottom"];
        statusTxt.graphics.foregroundColor = statusTxt.graphics.newPen(statusTxt.graphics.PenType.SOLID_COLOR, THEME.textMuted, 1);

        // --- EVENT HANDLERS ---
        buildBtn.onClick = function () {
            var currentCfg = SHAPE_STYLES[currentShape][currentStyleIndex];
            var options = {
                shape: currentShape,
                styleIndex: currentStyleIndex,
                radius: Math.round(radSlider.value),
                depthAngle: Math.round(tiltXSlider.value),
                tiltZ: Math.round(tiltZSlider.value),
                gScale: Math.round(scaleSlider.value),
                speed: currentCfg ? currentCfg.speed : 40,
                spacing: currentCfg ? currentCfg.spacing : 100,
                rotFollow: currentCfg ? currentCfg.rotFollow : 100,
                depthScale: depthScaleCheck.value ? (currentCfg ? currentCfg.depthScale : 140) : 0,
                scaleMin: currentCfg ? currentCfg.scaleMin : -30,
                depthFade: depthFadeCheck.value ? (currentCfg ? currentCfg.depthFade : 50) : 0,
                xSlider: currentCfg ? currentCfg.xSlider : -90,
                ySlider: currentCfg ? currentCfg.ySlider : 0,
                angle3D: currentCfg ? currentCfg.angle3D : -70,
                autoSpin: autoSpinCheck.value
            };

            var success = buildShowSlidesCarousel(options);
            if (success) {
                statusTxt.text = "Carousel Berhasil Dibuat (" + currentCfg.name + ")";
            }
        };

        deleteBtn.onClick = function () {
            if (deleteRig()) {
                statusTxt.text = "ShowSlides Rig & Controller Dihapus.";
            }
        };

        unbindBtn.onClick = function () {
            detachExpressions();
            statusTxt.text = "Expression dilepas dari layer.";
        };

        // Initialize Styles
        refreshStyleDropdown();

        win.layout.layout(true);
        win.layout.resize();
        win.onResizing = win.onResize = function () {
            this.layout.resize();
        };

        return win;
    }

    var myPanel = createUI(thisObj);
    if (myPanel instanceof Window) {
        myPanel.center();
        myPanel.show();
    }

})(this);
