import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get("/", (req, res) => {
    res.json({ message: "JobFit AI API is running" });
});

app.post("/api/analyze", async (req, res) => {
  const { resumeText, jobDescription } = req.body;

  const prompt = `Compare this resume:\n${resumeText}\n\nWith this job description:\n${jobDescription}\n\nRate match percentage from 0-100.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "system", content: prompt }],
  });

  res.json({ matchScore: response.choices[0]?.message?.content || "0" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));