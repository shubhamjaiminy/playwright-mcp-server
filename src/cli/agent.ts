import { AgentLoop } from "../agent/ AgentLoop.js";

const goal =
    process.argv.slice(2).join(" ");

await new AgentLoop().run(goal);