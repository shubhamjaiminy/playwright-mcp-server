import { ExecutionPlan } from "../models/ExecutionPlan.js";
import { ExecutionResult } from "../models/ExecutionResult.js";
import { ToolExecutor } from "./ToolExecutor.js";
import { HtmlReporter } from "../reporting/HtmlReporter.js";

export class TestRunner {

  private executor = new ToolExecutor();

  async run(plan: ExecutionPlan): Promise<ExecutionResult> {

    const result: ExecutionResult = {
      goal: plan.goal,
      startedAt: new Date(),
      steps: [],
    };

    for (const step of plan.steps) {

      const started = Date.now();

      try {

        // First execution attempt
        try {

          await this.executor.execute(step.tool, step.input);

        } catch {

          console.log("⚠️ Attempting self-healing...");

          const { HealingAgent } = await import(
            "../healing/SelfHealingAgent.js"
          );

          const healedInput = await HealingAgent.heal(
            step.tool,
            step.input
          );

          console.log("🩹 Using healed locator:", healedInput);

          await this.executor.execute(step.tool, healedInput);
        }

        result.steps.push({
          stepId: step.id,
          tool: step.tool,
          status: "PASS",
          duration: Date.now() - started,
        });

      } catch (err) {

        let screenshot = "";

        try {

          const { browserManager } = await import(
            "../browser/BrowserManager.js"
          );

          screenshot =
            (await browserManager.screenshot(
              `failure-step-${step.id}`
            )) ?? "";

        } catch {

          console.log("⚠ Could not capture screenshot.");

        }

        const stepResult: any = {
          stepId: step.id,
          tool: step.tool,
          status: "FAIL",
          duration: Date.now() - started,
          error: (err as Error).message,
        };

        if (screenshot) {
          stepResult.screenshot = screenshot;
        }

        result.steps.push(stepResult);

        break;
      }

    }

    result.endedAt = new Date();

    HtmlReporter.generate(result);

    return result;

  }

}