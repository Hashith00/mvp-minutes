import { generateAnswer } from "@/utils/LLMs/anthropic";

export async function POST(request: Request) {
  const { prompt } = await request.json();
  const response = await generateAnswer(prompt);
  return new Response(JSON.stringify(response));
}
