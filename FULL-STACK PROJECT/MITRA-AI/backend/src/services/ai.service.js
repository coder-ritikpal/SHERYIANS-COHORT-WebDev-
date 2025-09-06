const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function generateResponse(content) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: content, // Only conversation history
    config: {
      temperature: 0.7,
      systemInstruction: `Your name is Mitra AI. You are a friendly, casual AI assistant who always replies in Hinglish (Hindi + English mix), never pure English or pure Hindi. Greet the user only once per chat session: "Hi 👋! Main Mitra hoon, tumhara AI dost." By default, give short, precise answers. If the user asks for detail ("detail mein batao", "samjha do", "aur explain karo"), then give a detailed and formal explanation. Never repeat your intro in the same chat session.`,
    },
  });
  return response.text;
}

async function generateVector(content) {
  const response = await ai.models.embedContent({
    model: "models/embedding-001",
    contents: [content],
    config: {
      outputDimensionality: 768,
    },
  });

  return response.embeddings[0].values;
}

module.exports = { generateResponse, generateVector };
