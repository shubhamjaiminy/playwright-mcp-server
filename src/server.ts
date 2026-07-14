import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { launchBrowserTool } from "./tools/launchBrowser.js";
import { gotoTool } from "./tools/goto.js";
import { clickTool } from "./tools/click.js";
import { fillTool } from "./tools/fill.js";
import { ToolRegistry } from "./framework/ToolRegistry.js";
import { inspectPageTool } from "./tools/inspectPage.js";
import "./framework/registerTools.js";
import { toolRegistry } from "./framework/ToolRegistry.js";


const registry = new ToolRegistry();
const server = new McpServer({
  name: "playwright-mcp-server",
  version: "1.0.0",
});

registry.register(launchBrowserTool);
registry.register(gotoTool);
registry.register(clickTool);
for (const tool of toolRegistry.getAll()) {

  server.registerTool(
    tool.name,
    {
      description: tool.description,
      inputSchema: tool.inputSchema,
    },
    tool.handler
  );

}
// server.registerTool(
//   fillTool.name,
//   {
//     description: fillTool.description,
//     inputSchema: fillTool.inputSchema,
//   },
//   async (args, extra) => {
//     const result = await fillTool.handler(args);
//     return {
//       ...result,
//       content: result.content.map((item) => ({
//         ...item,
//         type: "text" as const,
//       })),
//     };
//   }
// );
await server.connect(new StdioServerTransport());

console.error("Server running");