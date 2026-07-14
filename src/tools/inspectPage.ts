import { z } from "zod";
import { browserManager } from "../browser/BrowserManager.js";
import { memory } from "../ memory/MemoryManager.js";
import { locatorEngine } from "../healing/AIHealer.js";

export const inspectPageTool = {
  name: "inspectPage",

  description: "Inspect current page",

  inputSchema: z.object({}),

  handler: async () => {

    const page = browserManager.getPage();

    const data = await page.evaluate(() => {

      const buttons = [...document.querySelectorAll("button")].map(button => ({
        text: button.textContent?.trim() || "",
        id: button.id,
        class: button.className,
        ariaLabel: button.getAttribute("aria-label"),
        testId: button.getAttribute("data-testid")
      }));

      const links = [...document.querySelectorAll("a")].map(link => ({
        text: link.textContent?.trim() || "",
        href: link.getAttribute("href")
      }));

      const inputs = [...document.querySelectorAll("input")].map(input => ({
        type: input.type,
        name: input.name,
        id: input.id,
        placeholder: input.placeholder,
        value: input.value,
        ariaLabel: input.getAttribute("aria-label"),
        testId: input.getAttribute("data-testid")
      }));

      return {
        url: location.href,
        title: document.title,
        buttons,
        links,
        inputs
      };

    });

 memory.remember({
  title: data.title,
  url: data.url,
  timestamp: new Date(),

  buttons: data.buttons,
  links: data.links,
  inputs: data.inputs
});
console.log("Memory after remember:");
console.dir(memory.latest(), { depth: null });
    for (const button of data.buttons) {

      locatorEngine.remember({
        page: data.url,
        tag: "button",
        text: button.text,
        id: button.id,
        className: button.class,
        ariaLabel: button.ariaLabel ?? undefined,
        testId: button.testId ?? undefined
      });

    }

    console.log("\n🧠 Browser Memory Updated");
    console.log(data.title);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 2)
        }
      ]
    };

  }
  
};
