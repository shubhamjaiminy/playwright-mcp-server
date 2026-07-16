import { toolRegistry } from "../framework/ToolRegistry.js";
import "../framework/registerTools.js";

import { retryEngine } from "../healing/AIHealer.js";
import { HealingAgent } from "../healing/SelfHealingAgent.js";
import { browserManager } from "../browser/BrowserManager.js";

export class ToolExecutor {
    

    async execute(toolName:string,input:any){

        const tool=toolRegistry.get(toolName);

        if(!tool)
            throw new Error(`Tool ${toolName} not found`);

        try{

            await tool.handler(input);

        }catch(err){

            console.log("⚠ Tool failed");


await browserManager.screenshot("failure");

console.log(
    `🔧 Executing tool: ${toolName}`,
    JSON.stringify(input, null, 2)
);

            const healed=await HealingAgent.heal(toolName,input);

            await retryEngine.execute(toolName, input, async (healedInput) => {
                await tool.handler(healedInput);
            });

        }

    }

}