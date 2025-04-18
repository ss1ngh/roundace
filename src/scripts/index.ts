import { GoogleGenAI } from '@google/genai';

const geminiClient = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const config = {
  responseMimeType: 'text/plain',
};

const model = 'gemini-2.5-pro-preview-03-25';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateAIContent = async (prompt: string, retries = 3): Promise<string> => {
  try {
    const contents = [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ];

    const response = await geminiClient.models.generateContentStream({
      model,
      config,
      contents,
    });

    let responseText = '';
    for await (const chunk of response) {
      responseText += chunk.text;
    }

    return responseText;
  } catch (error: any) {
    // Handle rate limiting (429)
    if (error?.status === 429 && retries > 0) {
      // Exponential backoff: wait longer between each retry
      const waitTime = Math.pow(2, 4 - retries) * 1000; // 1s, 2s, 4s
      console.log(`Rate limited. Retrying in ${waitTime/1000}s... (${retries} retries left)`);
      await delay(waitTime);
      return generateAIContent(prompt, retries - 1);
    }

    console.error('Error generating AI content:', error);
    throw new Error(error?.message || 'Failed to generate AI content');
  }
};