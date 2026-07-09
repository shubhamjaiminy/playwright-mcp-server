import { z } from "zod";
import { browserManager } from "../browser/BrowserManager.js";

export const clickTool = {
  name: "click",

  description: "Click an element by its visible text.",

  inputSchema: z.object({
    text: z.string(),
  }),

 handler: async ({ text }: { text: string }) => {
  const page = browserManager.getPage();

  console.error("Trying to click:", text);

  await page.getByText(text).click();

  return {
    content: [
      {
        type: "text" as const,
        text: `Clicked "${text}"`,
      },
    ],
  };
}
};