import { ExecutionPlan } from "../models/ExecutionPlan.js";
import { LLMProvider } from "../llm/LLMProvider.js";

export class AIPlanner {

    constructor(
        private provider: LLMProvider
    ) {}

    async createPlan(goal: string): Promise<ExecutionPlan> {
        return this.provider.createPlan(goal);
    }
}