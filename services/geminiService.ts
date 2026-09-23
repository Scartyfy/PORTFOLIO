import { GoogleGenAI } from "@google/genai";
import { CardReading, Language } from "../types";

const API_KEY = process.env.API_KEY || '';

export const getCardReading = async (userQuery?: string, lang: Language = 'fr'): Promise<CardReading> => {
  if (!API_KEY) {
    return {
      cardName: lang === 'fr' ? "La Clé Manquante" : "The Missing Key",
      reading: lang === 'fr' ? "Les cartes sont silencieuses." : "The cards remain silent."
    };
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const langText = lang === 'fr' ? "EN FRANÇAIS" : "IN ENGLISH";

  try {
    const prompt = userQuery 
      ? `User asks: "${userQuery}". Act as a mysterious magician performing a card trick. Pick a card that represents the answer, and give a short, cryptic yet inspiring interpretation ${langText} (max 50 words).`
      : `Act as a mysterious magician revealing the final card of a trick. The card is "The Designer's Ace". Explain ${langText} what this card means for creativity and precision (max 50 words).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `You are a minimalist magician/designer. Elegant, enigmatic tone. ALWAYS RESPOND ${langText}.`,
      }
    });

    const text = response.text || "...";
    return {
      cardName: lang === 'fr' ? "L'As du Design" : "The Designer's Ace",
      reading: text.trim()
    };
  } catch (error) {
    return {
      cardName: "...",
      reading: "..."
    };
  }
};