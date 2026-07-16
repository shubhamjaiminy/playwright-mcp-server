import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

export class GoalVerifier {

    private client = new OpenAI({

        apiKey:
            process.env.OPENROUTER_API_KEY,

        baseURL:
            "https://openrouter.ai/api/v1",

        defaultHeaders: {

            "HTTP-Referer":
                "http://localhost:3000",

            "X-Title":
                "AI Test Automation Framework",

        },

    });


    private parseJson(
        text: string
    ): any {

        const cleaned =
            text
                .replace(
                    /```json/gi,
                    ""
                )
                .replace(
                    /```/g,
                    ""
                )
                .trim();

        const start =
            cleaned.indexOf("{");

        const end =
            cleaned.lastIndexOf("}");

        if (

            start === -1 ||
            end === -1 ||
            end <= start

        ) {

            throw new Error(
                "Goal verifier returned invalid JSON."
            );

        }

        const json =
            cleaned.substring(
                start,
                end + 1
            );

        try {

            return JSON.parse(
                json
            );

        }

        catch {

            throw new Error(
                "Goal verifier returned malformed JSON."
            );

        }

    }


    async verify(

        goal: string,

        page: any,

        screenshot: string

    ) {

        console.log(
            "\n🔍 Verifying Goal Completion..."
        );

        const prompt = `

You are a QA test result verifier.

Determine whether the user's goal has been completed successfully.

USER GOAL:

${goal}

CURRENT PAGE MEMORY:

${JSON.stringify(
    page,
    null,
    2
)}

The current browser screenshot is also available.

Return ONLY this exact JSON format:

{
  "status": "PASS",
  "reason": "Short explanation"
}

OR:

{
  "status": "FAIL",
  "reason": "Short explanation"
}

Rules:

- Return ONLY JSON.
- Do NOT return markdown.
- Do NOT return explanations outside JSON.
- Do NOT return safety classifications.
- Do NOT return "User Safety".
- Do NOT return analysis.
- The status must be exactly PASS or FAIL.
`;

        const response =
            await this.client.chat.completions.create({

                model:
                    process.env.OPENROUTER_MODEL!,

                temperature:
                    0,

                messages: [

                    {

                        role:
                            "system",

                        content:
                            `
You are a strict QA verification engine.

Return ONLY valid JSON.

Never return:
- User Safety
- safety classifications
- explanations outside JSON
- markdown
- analysis
- commentary
`
                    },

                    {

                        role:
                            "user",

                        content: [

                            {

                                type:
                                    "text",

                                text:
                                    prompt

                            },

                            {

                                type:
                                    "image_url",

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
            response
                .choices?.[0]
                ?.message
                ?.content ?? "";

        console.log(
            "\n========== VERIFICATION RESPONSE =========="
        );

        console.log(
            text
        );

        console.log(
            "============================================"
        );

        return this.parseJson(
            text
        );

    }

}