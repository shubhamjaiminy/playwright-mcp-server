import { ExecutionPlan } from "../models/ExecutionPlan.js";
import { ExecutionResult } from "../models/ExecutionResult.js";
import { ToolExecutor } from "./ToolExecutor.js";

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

try {

    await this.executor.execute(step.tool, step.input);

}
catch {

    console.log("⚠️ Attempting self-healing...");

    const { HealingAgent } =
        await import("../healing/SelfHealingAgent.js");

    const healed =
        await HealingAgent.heal(step.tool, step.input);

    await this.executor.execute(step.tool, healed);

}
        result.steps.push({
          stepId: step.id,
          tool: step.tool,
          status: "PASS",
          duration: Date.now() - started,
        });

      } catch(err){

    const screenshot = await import("../browser/BrowserManager.js")
        .then(x=>x.browserManager.screenshot("failure"));

    console.log("\n❌ Step Failed");
    console.log(err);

    console.log("Screenshot:",screenshot);

    result.steps.push({
        stepId:step.id,
        tool:step.tool,
        status:"FAIL",
        duration:Date.now()-started,
        error:(err as Error).message
    });

    break;
}

    }

    result.endedAt = new Date();

    return result;
  }
}