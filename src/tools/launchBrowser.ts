import { z } from "zod";
import { browserManager } from "../browser/BrowserManager.js";

export const launchBrowserTool = {
  name: "launchBrowser",

  description: "Launch a Chromium browser.",

  inputSchema: z.object({}),

  handler: async (args: any) => {
    await browserManager.launch();

    return {
      content: [
        {
          type: "text" as const,
          text: "✅ Browser launched successfully.",
        },
      ],
    };
  },
};