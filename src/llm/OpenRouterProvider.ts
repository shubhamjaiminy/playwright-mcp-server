import OpenAI from "openai";
import dotenv from "dotenv";

import { ExecutionPlan } from "../models/ExecutionPlan.js";
import { LLMProvider } from "./LLMProvider.js";
import { PromptBuilder } from "../agent/PromptBuilder.js";

dotenv.config();

export class OpenRouterProvider implements LLMProvider {

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


    // =========================================
    // SAFE JSON PARSER
    // =========================================

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
                `AI returned invalid JSON:\n${text}`
            );

        }

        const json =
            cleaned.substring(
                start,
                end + 1
            );

        try {

            return JSON.parse(json);

        } catch {

            throw new Error(
                `AI returned malformed JSON:\n${text}`
            );

        }

    }


    // =========================================
    // TEXT PLANNER
    // =========================================

    async createPlan(
        goal: string
    ): Promise<ExecutionPlan> {

        const prompt =
            PromptBuilder.build(goal);

        console.log(
            "🚀 Calling OpenRouter..."
        );

        console.log(
            "Model:",
            process.env.OPENROUTER_MODEL
        );

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
You are an expert AI Test Automation Planner.

Return ONLY valid JSON.

Do not return:
- explanations
- markdown
- safety messages
- "User Safety"
- analysis
- commentary
`
                    },

                    {

                        role:
                            "user",

                        content:
                            prompt

                    }

                ]

            });

        const text =
            response
                .choices?.[0]
                ?.message
                ?.content ?? "";

        console.log(
            "========== RAW RESPONSE =========="
        );

        console.log(text);

        console.log(
            "=================================="
        );

        return this.parseJson(
            text
        ) as ExecutionPlan;

    }


    // =========================================
    // AUTONOMOUS NEXT ACTION
    // =========================================

    async nextAction(

        goal: string,

        page: any,

        history: string[]

    ) {

        const {
            NextActionPrompt
        } =
            await import(
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

                temperature:
                    0,

                messages: [

                    {

                        role:
                            "system",

                        content:
                            `
You are an autonomous QA browser agent.

You MUST return exactly one JSON object.

You MUST NOT return:

- User Safety
- safety classifications
- explanations
- markdown
- analysis
- commentary
- plain text

Your response must start with { and end with }.
`
                    },

                    {

                        role:
                            "user",

                        content:
                            prompt

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

        console.log(text);

        console.log(
            "================================="
        );

        return this.parseJson(
            text
        );

    }

}