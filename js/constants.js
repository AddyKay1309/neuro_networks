// ==========================================================
// GLOBE
// ==========================================================

export const GLOBE_RADIUS = 1.45;
export const PARTICLE_COUNT = 5000;
export const STAR_COUNT = 7000;
export const GLOBE_COLOR = 0x58dfff;

export const GLOBE_POSITION = {

    x: 2.5,
    y: 0,
    z: 0

};

// ==========================================================
// ANIMATION
// ==========================================================

export const GLOBE_ROTATION_SPEED = 0.0012;
export const FLOAT_HEIGHT = 0.08;
export const FLOAT_SPEED = 0.8;
export const NODE_PULSE_SPEED = 2.2;

// ==========================================================
// NETWORK COLORS
// ==========================================================

export const NODE_COLOR = 0xffffff;
export const TRAIL_COLOR = 0x6fdcff;

// ==========================================================
// NETWORK NODES
// ==========================================================

export const NETWORK_NODES = [

    {
        name: "Michigan",
        lat: 42.28,
        lon: -83.74
    },

    {
        name: "Toronto",
        lat: 43.65,
        lon: -79.38
    },

    {
        name: "London",
        lat: 51.50,
        lon: -0.12
    },

    {
        name: "Bangalore",
        lat: 12.97,
        lon: 77.59
    }

];

// ==========================================================
// CONNECTIONS
// ==========================================================

export const CONNECTIONS = [

    [0,1],
    [1,2],
    [2,3],
    [3,0],
    [0,2],
    [1,3]

];