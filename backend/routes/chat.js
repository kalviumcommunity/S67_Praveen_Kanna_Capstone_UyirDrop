import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

const bloodDonationContext = `
You are an AI assistant specializing in blood donation. You help answer questions about:
- Blood donation process and eligibility
- Different blood types and compatibility
- Donation frequency and requirements
- Common concerns and misconceptions
- Post-donation care
- Emergency blood needs
- Blood storage and usage
Provide accurate, helpful, and concise responses. 
`;

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required.'});
    }

    const result = await model.generateContent([
      { role: 'user', parts: [{ text: `${bloodDonationContext}\n\nUser: ${message}` }] }
    ]);

    const responseText = await result.response.text();
    res.json({ reply: responseText });
  } catch (error) {
    console.error('Gemini API error:', error.message);
    res.status(500).json({
      reply: "I'm having trouble processing your request right now. Please try again"
    });
  }
});

export default router;