import { AIPlanner } from "./agent/AIPlanner.js";
import { TestRunner } from "./agent/TestRunner.js";
import { OpenRouterProvider } from "./llm/OpenRouterProvider.js";
import { RuleBasedProvider } from "./llm/RuleBasedProvider.js";
import { memory } from "./ memory/MemoryManager.js";
import { locatorEngine } from "./healing/AIHealer.js";
import { TestReporter } from "./report/TestReporter.js";
import { SimilarityEngine } from "./healing/SimilarityEngine.js";
console.log("🚀 Starting AI Test Framework");

const planner = new AIPlanner(
    new RuleBasedProvider()
);

const runner = new TestRunner();

const goal =
    "Launch browser, go to https://example.com and inspect the page.";

const plan = await planner.createPlan(goal);

console.log(JSON.stringify(plan, null, 2));
console.log(memory.getAll());
console.log("\n===============================");
console.log("🧠 AI Browser Memory");
console.log("===============================");
console.log("\n==========================");
console.log("🧠 Locator Brain");
console.log("==========================");

console.log(locatorEngine.getAll());
console.log(JSON.stringify(memory.getAll(), null, 2));

const result = await runner.run(plan);
TestReporter.print(result);
console.log(JSON.stringify(result, null, 2));
console.log(
    SimilarityEngine.similarity(
        "Login",
        "Sign In"
    )
);

console.log(
    SimilarityEngine.similarity(
        "Checkout",
        "Checkout"
    )
);

console.log(
    SimilarityEngine.similarity(
        "Continue",
        "Continue Shopping"
    )
);