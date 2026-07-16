import { HealingAgent } from "./SelfHealingAgent.js";

export class RetryEngine {

  async execute(

    toolName: string,

    input: any,

    action: (
      args: any
    ) => Promise<void>,

    retries = 1

  ) {

    let lastError:
      Error | undefined;

    let currentInput =
      input;

    for (

      let i = 0;

      i <= retries;

      i++

    ) {

      try {

        await action(
          currentInput
        );

        return;

      }

      catch (err) {

        lastError =
          err as Error;

        console.log(

          `🔄 Attempt ${i + 1} failed`

        );

        if (

          i < retries

        ) {

          const healedInput =
            await HealingAgent.heal(

              toolName,

              currentInput

            );

          if (

            JSON.stringify(
              healedInput
            ) ===
            JSON.stringify(
              currentInput
            )

          ) {

            console.log(
              "⚠ No improved locator found."
            );

          }

          else {

            console.log(
              "🩹 Using healed locator:",
              healedInput
            );

          }

          currentInput =
            healedInput;

        }

      }

    }

    throw lastError;

  }

}