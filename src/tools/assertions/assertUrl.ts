import { z } from "zod";
import { browserManager } from "../../browser/BrowserManager.js";

export const assertUrlTool = {

    name: "assertUrl",

    description: "Assert URL contains text.",

    inputSchema: z.object({

        contains: z.string()

    }),

    handler: async ({ contains }: { contains: string }) => {

        const page = browserManager.getPage();

        const url = page.url();

        if (!url.includes(contains)) {

            throw new Error(
                `Expected URL to contain "${contains}" but got "${url}".`
            );

        }

        return {

            content: [

                {

                    type: "text",

                    text: "URL assertion passed"

                }

            ]

        };

    }

};