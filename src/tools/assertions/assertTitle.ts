import { z } from "zod";
import { browserManager } from "../../browser/BrowserManager.js";

export const assertTitleTool = {

  name: "assertTitle",

  description:
    "Verify that the current page title contains expected text.",

  inputSchema:
    z.object({

      contains:
        z.string(),

    }),

  handler:
    async (
      input: {
        contains: string
      }
    ) => {

      const page =
        browserManager.getPage();

      const actualTitle =
        await page.title();

      if (
        !actualTitle.includes(
          input.contains
        )
      ) {

        throw new Error(

          `Expected title to contain "${input.contains}" ` +
          `but got "${actualTitle}".`

        );

      }

      console.log(

        `✅ Title contains "${input.contains}"`

      );

      return {

        content: [

          {

            type:
              "text",

            text:
              `Title contains "${input.contains}"`,

          }

        ]

      };

    },

};