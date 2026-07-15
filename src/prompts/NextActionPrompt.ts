import { PageMemory } from "../ memory/BrowserMemory.js";

export class NextActionPrompt {

    static build(
        goal: string,
        page: PageMemory | undefined,
        history: string[]
    ) {

        return `
You are an expert QA Automation Agent.

Your job is NOT to generate a complete test.

Instead...

Think one step at a time.

Current Goal:

${goal}

Current Page:

${JSON.stringify(page, null, 2)}

Previous Actions:

${history.join("\n")}

Return ONLY ONE action.

Example:

{
    "tool":"click",
    "input":{
        "role":"button",
        "name":"Login"
    }
}

If the goal has been achieved return

{
    "tool":"FINISH",
    "input":{}
}

Return JSON only.
`;

    }

}