import { z } from "zod";
import { browserManager } from "../browser/BrowserManager.js";
import { memory } from "../ memory/MemoryManager.js";

export const inspectPageTool = {

  name: "inspectPage",

  description: "Inspect current page",

  inputSchema: z.object({}),

  handler: async () => {

    const page = browserManager.getPage();

    const data = await page.evaluate(() => {

   const buttons = [...document.querySelectorAll("button")]
    .map(button => ({
        text: button.textContent?.trim() || "",
        id: button.id,
        name: button.getAttribute("name") || "",
        class: button.className,
        ariaLabel: button.getAttribute("aria-label"),
        testId: button.getAttribute("data-testid")
    }))
        .filter(b => b.text.length > 0 || b.ariaLabel);

      const links = [...document.querySelectorAll("a")]
        .map(link => ({
          text: link.textContent?.trim() || "",
          href: link.getAttribute("href")
        }))
        .filter(l => l.text.length > 0);

      const fields = [
        ...document.querySelectorAll("input, textarea")
      ];

      const inputs = fields.map(field => ({
        type: field.getAttribute("type") || "",
        name: field.getAttribute("name") || "",
        id: field.id,
        placeholder: field.getAttribute("placeholder") || "",
        value: (field as HTMLInputElement).value,
        ariaLabel: field.getAttribute("aria-label"),
        testId: field.getAttribute("data-testid")
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

      buttons: data.buttons.map(b => ({
        text: b.text,
        id: b.id,
        name: b.name,
        class: b.class,
        ariaLabel: b.ariaLabel ?? undefined,
        testId: b.testId ?? undefined
      })),

      links: data.links.map(l => ({
        text: l.text,
        href: l.href ?? ""
      })),

      inputs: data.inputs.map(i => ({
        type: i.type,
        name: i.name,
        id: i.id,
        placeholder: i.placeholder,
        value: i.value,
        ariaLabel: i.ariaLabel ?? undefined,
        testId: i.testId ?? undefined
      }))

    });

    console.log("\n🧠 Browser Memory Updated");
    console.log(data.title);

    return {
      content: [{
        type: "text",
        text: JSON.stringify(data, null, 2)
      }]
    };

  }

};