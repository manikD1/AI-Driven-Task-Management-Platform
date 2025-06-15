import express from 'express';
import OpenAI from "openai";
import dotenv from 'dotenv';
import verifyToken from '../middleware/verifyToken.js';

dotenv.config();
const router = express.Router();

// Set up OpenAI instance
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * ROUTE 1: Refine Task in English
 * POST /api/ai/refine-task
 * Request body: { rawTask: "input string" }
 * Returns: { refinedTask: "Refined English task" }
 */
router.post('/refine-task', verifyToken, async (req, res) => {
  const { rawTask } = req.body;
  const prompt = `Rewrite the following to-do task in clear, professional English. Translate to English if it's in any other language:\nTask: "${rawTask}"\nRefined:`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 40,
      temperature: 0.3,
    });
    const refinedTask = response.choices[0].message.content.trim();
    res.json({ refinedTask });
  } catch (err) {
    console.error('AI refinement error:', err);
    res.status(500).json({ error: 'AI request failed', details: err.message });
  }
});

/**
 * ROUTE 2: Suggest Tasks in English
 * POST /api/ai/suggest-tasks
 * Request body: { todos: [ "list", "of", "tasks" ] }
 * Returns: { suggestions: "suggestion1\nsuggestion2\nsuggestion3" }
 */
router.post('/suggest-tasks', verifyToken, async (req, res) => {
  const { todos } = req.body;
  const safeTodos = todos && todos.length > 0 ? todos : ["nothing yet"];
  const prompt = `My to-do list: ${safeTodos.join('; ')}\nSuggest 3 new productive tasks I could add (reply in English only):`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    });

    const aiText = response.choices[0].message.content;
    res.json({ suggestions: aiText });
  } catch (err) {
    console.error('AI suggestions error:', err);
    res.status(500).json({ error: 'AI request failed', details: err.message });
  }
});

export default router;