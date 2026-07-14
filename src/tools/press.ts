import { z } from "zod";
import { browserManager } from "../browser/BrowserManager.js";

export const pressTool = {

    name: "press",

    description: "Press a keyboard key.",

    inputSchema: z.object({

        key: z.string()

    }),

    handler: async ({ key }: { key: string }) => {

        const page = browserManager.getPage();

        await page.keyboard.press(key);

        return {

            content: [

                {

                    type: "text",

                    text: `Pressed ${key}`

                }

            ]

        };

    }

};