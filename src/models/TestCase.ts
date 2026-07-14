import { TestStep } from "./TestStep.js";

export interface TestCase {
  name: string;
  description: string;
  steps: TestStep[];
}