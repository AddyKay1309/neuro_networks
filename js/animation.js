import { pulseObjects, cityNodes } from "./network.js";

import { renderer, scene, camera } from "./globe.js";

import { stars } from "./stars.js";

import {
    globe,
    atmosphere,
    nodeGroup,
    nodes
} from "./particleGlobe.js";

import { mouseX, mouseY } from "./mouse.js";

import {
    GLOBE_ROTATION_SPEED,
    FLOAT_HEIGHT,
    FLOAT_SPEED,
    NODE_PULSE_SPEED
} from "./constants.js";

// ==========================================================
// ANIMATION LOOP
// ==========================================================

function animate() {

    requestAnimationFrame(animate);

    const t = performance.now() * 0.001;

    // ======================================================
    // STARS
    // ======================================================

    stars.rotation.y += 0.00005;
    stars.rotation.x += 0.00001;

    // ======================================================
    // AUTO ROTATION
    // ======================================================

    globe.rotation.y += GLOBE_ROTATION_SPEED;

    atmosphere.rotation.copy(globe.rotation);

    nodeGroup.rotation.copy(globe.rotation);

    // ======================================================
    // MOUSE PARALLAX
    // ======================================================

    const targetX = mouseY * 0.35;
    const targetZ = -mouseX * 0.35;

    globe.rotation.x +=
        (targetX - globe.rotation.x) * 0.04;

    globe.rotation.z +=
        (targetZ - globe.rotation.z) * 0.04;

    atmosphere.rotation.x = globe.rotation.x;
    atmosphere.rotation.z = globe.rotation.z;

    nodeGroup.rotation.x = globe.rotation.x;
    nodeGroup.rotation.z = globe.rotation.z;

    // ======================================================
    // FLOATING
    // ======================================================

    const floatY =
        Math.sin(t * FLOAT_SPEED) * FLOAT_HEIGHT;

    globe.position.y +=
        (floatY - globe.position.y) * 0.03;

    atmosphere.position.copy(globe.position);

    nodeGroup.position.copy(globe.position);

    // ======================================================
    // BREATHING
    // ======================================================

    const scale =
        1 + Math.sin(t * 1.8) * 0.015;

    globe.scale.setScalar(scale);

    atmosphere.scale.setScalar(scale * 1.02);

    nodeGroup.scale.setScalar(scale);

    // ======================================================
    // ORIGINAL NODE PULSE
    // ======================================================

    nodes.forEach((node, i) => {

        const pulse =
            1 +
            Math.sin(
                t * NODE_PULSE_SPEED + i
            ) * 0.45;

        node.scale.setScalar(pulse);

    });

    // ======================================================
    // ACTION POTENTIALS
    // ======================================================

    pulseObjects.forEach(pulse => {

        pulse.userData.progress += 0.0025;

        if (pulse.userData.progress > 1) {

            pulse.userData.progress = 0;

        }

        const position =
            pulse.userData.curve.getPoint(
                pulse.userData.progress
            );

        pulse.position.copy(position);

        // ------------------------------------------
        // Trigger destination glow
        // ------------------------------------------

        if (pulse.userData.progress > 0.985) {

            cityNodes.forEach(node => {

                if (
                    node.position.distanceTo(position) < 0.08
                ) {

                    node.userData.glow = 1;

                }

            });

        }

    });

    // ======================================================
    // SYNAPSE GLOW
    // ======================================================

    cityNodes.forEach(node => {

        node.userData.glow *= 0.94;

        const glow = node.userData.glow;

        const size = 1 + glow * 1.4;

        node.scale.setScalar(size);

        node.material.transparent = true;

        node.material.opacity =
            0.85 + glow * 0.15;

    });

    // ======================================================
    // RENDER
    // ======================================================

    renderer.render(scene, camera);

}

animate();