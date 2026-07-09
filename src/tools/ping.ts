import { z } from "zod";

export const pingTool = {
  name: "ping",

  description: "Simple tool to verify that the MCP server is working.",

  inputSchema: z.object({}),

  handler: async () => {
    return {
      content: [
        {
          type: "text" as const,
          text: "Hello Shubham! My MCP Server is alive 🚀",
        },
      ],
    };
  },
};