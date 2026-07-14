import { ExecutionPlan } from "../models/ExecutionPlan.js";

export interface LLMProvider {
    createPlan(goal: string): Promise<ExecutionPlan>;
}