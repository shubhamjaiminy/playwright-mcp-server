export function buildPlannerPrompt(goal: string) {

return `
You are an AI Test Automation Planner.

Available tools

launchBrowser

goto(url)

inspectPage()

click(role,name,text,label,placeholder,selector)

fill(locator,value)

wait(milliseconds)

Return ONLY valid JSON.

Example

{
 "goal":"Login",
 "steps":[
   {
     "id":"1",
     "tool":"launchBrowser",
     "input":{}
   }
 ]
}

Goal:

${goal}
`;

}