import { askNeuro } from "./api.js";

// ==========================================================
// CHAT PANEL
// ==========================================================

const panel = document.createElement("div");

panel.id = "neuro-chat";

panel.innerHTML = `

<div class="chat-header">

    <div class="chat-title">

    <span class="neuro-face">


    </span>

    <span>

        Neuro

    </span>

</div>
    <button class="chat-close">
        ✕
    </button>

</div>

<div class="chat-body">

    <div class="messages">

        <div class="message neuro-message">

            <strong>Hi! I'm Neuro 👋</strong>

            <br><br>

            I'm here to answer questions about

            <br>• Brachial Plexus Injury
            <br>• Neuro-Networks
            <br>• Research
            <br>• Recovery
            <br>• Events

        </div>

    </div>

    <div class="quick-buttons">

        <button>🧠 What is BPI?</button>
        <button>👶 My child was diagnosed</button>
        <button>🔬 Research</button>
        <button>🤝 Volunteer</button>

    </div>

</div>

<div class="chat-input">

    <input
        type="text"
        placeholder="Ask Neuro anything..."
    >

    <button class="send-button">
        ➜
    </button>

</div>

`;

document.body.appendChild(panel);

// ==========================================================
// OPEN
// ==========================================================

window.openNeuro = () => {

    panel.classList.add("open");

};

// ==========================================================
// CLOSE
// ==========================================================

panel.querySelector(".chat-close").addEventListener("click", () => {

    panel.classList.remove("open");

});

// ==========================================================
// ELEMENTS
// ==========================================================

const input = panel.querySelector("input");

const sendButton = panel.querySelector(".send-button");

const messages = panel.querySelector(".messages");

const quickButtons = panel.querySelector(".quick-buttons");

// ==========================================================
// HELPERS
// ==========================================================

function scrollToBottom(){

    messages.scrollTop = messages.scrollHeight;

}

function addUserMessage(text){

    const message = document.createElement("div");

    message.className = "message user-message";

    message.textContent = text;

    messages.appendChild(message);

    scrollToBottom();

}
// ==========================================================
// TYPING INDICATOR
// ==========================================================

let typingBubble = null;

function showTyping(){

    typingBubble = document.createElement("div");

    typingBubble.className = "message neuro-message typing";

    typingBubble.innerHTML = `

        <span></span>
        <span></span>
        <span></span>

    `;

    messages.appendChild(typingBubble);

    scrollToBottom();

}

function hideTyping(){

    if(typingBubble){

        typingBubble.remove();

        typingBubble = null;

    }

}

function addNeuroMessage(text){

    const message = document.createElement("div");

    message.className = "message neuro-message";

    message.textContent = text;

    messages.appendChild(message);

    scrollToBottom();

}

/// ==========================================================
// SEND MESSAGE
// ==========================================================

async function sendMessage(){

    const text = input.value.trim();

    if(!text) return;

    addUserMessage(text);

    input.value = "";

    quickButtons.style.display = "none";

    showTyping();

    try{

        const reply = await askNeuro(text);

        hideTyping();

        addNeuroMessage(reply);

    }

    catch(error){

        console.error(error);

        hideTyping();

        addNeuroMessage(

            "💙 Sorry! I couldn't connect right now. I'm still learning and my AI brain isn't available yet."

        );

    }

}

// ==========================================================
// SEND BUTTON
// ==========================================================

sendButton.addEventListener("click", sendMessage);

// ==========================================================
// ENTER KEY
// ==========================================================

input.addEventListener("keydown", (e) => {

    if(e.key === "Enter"){

        sendMessage();

    }

});

// ==========================================================
// QUICK BUTTONS
// ==========================================================

panel.querySelectorAll(".quick-buttons button").forEach(button => {

    button.addEventListener("click", () => {

        input.value = button.textContent;

        sendMessage();

    });

});
// ==========================================================
// LITTLE BOUNCE
// ==========================================================

const robotFace = panel.querySelector(".neuro-face");

function bounceRobot(){

    robotFace.animate(

        [

            {
                transform:"translateY(0px)"
            },

            {
                transform:"translateY(-4px)"
            },

            {
                transform:"translateY(0px)"
            }

        ],

        {

            duration:550,

            easing:"ease-out"

        }

    );

}

setInterval(bounceRobot,8000);