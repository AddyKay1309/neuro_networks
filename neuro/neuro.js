// ==========================================================
// NEURO
// ==========================================================

const neuro = document.createElement("div");
neuro.id = "neuro";

// ==========================================================
// SHADOW
// ==========================================================

const shadow = document.createElement("div");
shadow.className = "neuro-shadow";

// ==========================================================
// ROBOT
// ==========================================================

const robot = document.createElement("div");
robot.className = "robot";

// ==========================================================
// ANTENNAS
// ==========================================================

const antennaLeft = document.createElement("div");
antennaLeft.className = "antenna left";

const antennaRight = document.createElement("div");
antennaRight.className = "antenna right";

const ballLeft = document.createElement("div");
ballLeft.className = "ball";

const ballRight = document.createElement("div");
ballRight.className = "ball";

antennaLeft.appendChild(ballLeft);
antennaRight.appendChild(ballRight);

// ==========================================================
// HEAD
// ==========================================================

const head = document.createElement("div");
head.className = "head";

// Eyes

const eyeLeft = document.createElement("div");
eyeLeft.className = "eye left";

const eyeRight = document.createElement("div");
eyeRight.className = "eye right";

// Mouth

const mouth = document.createElement("div");
mouth.className = "mouth";

// Cheeks

const cheekLeft = document.createElement("div");
cheekLeft.className = "cheek left";

const cheekRight = document.createElement("div");
cheekRight.className = "cheek right";

// Assemble Head

head.append(

    eyeLeft,
    eyeRight,
    mouth,
    cheekLeft,
    cheekRight

);

// ==========================================================
// BODY
// ==========================================================

const body = document.createElement("div");
body.className = "body";

// Screen

const screen = document.createElement("div");
screen.className = "screen";

// Screen Glow

const glow = document.createElement("div");
glow.className = "screen-glow";

screen.appendChild(glow);

body.appendChild(screen);

// ==========================================================
// ARMS
// ==========================================================

const leftArm = document.createElement("div");
leftArm.className = "arm left";

const rightArm = document.createElement("div");
rightArm.className = "arm right";

// ==========================================================
// LEGS
// ==========================================================

const leftLeg = document.createElement("div");
leftLeg.className = "leg left";

const rightLeg = document.createElement("div");
rightLeg.className = "leg right";

// ==========================================================
// ASSEMBLE ROBOT
// ==========================================================

robot.append(

    antennaLeft,
    antennaRight,

    head,

    body,

    leftArm,
    rightArm,

    leftLeg,
    rightLeg

);

neuro.append(

    shadow,
    robot

);

document.body.appendChild(neuro);

// ==========================================================
// CLICK
// ==========================================================

robot.addEventListener("click", () => {

    window.openNeuro();

});


// ==========================================================
// HOVER
// ==========================================================

robot.addEventListener("mouseenter", () => {

    robot.classList.add("hover");

});

robot.addEventListener("mouseleave", () => {

    robot.classList.remove("hover");

});
// ==========================================================
// SPEECH BUBBLE
// ==========================================================

const bubble = document.createElement("div");

bubble.className = "neuro-bubble";

bubble.innerHTML = `

    <strong>Hi! I'm Neuro 🧠 </strong><br>

    Ask me anything about
    <br>
    brachial plexus injuries,
    <br>
    research, or Neuro-Networks.

`;

neuro.appendChild(bubble);

// ==========================================================
// SHOW AFTER LOAD
// ==========================================================

setTimeout(() => {

    bubble.classList.add("show");

}, 1200);

// ==========================================================
// HIDE
// ==========================================================

setTimeout(() => {

    bubble.classList.remove("show");

}, 7000);

// ==========================================================
// SHOW ON HOVER
// ==========================================================

robot.addEventListener("mouseenter", () => {

    bubble.classList.add("show");

});

robot.addEventListener("mouseleave", () => {

    bubble.classList.remove("show");

});

// ==========================================================
// LITTLE WAVE
// ==========================================================

const rightArmElement = document.querySelector(".arm.right");

setTimeout(() => {

    rightArmElement.classList.add("wave");

}, 900);
