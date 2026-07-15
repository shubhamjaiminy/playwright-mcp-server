import { AIPlanner } from "./agent/AIPlanner.js";
import { RuleBasedProvider } from "./llm/RuleBasedProvider.js";
import { TestRunner } from "./agent/TestRunner.js";
import { TestReporter } from "./report/TestReporter.js";
import { memory } from "./ memory/MemoryManager.js";

console.log("🚀 Starting AI Test Framework");

const planner = new AIPlanner(
  new RuleBasedProvider()
);

const runner = new TestRunner();

const goal =
  "Launch browser, go to https://example.com and inspect the page.";

const plan = await planner.createPlan(goal);

console.log(JSON.stringify(plan, null, 2));

const result = await runner.run(plan);

console.log("\n🧠 Browser Memory");
console.log(memory.all());

TestReporter.print(result);

console.log(JSON.stringify(result, null, 2));