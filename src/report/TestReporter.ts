import { ExecutionResult } from "../models/ExecutionResult.js";

export class TestReporter{

static print(result:ExecutionResult){

console.log("\n========================");
console.log("AI TEST REPORT");
console.log("========================");

console.log("Goal:",result.goal);

console.log();

for(const step of result.steps){

console.log(
`${step.status==="PASS"?"✅":"❌"} ${step.tool} (${step.duration} ms)`
);

}

console.log();

const failed=result.steps.find(s=>s.status==="FAIL");

console.log(
failed?"❌ FAILED":"✅ PASSED"
);

}
}