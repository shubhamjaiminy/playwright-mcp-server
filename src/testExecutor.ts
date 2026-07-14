import { ToolExecutor } from "./agent/ToolExecutor.js";

const executor = new ToolExecutor();

async function main() {
  console.log("Launching browser...");

  await executor.execute("launchBrowser", {});

  console.log("Going to example.com...");

  await executor.execute("goto", {
    url: "https://example.com",
  });

  console.log("Inspecting page...");

  const result = await executor.execute("inspectPage", {});

  console.log(result);

  console.log("Finished!");
}

main().catch(console.error);