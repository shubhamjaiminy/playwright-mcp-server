import { agentContext } from "./AgentContext.js";

export class ActionLogger {

  static start(tool: string, input: any) {

    const action = {
      tool,
      input,
      startedAt: new Date(),
      success: false,
    };

    agentContext.executionHistory.push(action);

    return action;
  }

  static success(action: any) {
    action.endedAt = new Date();
    action.success = true;
  }

  static fail(action: any, error: Error) {
    action.endedAt = new Date();
    action.success = false;
    action.error = error.message;
  }

}