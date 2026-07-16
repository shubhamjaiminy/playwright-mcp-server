import { ToolExecutor } from "./ToolExecutor.js";
import { OpenRouterProvider } from "../llm/OpenRouterProvider.js";
import { memory } from "../ memory/MemoryManager.js";
import { browserManager } from "../browser/BrowserManager.js";
import { GoalVerifier } from "./GoalVerifier.js";

export class AgentLoop {

  private executor =
    new ToolExecutor();

  private ai =
    new OpenRouterProvider();

  private verifier =
    new GoalVerifier();

  async run(goal: string) {

    const history: string[] = [];

    console.log("\n🎯 Goal:");
    console.log(goal);

    /*
    ========================================
    1. LAUNCH BROWSER
    ========================================
    */

    await this.executor.execute(
      "launchBrowser",
      {}
    );

    /*
    ========================================
    2. OPEN URL IF PRESENT
    ========================================
    */

    const url =
      goal.match(/https?:\/\/[^\s]+/)?.[0];

    if (url) {

      await this.executor.execute(
        "goto",
        { url }
      );

      history.push(
        `goto: ${url}`
      );

    }

    /*
    ========================================
    3. AUTONOMOUS AGENT LOOP
    ========================================
    */

    while (true) {

      /*
      ------------------------------------
      Inspect current page
      ------------------------------------
      */

      await this.executor.execute(
        "inspectPage",
        {}
      );

      const page =
        memory.latest();

      const screenshot =
        await browserManager.screenshotBase64();

      /*
      ------------------------------------
      Ask AI for next action
      ------------------------------------
      */

      console.log(
        "\n🤖 Asking AI for next action..."
      );

      const action =
        await this.ai.nextAction(

          goal,

          page,

          history

        );

      console.log(
        "\n🤖 AI Decision"
      );

      console.log(action);

      /*
      ====================================
      FINISH DECISION
      ====================================
      */

      if (
        action.tool === "FINISH"
      ) {

        console.log(
          "\n🛑 AI believes goal is complete."
        );

        const verification =
          await this.verifier.verify(

            goal,

            page,

            screenshot

          );

        console.log(
          "\n📊 FINAL VERIFICATION"
        );

        console.log(
          verification
        );

        if (
          verification.status === "PASS"
        ) {

          console.log(
            "\n✅ TEST PASSED"
          );

          return {

            status:
              "PASS",

            reason:
              verification.reason

          };

        }

        console.log(
          "\n❌ FINAL VERIFICATION FAILED"
        );

        history.push(
          `FINISH rejected: ${verification.reason}`
        );

        continue;

      }

      /*
      ====================================
      EXECUTE ACTION
      ====================================
      */

      await this.executor.execute(

        action.tool,

        action.input

      );

      history.push(

        `${action.tool}: ${
          JSON.stringify(
            action.input
          )
        }`

      );

      /*
      ====================================
      IMPORTANT:
      After a successful assertion,
      verify the goal immediately.

      Do not ask the AI again.
      ====================================
      */

      if (

        action.tool ===
        "assertTitle" ||

        action.tool ===
        "assertUrl" ||

        action.tool ===
        "assertText" ||

        action.tool ===
        "assertVisible"

      ) {

        console.log(
          "\n🔍 Assertion succeeded."
        );

        console.log(
          "🔍 Running independent goal verification..."
        );

        const updatedPage =
          memory.latest();

        const updatedScreenshot =
          await browserManager.screenshotBase64();

        const verification =
          await this.verifier.verify(

            goal,

            updatedPage,

            updatedScreenshot

          );

        console.log(
          "\n📊 FINAL VERIFICATION"
        );

        console.log(
          verification
        );

        if (
          verification.status === "PASS"
        ) {

          console.log(
            "\n✅ TEST PASSED"
          );

          return {

            status:
              "PASS",

            reason:
              verification.reason

          };

        }

        console.log(
          "\n❌ TEST FAILED"
        );

        throw new Error(
          verification.reason
        );

      }

    }

  }

}