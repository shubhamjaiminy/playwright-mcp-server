export interface ActionLog {
  tool: string;
  input: any;
  startedAt: Date;
  endedAt?: Date;
  success: boolean;
  error?: string;
}

export class AgentContext {
  browserLaunched = false;

  currentUrl = "";

  pageTitle = "";

  lastInspection: any = null;

  lastAction = "";

  executionHistory: ActionLog[] = [];

  screenshots: string[] = [];
}

export const agentContext = new AgentContext();