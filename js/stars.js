import * as THREE from "three";

import { scene } from "./globe.js";
import { STAR_COUNT } from "./constants.js";

// ==========================================================
// STARFIELD
// ==========================================================

const positions = [];

for (let i = 0; i < STAR_COUNT; i++) {

    const radius =
        80 + Math.random() * 120;

    const theta =
        Math.random() * Math.PI * 2;

    const phi =
        Math.acos(2 * Math.random() - 1);

    positions.push(

        radius *
        Math.sin(phi) *
        Math.cos(theta),

        radius *
        Math.cos(phi),

        radius *
        Math.sin(phi) *
        Math.sin(theta)

    );

}

const geometry =
    new THREE.BufferGeometry();

geometry.setAttribute(

    "position",

    new THREE.Float32BufferAttribute(

        positions,

        3

    )

);

const material =
    new THREE.PointsMaterial({

        color: 0xffffff,

        size: 0.18,

        transparent: true,

        opacity: 0.85,

        depthWrite: false

    });

export const stars =
    new THREE.Points(

        geometry,

        material

    );

scene.add(stars);