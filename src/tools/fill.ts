import { z } from "zod";
import { browserManager } from "../browser/BrowserManager.js";

export const fillTool = {
  name: "fill",

  description: "Fill an input using the best locator strategy.",

  inputSchema: z.object({
    role: z.string().optional(),
    name: z.string().optional(),
    label: z.string().optional(),
    placeholder: z.string().optional(),
    selector: z.string().optional(),
    value: z.string(),
  }),

  handler: async ({
    role,
    name,
    label,
    placeholder,
    selector,
    value,
  }: {
    role?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    selector?: string;
    value: string;
  }) => {
    const page = browserManager.getPage();

    let locator;

    if (role && name) {
      locator = page.getByRole(role as any, {
        name,
        exact: true,
      });
    } else if (label) {
      locator = page.getByLabel(label);
    } else if (placeholder) {
      locator = page.getByPlaceholder(placeholder);
    } else if (selector) {
      locator = page.locator(selector);
    } else {
      throw new Error("No locator strategy provided.");
    }

    await locator.waitFor({
      state: "visible",
      timeout: 10000,
    });

    await locator.fill(value);

    return {
      content: [
        {
          type: "text",
          text: `Filled "${value}" successfully`,
        },
      ],
    };
  },
};