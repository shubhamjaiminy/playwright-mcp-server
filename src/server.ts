import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { launchBrowserTool } from "./tools/launchBrowser.js";
import { gotoTool } from "./tools/goto.js";
import { clickTool } from "./tools/click.js";
const server = new McpServer({
  name: "playwright-mcp-server",
  version: "1.0.0",
});

server.registerTool(
  "ping",
  {
    description: "Ping tool",
    inputSchema: z.object({}),
  },
  async () => ({
    content: [
      {
        type: "text",
        text: "Pong!",
      },
    ],
  })
);
server.registerTool(
  launchBrowserTool.name,
  {
    description: launchBrowserTool.description,
    inputSchema: launchBrowserTool.inputSchema,
  },
  launchBrowserTool.handler
);
server.registerTool(
  gotoTool.name,
  {
    description: gotoTool.description,
    inputSchema: gotoTool.inputSchema,
  },
  gotoTool.handler
);
console.error("✅ Registered goto tool");

server.registerTool(
  clickTool.name,
  {
    description: clickTool.description,
    inputSchema: clickTool.inputSchema,
  },
  clickTool.handler
);
console.error("✅ Registered click tool");

const transport = new StdioServerTransport();

await server.connect(transport);

console.error("Server running");