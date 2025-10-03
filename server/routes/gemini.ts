import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error(" Gemini key is not present in .env");
}

const genAI = new GoogleGenerativeAI(API_KEY!);

// POST /gemini/ask
router.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: " Question not found" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Cybersecurity-focused prompt
    const prompt = `
    You are a cybersecurity expert. 
    Only answer questions related to cybersecurity, digital threats, online safety, or best practices.
    "

    Keep answers short (max 3–4 sentences), clear, and in plain text only.
    Do not use bullet points, *, _, #, (), or markdown.
    Question: ${question}
    `;

    const result = await model.generateContent(prompt);
    let answer = result.response.text();

    // Sanitize unwanted symbols
    answer = answer.replace(/[*_#`()]/g, "").trim();

    return res.status(200).json({ answer });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ error: "Failed to get response from Gemini" });
  }
});

export default router;
