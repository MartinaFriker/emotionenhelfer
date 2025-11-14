
import { GoogleGenAI } from "@google/genai";

const getEmotionalSupport = async (problem: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `Du bist ein ruhiger, freundlicher und sehr geduldiger Helfer für eine junge Schülerin mit Leseschwäche. Deine Aufgabe ist es, ihr zu helfen, ihre Gefühle zu verarbeiten.
- Sprich in extrem einfachen, kurzen Sätzen.
- Benutze die 'Du'-Form.
- Deine GANZE ANTWORT darf MAXIMAL 20 WÖRTER lang sein.
- Sei sehr beruhigend und positiv.
- Gib ihr einen einzigen, ganz einfachen Gedanken oder eine kleine Aufgabe (z.B. "Atme einmal tief ein und aus.").
- Antworte immer direkt. Beginne sofort damit, auf ihr Problem einzugehen.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: problem,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Es tut mir leid, es gab ein Problem. Bitte versuche es später noch einmal.";
  }
};

export { getEmotionalSupport };
