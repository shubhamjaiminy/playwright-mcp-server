import { OpenRouterProvider } from "../llm/OpenRouterProvider.js";
import { TestRunner } from "../agent/TestRunner.js";
import { buildPlannerPrompt } from "../prompts/planner.js";

const goal = process.argv.slice(2).join(" ");

if (!goal) {

    console.log("Usage:");

    console.log('npm run ai "Search Playwright"');

    process.exit(0);

}

const planner = new OpenRouterProvider();

const prompt = buildPlannerPrompt(goal);

const plan = await planner.createPlan(prompt);

console.log(JSON.stringify(plan, null, 2));

const runner = new TestRunner();

const result = await runner.run(plan);

console.log(JSON.stringify(result, null, 2));