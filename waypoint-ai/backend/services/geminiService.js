import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export async function askGemini(prompt) {
  try {
    const result = await model.generateContent(prompt);

    return (
      result.response.text() ||
      "Sorry, I couldn't generate a response."
    );
  } catch (error) {
    console.error("Gemini Error:", error);

    return "Gemini API Error.";
  }
}