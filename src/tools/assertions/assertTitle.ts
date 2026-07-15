import { z } from "zod";
import { browserManager } from "../../browser/BrowserManager.js";

export const assertTitleTool = {

    name: "assertTitle",

    description: "Assert that page title contains text.",

    inputSchema: z.object({

        contains: z.string()

    }),

    handler: async ({ contains }: { contains: string }) => {

        const page = browserManager.getPage();

        const title = await page.title();

        if (!title.includes(contains)) {

            throw new Error(
                `Expected title to contain "${contains}" but got "${title}".`
            );

        }

        return {

            content: [

                {

                    type: "text",

                    text: "Title assertion passed"

                }

            ]

        };

    }

};