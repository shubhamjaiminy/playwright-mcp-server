import { z } from "zod";
import { expect } from "@playwright/test";
import { browserManager } from "../../browser/BrowserManager.js";
import { memory } from "../../ memory/MemoryManager.js";

export const assertTextTool = {
  name: "assertText",

  description: "Verify text exists on the page",

  inputSchema: z.object({
    text: z.string()
  }),

  handler: async (input: { text: string }) => {

    const page = browserManager.getPage();

    const pageMemory = memory.latest();

    let locator;

    //------------------------------------
    // Prefer Link
    //------------------------------------

    const link = pageMemory?.links.find(
      l => l.text.trim() === input.text.trim()
    );

    if (link) {

      console.log("🔎 Using Link Locator");

      locator = page.getByRole("link", {
        name: input.text
      });

    }

    //------------------------------------
    // Prefer Button
    //------------------------------------

    if (!locator) {

      const button = pageMemory?.buttons.find(
        b => b.text.trim() === input.text.trim()
      );

      if (button) {

        console.log("🔎 Using Button Locator");

        locator = page.getByRole("button", {
          name: input.text
        });

      }

    }

    //------------------------------------
    // Fallback
    //------------------------------------

    if (!locator) {

      console.log("🔎 Using Text Locator");

      locator = page
        .getByText(input.text, { exact: false })
        .first();

    }

    await expect(locator).toBeVisible();

    console.log(`✅ Verified text "${input.text}"`);

  }
};