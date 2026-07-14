import { z } from "zod";
import { browserManager } from "../browser/BrowserManager.js";
import { agentContext } from "../agent/AgentContext.js";
import { ActionLogger } from "../agent/ActionLogger.js";

export const gotoTool = {
  name: "goto",

  description: "Navigate to a URL.",

  inputSchema: z.object({
    url: z.string(),
  }),

  handler: async ({ url }: { url: string }) => {

    const page = browserManager.getPage();

    const action = ActionLogger.start("goto", { url });

    try {
      await page.goto(url);

      agentContext.currentUrl = page.url();
      agentContext.pageTitle = await page.title();
      agentContext.lastAction = "goto";

      ActionLogger.success(action);

      return {
        content: [
          {
            type: "text" as const,
            text: `Navigated to ${page.url()}`,
          },
        ],
      };

    } catch (error) {

      ActionLogger.fail(action, error as Error);

      throw error;
    }
  },
};