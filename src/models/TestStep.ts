export interface TestStep {
  id: number;
  tool: string;
  input: any;
  expected?: string;
}