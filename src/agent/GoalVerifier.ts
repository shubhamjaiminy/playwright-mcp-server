import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

export class GoalVerifier {

  private client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
  });

  async verify(
    goal: string,
    page: any,
    screenshot: string
  ) {

    console.log("\n🔍 Verifying Goal Completion...");

    const prompt = `
You are a QA test verification agent.

Determine whether the user's goal has actually been completed.

USER GOAL:
${goal}

CURRENT PAGE MEMORY:
${JSON.stringify(page, null, 2)}

Return ONLY valid JSON.

If the goal is completed:

{
  "status": "PASS",
  "reason": "..."
}

If the goal is not completed:

{
  "status": "FAIL",
  "reason": "..."
}
`;

    const response =
      await this.client.chat.completions.create({

        model: process.env.OPENROUTER_MODEL!,

        temperature: 0,

        messages: [

          {
            role: "system",
            content:
              "You are a strict QA verification agent. Return only valid JSON."
          },

          {
            role: "user",

            content: [

              {
                type: "text",
                text: prompt
              },

              {
                type: "image_url",

                image_url: {
                  url:
                    `data:image/png;base64,${screenshot}`
                }
              }

            ]

          }

        ]

      });

    const text =
      response.choices[0].message.content ?? "";

    console.log("\n========== VERIFICATION RESPONSE ==========");
    console.log(text);
    console.log("============================================");

    const json =
      text.match(/\{[\s\S]*\}/);

    if (!json) {

      throw new Error(
        "Goal verifier returned invalid JSON."
      );

    }

    return JSON.parse(json[0]);

  }

}