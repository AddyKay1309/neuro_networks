import * as THREE from "three";

import { scene } from "./globe.js";

import {
    GLOBE_RADIUS,
    PARTICLE_COUNT,
    GLOBE_COLOR,
    GLOBE_POSITION
} from "./constants.js";
// ==========================================================
// PARTICLE POSITIONS (FIBONACCI SPHERE)
// ==========================================================

const positions = [];

const goldenAngle = Math.PI * (3 - Math.sqrt(5));

for (let i = 0; i < PARTICLE_COUNT; i++) {

    const y = 1 - (i / (PARTICLE_COUNT - 1)) * 2;

    const radius = Math.sqrt(1 - y * y);

    const theta = goldenAngle * i;

    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;

    positions.push(

        x * GLOBE_RADIUS,

        y * GLOBE_RADIUS,

        z * GLOBE_RADIUS

    );

}
// ==========================================================
// GEOMETRY
// ==========================================================

export const particleGeometry = new THREE.BufferGeometry();

particleGeometry.setAttribute(

    "position",

    new THREE.Float32BufferAttribute(

        positions,

        3

    )

);
// ==========================================================
// COLORS
// ==========================================================

const colors = [];

for (let i = 0; i < PARTICLE_COUNT; i++) {

    colors.push(

        0.35,
        0.88,
        1.0

    );

}

particleGeometry.setAttribute(

    "color",

    new THREE.Float32BufferAttribute(

        colors,

        3

    )

);

// ==========================================================
// MATERIAL
// ==========================================================

const particleMaterial = new THREE.PointsMaterial({

    size: 0.018,

    vertexColors: true,

    transparent: true,

    opacity: 0.95,

    depthWrite: false,

    blending: THREE.AdditiveBlending

});

// ==========================================================
// GLOBE
// ==========================================================

export const globe = new THREE.Points(

    particleGeometry,

    particleMaterial

);

globe.position.set(

    GLOBE_POSITION.x,

    GLOBE_POSITION.y,

    GLOBE_POSITION.z

);

scene.add(globe);

// ==========================================================
// ATMOSPHERE
// ==========================================================

export const atmosphere = new THREE.Mesh(

    new THREE.SphereGeometry(

        GLOBE_RADIUS + 0.08,

        64,

        64

    ),

    new THREE.MeshBasicMaterial({

        color: GLOBE_COLOR,

        transparent: true,

        opacity: 0.08,

        side: THREE.BackSide

    })

);

atmosphere.position.copy(globe.position);

scene.add(atmosphere);
// ==========================================================
// NODE GROUP
// ==========================================================

export const nodeGroup = new THREE.Group();

nodeGroup.position.copy(globe.position);

scene.add(nodeGroup);

// ==========================================================
// NODE STORAGE
// ==========================================================

export const nodes = [];

// ==========================================================
// LAT/LON HELPER
// ==========================================================

export function latLonToVector(lat, lon, radius = GLOBE_RADIUS) {

    const phi = (90 - lat) * Math.PI / 180;

    const theta = (lon + 180) * Math.PI / 180;

    return new THREE.Vector3(

        -radius * Math.sin(phi) * Math.cos(theta),

        radius * Math.cos(phi),

        radius * Math.sin(phi) * Math.sin(theta)

    );

}
