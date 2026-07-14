// ==========================================================
// LABEL CREATOR
// ==========================================================

function createLabel(text) {

    const canvas = document.createElement("canvas");

    const ctx = canvas.getContext("2d");

    canvas.width = 256;
    canvas.height = 64;

    ctx.font = "28px Inter, Arial";
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(

        text,

        canvas.width / 2,

        canvas.height / 2

    );

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.SpriteMaterial({

        map: texture,

        transparent: true,

        depthWrite: false

    });

    const sprite = new THREE.Sprite(material);

    sprite.scale.set(

        0.55,

        0.14,

        1

    );

    return sprite;

}
import * as THREE from "three";

import { globe, latLonToVector } from "./particleGlobe.js";

import {
    NETWORK_NODES,
    CONNECTIONS
} from "./constants.js";

// ==========================================================
// STORAGE
// ==========================================================

export const cityNodes = [];
export const networkLines = [];
export const pulseObjects = [];

// ==========================================================
// CITY NODES
// ==========================================================

const nodeGeometry = new THREE.SphereGeometry(
    0.03,
    16,
    16
);

const nodeMaterial = new THREE.MeshBasicMaterial({

    color: 0x00ffff

});

NETWORK_NODES.forEach(city => {

    const mesh = new THREE.Mesh(

        nodeGeometry,

        nodeMaterial.clone()

    );

    mesh.position.copy(

        latLonToVector(
            city.lat,
            city.lon,
            1.48
        )

    );

    // ---------------------------------------------
    // Glow state
    // ---------------------------------------------

    mesh.userData = {

        glow: 0

    };

    globe.add(mesh);

    const label = createLabel(city.name);

label.position.copy(mesh.position);

label.position.multiplyScalar(1.12);

globe.add(label);

mesh.userData.label = label;

    cityNodes.push(mesh);

});

// ==========================================================
// CONNECTIONS
// ==========================================================

const lineMaterial = new THREE.LineBasicMaterial({

    color: 0x6fdcff,

    transparent: true,

    opacity: 0.45

});

CONNECTIONS.forEach(([a, b]) => {

    const start = cityNodes[a].position.clone();

    const end = cityNodes[b].position.clone();

    const mid = start.clone()
        .add(end)
        .multiplyScalar(0.5);

    mid.normalize().multiplyScalar(1.9);

    const curve = new THREE.QuadraticBezierCurve3(

        start,

        mid,

        end

    );

    const geometry = new THREE.BufferGeometry().setFromPoints(

        curve.getPoints(100)

    );

    const line = new THREE.Line(

        geometry,

        lineMaterial.clone()

    );

    globe.add(line);

    networkLines.push({

        line,

        curve

    });

});

// ==========================================================
// PULSES
// ==========================================================

const pulseGeometry = new THREE.SphereGeometry(

    0.02,

    12,

    12

);

const pulseMaterial = new THREE.MeshBasicMaterial({

    color: 0xffffff

});

networkLines.forEach(({ curve }) => {

    const pulse = new THREE.Mesh(

        pulseGeometry,

        pulseMaterial.clone()

    );

    pulse.userData = {

        curve,

        progress: Math.random()

    };

    globe.add(pulse);

    pulseObjects.push(pulse);

}); const LABEL_OFFSETS = {

    Michigan: new THREE.Vector3(-0.28, 0.16, 0),

    Toronto: new THREE.Vector3(0.28, -0.08, 0),

    London: new THREE.Vector3(0.12, 0.10, 0),

    Bangalore: new THREE.Vector3(0.12, -0.10, 0)

};
