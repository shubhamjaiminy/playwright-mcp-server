export interface ExecutionStep {
  id: number;

  tool: string;

  input: Record<string, any>;

  description: string;
}

export interface ExecutionPlan {
  goal: string;

  steps: ExecutionStep[];
}