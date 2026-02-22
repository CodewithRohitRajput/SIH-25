import express from "express";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const API_KEY = process.env.OPENROUTER_API_KEY;
if (!API_KEY) {
  throw new Error("OpenRouter API key is not present in .env");
}

// POST /gemini/ask
router.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Question not found" });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          {
            role: "system",
            content:
              "You are a cybersecurity expert. Only answer questions related to cybersecurity, digital threats, online safety, or best practices. Keep answers short (max 3-4 sentences), clear, and in plain text only. Do not use bullet points, *, _, #, (), or markdown.",
          },
          {
            role: "user",
            content: question,
          },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("OpenRouter error:", err);
      return res.status(500).json({ error: "Failed to get response from OpenRouter" });
    }

    const data = await response.json();
    let answer = data.choices?.[0]?.message?.content ?? "";

    // Sanitize unwanted symbols
    answer = answer.replace(/[*_#`()]/g, "").trim();

    return res.status(200).json({ answer });
  } catch (error) {
    console.error("OpenRouter API Error:", error);
    return res.status(500).json({ error: "Failed to get response from OpenRouter" });
  }
});

export default router;