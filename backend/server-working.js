import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// ======================================================
// GEMINI SETUP
// ======================================================

if (!process.env.GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY not found.");
    process.exit(1);
}

console.log("✅ Gemini key loaded");
console.log(
    "Key starts with:",
    process.env.GEMINI_API_KEY.substring(0, 8) + "..."
);

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// ======================================================
// SYSTEM PROMPT
// ======================================================

const SYSTEM_PROMPT = `
You are Neuro, the AI assistant for Neuro-Networks.

Neuro-Networks is a nonprofit dedicated to education,
research, advocacy, and support for individuals affected
by brachial plexus injuries.

Be:
- Friendly
- Warm
- Professional
- Encouraging

Rules:
- Never diagnose.
- Never replace a physician.
- Explain medical topics simply.
- Encourage users to seek medical care when appropriate.
- Answer questions about brachial plexus injuries,
research, recovery, volunteering, events,
care packages, and Neuro-Networks.
`;

// ======================================================
// HOME
// ======================================================

app.get("/", (req, res) => {
    res.send("🧠 Neuro backend is alive!");
});

// ======================================================
// CHAT
// ======================================================

app.post("/chat", async (req, res) => {

    try {

        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                reply: "No message provided."
            });
        }

        console.log("\n==============================");
        console.log("📩 USER:", message);
        console.log("==============================");
        console.log("🚀 Calling Gemini...");

        const response = await ai.models.generateContent({

            model: "gemini-3.5-flash",

            contents: `
${SYSTEM_PROMPT}

User:
${message}

Neuro:
`

        });

        console.log("✅ Gemini replied");
        console.log(response.text);

        res.json({
            reply: response.text
        });

    } catch (error) {

        console.log("\n========== GEMINI ERROR ==========\n");

        console.dir(error, { depth: null });

        console.log("\nMessage:");
        console.log(error?.message);

        console.log("\nStatus:");
        console.log(error?.status);

        console.log("\nStack:");
        console.log(error?.stack);

        console.log("\n==================================\n");

        res.status(500).json({
            reply: "💙 Sorry! My AI brain is taking a quick break."
        });

    }

});

// ======================================================
// START
// ======================================================

app.listen(PORT, () => {

    console.log(`🧠 Neuro backend running on http://localhost:${PORT}`);

});