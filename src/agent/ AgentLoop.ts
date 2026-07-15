import { ToolExecutor } from "./ToolExecutor.js";
import { OpenRouterProvider } from "../llm/OpenRouterProvider.js";
import { memory } from "../ memory/MemoryManager.js";

export class AgentLoop {

    private executor = new ToolExecutor();

    private ai = new OpenRouterProvider();

    async run(goal: string) {

        const history: string[] = [];

        await this.executor.execute("launchBrowser", {});

        const url =
            goal.match(/https?:\/\/[^\s]+/)?.[0];

        if (url) {

            await this.executor.execute(
                "goto",
                { url }
            );

            history.push("goto");

        }

        while (true) {

            await this.executor.execute(
                "inspectPage",
                {}
            );

            const page =
                memory.latest();

            const action =
                await this.ai.nextAction(
                    goal,
                    page,
                    history
                );

            console.log("\n🤖 AI Decision");

            console.log(action);

            if (action.tool === "FINISH") {

                console.log("✅ Goal Complete");

                break;

            }

            await this.executor.execute(
                action.tool,
                action.input
            );

            history.push(action.tool);

        }

    }

}