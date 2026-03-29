import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const API_KEY = process.env.GROQ_API_KEY;

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    console.log("📩 Сообщение:", message);

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          { role: "system", content: "Ты Uzbek AI — умный ассистент." },
          { role: "user", content: message }
        ]
      })
    });
const data = await response.json();

console.log("GROQ STATUS:", response.status);
console.log("GROQ RESPONSE:", data);

if (!response.ok) {
  return res.json({
    reply: "Ошибка API: " + (data.error?.message || "неизвестно")
  });
}

res.json({
  reply: data.choices[0].message.content
});
