import { ExecutionPlan } from "../models/ExecutionPlan.js";

export class Planner {

  async createPlan(goal: string): Promise<ExecutionPlan> {

    const lowerGoal = goal.toLowerCase();

    // Login flow
    if (lowerGoal.includes("login")) {

      return {
        goal,

        steps: [
          {
            id: 1,
            tool: "launchBrowser",
            description: "Launch browser",
            input: {}
          },

          {
            id: 2,
            tool: "goto",
            description: "Open login page",
            input: {
              url: "https://platform.peak.ai"
            }
          },

          {
            id: 3,
            tool: "inspectPage",
            description: "Inspect page",
            input: {}
          }
        ]
      };
    }

    // Default plan
    return {
      goal,

      steps: [
        {
          id: 1,
          tool: "launchBrowser",
          description: "Launch browser",
          input: {}
        }
      ]
    };
  }

}