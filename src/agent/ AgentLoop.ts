import { ToolExecutor } from "./ToolExecutor.js";
import { OpenRouterProvider } from "../llm/OpenRouterProvider.js";
import { memory } from "../ memory/MemoryManager.js";

export class AgentLoop {

    private executor = new ToolExecutor();

    private ai = new OpenRouterProvider();

    async run(goal: string) {

        const history: string[] = [];

        // ----------------------------------------
        // Launch browser
        // ----------------------------------------

        await this.executor.execute(
            "launchBrowser",
            {}
        );

        // ----------------------------------------
        // Resolve URL
        // ----------------------------------------

        const url =
            this.resolveUrl(goal);

        if (url) {

            await this.executor.execute(
                "goto",
                { url }
            );

            history.push(
                `goto ${url}`
            );

        }

        // ----------------------------------------
        // Autonomous Agent Loop
        // ----------------------------------------

        let attempts = 0;

        while (true) {

            attempts++;

            if (attempts > 20) {

                throw new Error(
                    "Agent exceeded maximum steps."
                );

            }

            // ----------------------------------------
            // Inspect current page
            // ----------------------------------------

            await this.executor.execute(
                "inspectPage",
                {}
            );

            const page =
                memory.latest();

            console.log(
                "\n🧠 Current Page Memory"
            );

            console.log(
                JSON.stringify(
                    page,
                    null,
                    2
                )
            );

            // ----------------------------------------
            // Ask AI for next action
            // ----------------------------------------

            const action =
                await this.ai.nextAction(
                    goal,
                    page,
                    history
                );

            console.log(
                "\n🤖 AI Decision"
            );

            console.log(
                action
            );

            // ----------------------------------------
            // Finish
            // ----------------------------------------

            if (
                action.tool === "FINISH"
            ) {

                console.log(
                    "✅ Goal Complete"
                );

                break;

            }

            // ----------------------------------------
            // Execute action
            // ----------------------------------------

            await this.executor.execute(
                action.tool,
                action.input
            );

            history.push(
                `${action.tool} ${JSON.stringify(action.input)}`
            );

        }

    }

    private resolveUrl(
        goal: string
    ): string | undefined {

        // Explicit URL
        const explicitUrl =
            goal.match(
                /https?:\/\/[^\s]+/
            )?.[0];

        if (
            explicitUrl
        ) {

            return explicitUrl;

        }

        // Common websites

        const lowerGoal =
            goal.toLowerCase();

        if (
            lowerGoal.includes(
                "google"
            )
        ) {

            return "https://www.google.com";

        }

        if (
            lowerGoal.includes(
                "youtube"
            )
        ) {

            return "https://www.youtube.com";

        }

        if (
            lowerGoal.includes(
                "github"
            )
        ) {

            return "https://github.com";

        }

        return undefined;

    }

}