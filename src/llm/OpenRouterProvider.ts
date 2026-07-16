import OpenAI from "openai";
import dotenv from "dotenv";

import { ExecutionPlan } from "../models/ExecutionPlan.js";
import { LLMProvider } from "./LLMProvider.js";
import { PromptBuilder } from "../agent/PromptBuilder.js";

dotenv.config();

export class OpenRouterProvider implements LLMProvider {

    private client = new OpenAI({
        apiKey: process.env.OPENROUTER_API_KEY,
        baseURL: "https://openrouter.ai/api/v1",

        defaultHeaders: {
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "AI Test Automation Framework",
        },
    });

    // ---------------------------------------------
    // TEXT PLANNER
    // ---------------------------------------------

    async createPlan(goal: string): Promise<ExecutionPlan> {

        const prompt = PromptBuilder.build(goal);

        console.log("🚀 Calling OpenRouter...");
        console.log("Model:", process.env.OPENROUTER_MODEL);

        const response =
            await this.client.chat.completions.create({

                model: process.env.OPENROUTER_MODEL!,

                temperature: 0,

                messages: [

                    {
                        role: "system",

                        content:
                            "You are an expert AI Test Automation Planner. Return ONLY valid JSON."
                    },

                    {
                        role: "user",

                        content: prompt
                    }

                ]

            });

        const text =
            response.choices?.[0]?.message?.content ?? "";

        console.log("========== RAW RESPONSE ==========");
        console.log(text);
        console.log("==================================");

        const json =
            text.match(/\{[\s\S]*\}/);

        if (!json) {

            throw new Error(
                "OpenRouter did not return valid JSON."
            );

        }

        return JSON.parse(json[0]) as ExecutionPlan;
    }


    // ---------------------------------------------
    // VISION AGENT
    // ---------------------------------------------

async nextAction(
    goal: string,
    page: any,
    history: string[]
) {

    const {
        NextActionPrompt
    } = await import(
        "../prompts/NextActionPrompt.js"
    );

    const prompt =
        NextActionPrompt.build(
            goal,
            page,
            history
        );

    console.log(
        "🤖 Asking AI for next action..."
    );

    const response =
        await this.client.chat.completions.create({

            model:
                process.env.OPENROUTER_MODEL!,

            temperature: 0,

            messages: [

                {
                    role: "system",

                    content:
                        `
You are an autonomous QA browser agent.

Return ONLY valid JSON.

Never return explanations.

Never return markdown.
`
                },

                {

                    role: "user",

                    content: prompt

                }

            ]

        });

    const text =
        response
            .choices?.[0]
            ?.message
            ?.content ?? "";

    console.log(
        "\n========== AI RESPONSE =========="
    );

    console.log(
        text
    );

    console.log(
        "================================="
    );

    const json =
        text.match(
            /\{[\s\S]*\}/
        );

    if (
        !json
    ) {

        throw new Error(
            `AI returned invalid JSON: ${text}`
        );

    }

    return JSON.parse(
        json[0]
    );

}
}