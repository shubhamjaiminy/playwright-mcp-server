import { z } from "zod";
import { browserManager } from "../browser/BrowserManager.js";

export const clickTool = {
  name: "click",

  description:
    "Click an element using role, ariaLabel, label, name, placeholder, text, or selector.",

  inputSchema: z.object({
    role: z.string().optional(),
    name: z.string().optional(),
    ariaLabel: z.string().optional(),
    label: z.string().optional(),
    placeholder: z.string().optional(),
    text: z.string().optional(),
    selector: z.string().optional(),
  }),

  handler: async (input: any) => {
    console.log("\n🖱️ CLICK INPUT:");
    console.log(JSON.stringify(input, null, 2));

    const page = browserManager.getPage();

    let locator;

    /*
    ========================================
    1. ROLE + NAME
    ========================================
    */

    if (input.role && input.name) {
      console.log(
        `🖱️ Using Role Locator: ${input.role} "${input.name}"`
      );

      locator = page.getByRole(input.role as any, {
        name: input.name,
      });
    }

    /*
    ========================================
    2. ARIA LABEL
    ========================================
    */

    else if (input.ariaLabel) {
      console.log(
        `🖱️ Using ARIA Label: ${input.ariaLabel}`
      );

      locator = page.locator(
        `[aria-label="${input.ariaLabel}"]`
      );
    }

    /*
    ========================================
    3. LABEL
    ========================================
    */

    else if (input.label) {
      console.log(
        `🖱️ Using Label: ${input.label}`
      );

      locator = page.getByLabel(input.label);
    }

    /*
    ========================================
    4. NAME
    ========================================
    */

    else if (input.name) {
      console.log(
        `🖱️ Using Name Locator: ${input.name}`
      );

      locator = page.locator(
        `[name="${input.name}"]`
      );
    }

    /*
    ========================================
    5. PLACEHOLDER
    ========================================
    */

    else if (input.placeholder) {
      console.log(
        `🖱️ Using Placeholder: ${input.placeholder}`
      );

      locator = page.getByPlaceholder(
        input.placeholder
      );
    }

    /*
    ========================================
    6. TEXT
    ========================================
    */

    else if (input.text) {
      console.log(
        `🖱️ Using Text Locator: ${input.text}`
      );

      locator = page.getByText(input.text);
    }

    /*
    ========================================
    7. SELECTOR
    ========================================
    */

    else if (input.selector) {
      console.log(
        `🖱️ Using CSS Selector: ${input.selector}`
      );

      locator = page.locator(input.selector);
    }

    else {
      throw new Error(
        "No valid locator strategy provided."
      );
    }

    /*
    ========================================
    HANDLE DUPLICATE MATCHES
    ========================================
    */

    const count = await locator.count();

    console.log(
      `🔎 Matching elements found: ${count}`
    );

    if (count === 0) {
      throw new Error(
        "No element found for the provided locator."
      );
    }

    /*
    If multiple elements match,
    use the first visible element.
    */

    if (count > 1) {
      console.log(
        "⚠️ Multiple elements found. Searching for visible element..."
      );

      for (let i = 0; i < count; i++) {
        const candidate = locator.nth(i);

        if (await candidate.isVisible()) {
          console.log(
            `✅ Clicking visible element at index ${i}`
          );

          await candidate.click();

          return {
            success: true,
            clickedIndex: i,
          };
        }
      }

      throw new Error(
        "Matching elements found, but none are visible."
      );
    }

    /*
    ========================================
    SINGLE MATCH
    ========================================
    */

    await locator.click();

    return {
      success: true,
    };
  },
};