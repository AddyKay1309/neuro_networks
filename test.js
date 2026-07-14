import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

try {

  const response = await ai.models.generateContent({

    model: "gemini-3.5-flash",

    contents: "Say hello in one word."

  });

  console.log(response.text);

} catch (err) {

  console.dir(err, { depth: null });

}