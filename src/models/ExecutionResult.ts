export interface StepResult {

    stepId:number;

    tool:string;

    status:"PASS"|"FAIL";

    duration:number;

    error?:string;

}

export interface ExecutionResult{

    goal:string;

    startedAt:Date;

    endedAt?:Date;

    steps:StepResult[];

}