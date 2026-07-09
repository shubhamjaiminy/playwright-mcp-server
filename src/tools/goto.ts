import { z } from "zod";
import { browserManager } from "../browser/BrowserManager.js";

export const gotoTool = {
  name: "goto",

  description: "Navigate the current browser page to a given URL.",

  inputSchema: z.object({
    url: z.string().url(),
  }),

  handler: async ({ url }: { url: string }) => {
    const page = browserManager.getPage();

    await page.goto(url);

    return {
      content: [
        {
          type: "text" as const,
          text: `Successfully navigated to ${url}`,
        },
      ],
    };
  },
};