import {
  GoogleGenerativeAI,
  SingleRequestOptions,
} from "@google/generative-ai";

const gemini = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

const model = gemini.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const generateAnswer = async (prompt: string) => {
  const response = await model.generateContent(
    prompt,
    generationConfig as SingleRequestOptions
  );
  return response.response.text();
};
