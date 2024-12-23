import { Anthropic } from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const generateAnswer = async (prompt: string) => {
  const msg = await anthropic.messages.create({
    model: "claude-3-5-haiku-20241022",
    max_tokens: 8000,
    temperature: 0,
    system:
      "You are a helpful assistant. You are given a prompt and you need to answer the prompt. And your response format is {[{question, answer},{question, answer}]}",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt,
          },
        ],
      },
    ],
  });

  const messageContent =
    msg.content[0].type === "text" ? msg.content[0].text : "";
  if (!messageContent) {
    throw new Error("Unexpected message format");
  }

  const jsonStartIndex = messageContent.indexOf("{");
  const jsonEndIndex = messageContent.lastIndexOf("}") + 1;

  // Extract the JSON substring
  let jsonString = messageContent.slice(jsonStartIndex, jsonEndIndex);
  console.log(jsonString);
  return jsonString;
};
