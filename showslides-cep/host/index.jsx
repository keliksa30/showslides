/**
 * =========================================================================
 *  ShowSlides 3D Carousel Studio - ExtendScript Host (index.jsx)
 *  Shapes: Circular, Globe View, Card View, Linear
 *  Total: 20 Production-Ready Carousel Styles (5 per Shape)
 *  After Effects CC 2020 - 2025+ Compatible
 * =========================================================================
 */

$._showslides_carousel = (function () {
    "use strict";

    var api = {};

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

    api.checkSelection = function () {
        var comp = app.project.activeItem;
        if (!(comp instanceof CompItem)) {
            return JSON.stringify({ success: false, message: "Buka atau aktifkan komposisi terlebih dahulu." });
        }
        var count = comp.selectedLayers.length;
        if (count === 0) {
            return JSON.stringify({ success: false, message: "Tidak ada layer yang di-select." });
        }
        return JSON.stringify({ success: true, message: count + " layer terdeteksi dan siap dibuat carousel." });
    };

    api.syncLive = function (options) {
        try {
            var comp = app.project.activeItem;
            if (!(comp instanceof CompItem)) return JSON.stringify({ success: false });
            var ctrl = null;
            try { ctrl = comp.layer("ShowSlides_Controller"); } catch (e) {}
            if (!ctrl) return JSON.stringify({ success: false });

            var effects = ctrl.property("ADBE Effect Parade") || ctrl.property("Effects");
            if (!effects) return JSON.stringify({ success: false });

            function setFx(name, val) {
                try {
                    var fx = effects.property(name);
                    if (fx && fx.property(1)) {
                        fx.property(1).setValue(val);
                    }
                } catch (e) {}
            }

            if (options.shape !== undefined) setFx("Shape (1:Circ 2:Globe 3:Card 4:Linear)", options.shape);
            if (options.styleIndex !== undefined) setFx("Style Variant (1-5)", options.styleIndex + 1);
            if (options.radius !== undefined) setFx("Radius / Distance", options.radius);
            if (options.depthAngle !== undefined) setFx("Depth Angle / Tilt X", options.depthAngle);
            if (options.tiltZ !== undefined) setFx("Tilt Z", options.tiltZ);
            if (options.gScale !== undefined) setFx("Global Scale %", options.gScale);
            if (options.rotFollow !== undefined) setFx("Rotation Follow %", options.rotFollow);
            if (options.depthScale !== undefined) setFx("Scale Depth %", options.depthScale);
            if (options.scaleMin !== undefined) setFx("Scale Min %", options.scaleMin);
            if (options.depthFade !== undefined) setFx("Depth Fade %", options.depthFade);
            if (options.speed !== undefined) setFx("Speed", options.speed);
            if (options.xSlider !== undefined) setFx("X slider", options.xSlider);
            if (options.ySlider !== undefined) setFx("Y slider", options.ySlider);
            if (options.angle3D !== undefined) setFx("3D Y Angle", options.angle3D);

            return JSON.stringify({ success: true });
        } catch (e) {
            return JSON.stringify({ success: false, error: e.toString() });
        }
    };

    api.buildRig = function (options) {
        var comp = app.project.activeItem;
        if (!(comp instanceof CompItem)) {
            return JSON.stringify({ success: false, message: "Silakan buka komposisi After Effects terlebih dahulu." });
        }

        var selectedLayers = comp.selectedLayers;
        var total = selectedLayers.length;
        if (total < 2) {
            return JSON.stringify({ success: false, message: "Pilih minimal 2 layer di timeline untuk membuat Carousel." });
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
            getOrCreateSlider(effects, "Shape (1:Circ 2:Globe 3:Card 4:Linear)", options.shape || 1);
            getOrCreateSlider(effects, "Style Variant (1-5)", (options.styleIndex !== undefined ? options.styleIndex : 0) + 1);
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

            if (options.addCamera) {
                var hasCamera = false;
                for (var c = 1; c <= comp.numLayers; c++) {
                    if (comp.layer(c) instanceof CameraLayer) {
                        hasCamera = true;
                        break;
                    }
                }
                if (!hasCamera) {
                    var cam = comp.layers.addCamera("ShowSlides 3D Camera", [comp.width / 2, comp.height / 2]);
                    cam.property("Position").setValue([comp.width / 2, comp.height / 2, -1800]);
                }
            }

            // Apply Expressions to selected layers
            for (var i = 0; i < total; i++) {
                var l = selectedLayers[i];
                l.threeDLayer = true;

                // Disable separated dimensions on Position
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
            return JSON.stringify({ success: true, message: "Carousel 3D Studio berhasil diterapkan ke " + total + " layer." });
        } catch (err) {
            app.endUndoGroup();
            return JSON.stringify({ success: false, message: "Error: " + err.toString() });
        }
    };

    api.deleteRig = function () {
        var comp = app.project.activeItem;
        if (!(comp instanceof CompItem)) {
            return JSON.stringify({ success: false, message: "Buka komposisi terlebih dahulu." });
        }

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
            return JSON.stringify({ success: true, message: "Rig Carousel dan Controller berhasil dihapus." });
        } catch (err) {
            app.endUndoGroup();
            return JSON.stringify({ success: false, message: "Error: " + err.toString() });
        }
    };

    api.detachRig = function () {
        var comp = app.project.activeItem;
        if (!(comp instanceof CompItem)) {
            return JSON.stringify({ success: false, message: "Buka komposisi terlebih dahulu." });
        }
        var selectedLayers = comp.selectedLayers;
        if (selectedLayers.length === 0) {
            return JSON.stringify({ success: false, message: "Pilih layer yang ingin dilepas expression-nya." });
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
        return JSON.stringify({ success: true, message: "Expression berhasil dilepas dari " + selectedLayers.length + " layer." });
    };

    return api;
})();
