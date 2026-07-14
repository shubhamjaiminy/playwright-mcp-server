import { toolRegistry } from "../framework/ToolRegistry.js";

export class PromptBuilder {

  static build(goal: string): string {

    const tools = toolRegistry.getAll();

    const toolDescriptions = tools
      .map(
        (tool) => `
Tool: ${tool.name}
Description: ${tool.description}
Input Schema:
${JSON.stringify(tool.inputSchema, null, 2)}
`
      )
      .join("\n");

   return `
You are an expert AI Test Automation Engineer.

Convert the user's goal into an ExecutionPlan.

Available Tools:

${toolDescriptions}

Tool Usage Guidelines:

- launchBrowser → Start the browser.
- goto(url) → Navigate to a website.
- inspectPage() → Inspect the current page to discover buttons, links and inputs.
- click(...) → Click buttons, links or other elements.
- fill(...) → Fill text fields.
- press(key) → Press keyboard keys like Enter, Escape or Tab.
- wait(milliseconds) → Wait before the next step if necessary.

Rules:

1. Use ONLY the available tools.
2. Use the minimum number of steps.
3. Always launch the browser before navigating.
4. Navigate before clicking or filling.
5. Use inspectPage whenever page information is needed.
6. Use press("Enter") after filling a search box if the goal requires submitting a search.
7. Return ONLY valid JSON.
8. Do NOT return markdown.
9. Do NOT explain anything.

ExecutionPlan format:

{
  "goal": "...",
  "steps": [
    {
      "id": 1,
      "tool": "...",
      "description": "...",
      "input": {}
    }
  ]
}

User Goal:

${goal}
`;
  }
}