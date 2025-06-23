
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Ensure API_KEY is available in the environment.
// The build process or environment setup (e.g., Vite's import.meta.env, Webpack's DefinePlugin, or server-side environment variables)
// must make this available. For client-side React apps built with Vite, you'd use import.meta.env.VITE_API_KEY.
// For this general purpose, we assume process.env.API_KEY is somehow populated.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This error will be thrown when the module is loaded if API_KEY is not set.
  // In a real app, you might want to handle this more gracefully, perhaps by disabling
  // the feature or showing a message in the UI, but this service can't operate without it.
  console.error("API_KEY for Gemini is not configured. Please set process.env.API_KEY.");
  // To prevent the app from completely crashing if this file is imported,
  // we could return a dummy AI client or throw error later.
  // For now, let's allow it to proceed and fail on first API call if key is missing.
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "MISSING_API_KEY" }); // Provide a fallback to prevent immediate crash if key is undefined

export async function generateCodeWithGemini(userPrompt: string, language: string): Promise<string> {
  if (!API_KEY) {
    throw new Error("Gemini API Key is not configured. Cannot generate code.");
  }

  const model = 'gemini-2.5-flash-preview-04-17';
  
  const fullPrompt = `
You are an expert code generation assistant.
Your task is to generate a high-quality, functional code snippet based on the user's request.
Programming Language: ${language}
User Request: "${userPrompt}"

Please adhere to the following guidelines:
1.  Provide only the code snippet itself.
2.  Do NOT include any explanatory text, greetings, or sign-offs before or after the code block.
3.  If any brief explanation is absolutely necessary, include it as comments within the code.
4.  Ensure the code is well-formatted and idiomatic for the specified language.
5.  If the request is ambiguous or lacks detail, try to generate a common or best-practice implementation.
6.  If the request is for something that cannot be reasonably expressed in a single snippet (e.g. "build a whole app"), provide a core functional part or a starting point.
7.  Do not use markdown code fences (like \`\`\`${language} ... \`\`\`) around the code. Just output the raw code.
`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: fullPrompt,
      config: {
        temperature: 0.5, // A bit of creativity but still focused
        topP: 0.95,
        topK: 40,
        // Using thinkingConfig: { thinkingBudget: 0 } might be too restrictive for code generation,
        // as it might need some "thinking" to produce good code.
        // For higher quality code, it's better to omit thinkingConfig or allow some budget.
        // We will omit it for now to default to enabled thinking.
      }
    });
    
    const generatedText = response.text;

    if (!generatedText || generatedText.trim() === '') {
        throw new Error('Received an empty response from the AI. Try rephrasing your prompt.');
    }
    
    // Sometimes the model might still wrap in markdown despite instructions.
    // Basic attempt to remove it if present.
    let code = generatedText.trim();
    const fenceRegex = /^```(?:\w+)?\s*\n?(.*?)\n?\s*```$/s;
    const match = code.match(fenceRegex);
    if (match && match[1]) {
      code = match[1].trim();
    }

    return code;

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    if (error instanceof Error && error.message.includes("API key not valid")) {
        throw new Error('The provided Gemini API Key is not valid. Please check your configuration.');
    }
    if (error instanceof Error && error.message.includes("quota")) {
        throw new Error('You have exceeded your Gemini API quota. Please check your usage limits.');
    }
    throw new Error(`Failed to generate code: ${error instanceof Error ? error.message : String(error)}`);
  }
}
