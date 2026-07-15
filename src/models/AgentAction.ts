export interface AgentAction {

    tool: string;

    input: Record<string, any>;

    reason?: string;

}