import { LLMProvider } from "./LLMProvider.js";
import { ExecutionPlan } from "../models/ExecutionPlan.js";
import { toolRegistry } from "../framework/ToolRegistry.js";
export class RuleBasedProvider implements LLMProvider {

    async createPlan(goal: string): Promise<ExecutionPlan> {
        const tools = toolRegistry.getAll();

console.log("Available Tools:");

console.table(tools);

        const lowerGoal = goal.toLowerCase();

        const steps = [];

        if (lowerGoal.includes("open") || lowerGoal.includes("launch")) {
            steps.push({
                id: "1",
                tool: "launchBrowser",
                input: {}
            });
        }

        const urlMatch = goal.match(/https?:\/\/[^\s]+/);

        if (urlMatch) {
            steps.push({
                id: "2",
                tool: "goto",
                input: {
                    url: urlMatch[0]
                }
            });
        }

        if (lowerGoal.includes("inspect")) {
            steps.push({
                id: "3",
                tool: "inspectPage",
                input: {}
            });
        }

        return {
            goal,
            steps
        } as unknown as ExecutionPlan;

    }

}