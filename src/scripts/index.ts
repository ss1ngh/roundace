import { GoogleGenAI } from '@google/genai';

const geminiClient = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const config = {
  responseMimeType: 'text/plain',
};

const model = "gemini-2.5-pro-exp-03-25"

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateAIContent = async (prompt: string, retries = 3): Promise<string> => {
  // Mock mode for testing
  const isMock = import.meta.env.VITE_MOCK_API === 'true';
  if (isMock) {
    console.log('Using mocked AI response');
    return JSON.stringify([
      { question: 'What is React?', answer: 'React is a JavaScript library for building user interfaces.' },
      { question: 'Explain useEffect.', answer: 'useEffect is a React hook for handling side effects.' },
      { question: 'What is TypeScript?', answer: 'TypeScript is a typed superset of JavaScript.' },
      { question: 'What is Node.js?', answer: 'Node.js is a runtime for executing JavaScript server-side.' },
      { question: 'What is a closure?', answer: 'A closure is a function that retains access to its lexical scope.' },
    ]);
  }

  try {
    const contents = [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ];

    console.log(`Making API call at ${new Date().toISOString()} with model: ${model}`);
    const response = await geminiClient.models.generateContentStream({
      model,
      config,
      contents,
    });

    let responseText = '';
    for await (const chunk of response) {
      if (!chunk.text) {
        console.warn('Received empty chunk from API');
        continue;
      }
      responseText += chunk.text;
    }

    if (!responseText) {
      throw new Error('Empty response from API');
    }

    return responseText;
  } catch (error: any) {
    console.error('Error generating AI content:', {
      message: error?.message,
      status: error?.status,
      code: error?.code,
      response: error?.response,
    });

    if ((error?.status === 429 || error?.code === 429) && retries > 0) {
      const waitTime = Math.pow(2, 4 - retries + 3) * 1000; // 10s, 20s, 40s
      console.log(`Rate limited. Retrying in ${waitTime / 1000}s... (${retries} retries left)`);
      await delay(waitTime);
      return generateAIContent(prompt, retries - 1);
    }

    throw new Error(error?.message || 'Failed to generate AI content. Rate limit may have been exceeded.');
  }
};