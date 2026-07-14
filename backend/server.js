import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// ======================================================
// API KEY
// ======================================================

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("❌ GEMINI_API_KEY missing.");
  process.exit(1);
}

console.log("✅ Gemini key loaded");
console.log("Key starts with:", API_KEY.slice(0, 8) + "...");

// ======================================================
// SYSTEM PROMPT
// ======================================================

const SYSTEM_PROMPT = `
You are Neuro, the official AI assistant for Neuro-Networks.

Neuro-Networks is a nonprofit organization dedicated to education,
research, advocacy, and support for brachial plexus injuries.

Mission:
Educate.
Advocate.
Empower.

Your personality:
• Friendly
• Confident
• Professional
• Encouraging
• Conversational

Rules:
• Never diagnose.
• Never replace a physician.
• Explain that every injury is unique.
• If recommending treatment locations, first ask what country the user lives in.
• Never invent facts.
• If unsure, admit it honestly.
• Keep answers concise unless asked for more detail.
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

    const MODEL = "gemini-flash-latest";

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${SYSTEM_PROMPT}

User:
${message}

Neuro:`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("\n===== GOOGLE RESPONSE =====");
    console.dir(data, { depth: null });
    console.log("===========================\n");

    if (!response.ok) {
      return res.status(response.status).json({
        reply: data.error?.message || "Gemini request failed."
      });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "I'm sorry, I couldn't generate a response.";

    res.json({
      reply
    });

  } catch (err) {

    console.error("\n========== SERVER ERROR ==========");
    console.error(err);
    console.error("==================================\n");

    res.status(500).json({
      reply: "Backend error."
    });

  }

});

// ======================================================
// START
// ======================================================

app.listen(PORT, () => {
  console.log(`🧠 Neuro backend running on http://localhost:${PORT}`);
});