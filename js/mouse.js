// ==========================================================
// MOUSE INTERACTION
// ==========================================================

// Target mouse position

let targetX = 0;
let targetY = 0;

// Smoothed values exported to animation.js

export let mouseX = 0;
export let mouseY = 0;

// ==========================================================
// DESKTOP
// ==========================================================

window.addEventListener("mousemove", (event) => {

    targetX = (
        event.clientX / window.innerWidth - 0.5
    ) * 2;

    targetY = (
        event.clientY / window.innerHeight - 0.5
    ) * 2;

});

// ==========================================================
// MOBILE
// ==========================================================

window.addEventListener("touchmove", (event) => {

    if (!event.touches.length) return;

    const touch = event.touches[0];

    targetX = (
        touch.clientX / window.innerWidth - 0.5
    ) * 2;

    targetY = (
        touch.clientY / window.innerHeight - 0.5
    ) * 2;

});

// ==========================================================
// SMOOTH INERTIA
// ==========================================================

function updateMouse() {

    mouseX += (targetX - mouseX) * 0.08;
    mouseY += (targetY - mouseY) * 0.08;

    requestAnimationFrame(updateMouse);

}

updateMouse();