import Anthropic, { HUMAN_PROMPT, AI_PROMPT } from "@anthropic-ai/sdk";

export const getAIMessage = (userMessage) => {
  return new Promise((resolve) => {
    // Timeout Temporary - for UI demo purposes
    setTimeout(() => {
      const anthropic = new Anthropic({
        apiKey: "YOUR API KEY"
      });
      async function main() {
        const completion = await anthropic.completions.create({
          model: "claude-2",
          max_tokens_to_sample: 30000,
          prompt: `${HUMAN_PROMPT} ${userMessage} ${AI_PROMPT}`,
        });
        console.log("from chat" , userMessage)
        console.log(completion.completion);
        return completion.completion;
      }
      const aiMessage = main().catch(console.error);
      resolve(aiMessage);
    }, 1000);
  });
};
