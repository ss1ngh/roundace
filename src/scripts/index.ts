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
  // Mock mode for testing (avoid predefined questions)
  const isMock = import.meta.env.VITE_MOCK_API === 'true';
  if (isMock) {
    console.log('Using mocked AI response');
    // Simulate random questions based on prompt context
    const techStackMatch = prompt.match(/Tech Stacks: (.*?)(?:\n|$)/)?.[1] || 'JavaScript';
    const questionTypes = ['coding', 'system design', 'behavioral', 'algorithmic'];
    const questions = Array.from({ length: 5 }, (_, i) => {
      const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      return {
        question: `Random ${type} question about ${techStackMatch} #${i + 1}`,
        answer: `Detailed answer for a ${type} question related to ${techStackMatch}.`,
      };
    });
    return JSON.stringify(questions);
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
      throw new Error("Empty response from API");
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

export const parseJobDescription = async (jobDescription: string): Promise<{
  position: string;
  description: string;
  experience: number;
  techStack: string;
}> => {
  const prompt = `
    As an experienced prompt engineer, analyze the following job description and extract the following details in a JSON object:
    - position: The job title (e.g., "Frontend Developer")
    - description: A summary of the role and responsibilities (100-500 characters)
    - experience: The number of years of experience required (extract a number, default to 0 if not specified)
    - techStack: A comma-separated list of technologies mentioned (e.g., "React, TypeScript, Node.js")

    Job Description:
    ${jobDescription}

    Format the output strictly as a JSON object without any additional labels, code blocks, or explanations. Return only the JSON object.
    Example:
    {
      "position": "Frontend Developer",
      "description": "Develop and maintain web applications using React and TypeScript.",
      "experience": 3,
      "techStack": "React, TypeScript, Node.js"
    }
  `;

  try {
    const aiResult = await generateAIContent(prompt);
    let cleanText = aiResult.trim().replace(/(json|`)/g, "");
    const jsonObjectMatch = cleanText.match(/\{.*\}/s);
    if (!jsonObjectMatch) {
      throw new Error("No JSON object found in response");
    }
    return JSON.parse(jsonObjectMatch[0]);
  } catch (error) {
    console.error("Error parsing job description:", error);
    throw new Error("Failed to parse job description. Please try again.");
  }
};