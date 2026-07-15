import { z } from "zod";
import { browserManager } from "../../browser/BrowserManager.js";

export const assertVisibleTool = {

    name: "assertVisible",

    description: "Assert an element is visible.",

    inputSchema: z.object({

        role: z.string().optional(),

        name: z.string().optional(),

        selector: z.string().optional()

    }),

    handler: async ({ role, name, selector }: any) => {

        const page = browserManager.getPage();

        let locator;

        if (role && name) {

            locator = page.getByRole(role as any, {

                name

            });

        } else {

            locator = page.locator(selector);

        }

        await locator.waitFor({

            state: "visible"

        });

        return {

            content: [

                {

                    type: "text",

                    text: "Visibility assertion passed"

                }

            ]

        };

    }

};