AI-powered autonomous QA automation framework while being honest that it is still evolving.

# 🤖 AI QA Automation Agent

An AI-powered autonomous browser testing framework that converts natural-language testing goals into real browser actions.

The goal is simple:

> Give the agent a website and a testing objective.  
> The agent observes the browser, decides what to do next, executes the action, and verifies the result.

---

## 🚀 Example

```bash
npm run agent "Open https://example.com and verify the page title contains Example"

The agent can:

User Goal
    ↓
AI Agent
    ↓
Launch Browser
    ↓
Navigate to Website
    ↓
Inspect Current Page
    ↓
Understand Page State
    ↓
Choose Next Action
    ↓
Execute Browser Action
    ↓
Verify Goal
    ↓
PASS / FAIL

Example result:

🎯 Goal:
Open https://example.com and verify the page title contains Example

Launching Chromium...

🤖 AI Decision
{
  "tool": "assertTitle",
  "input": {
    "contains": "Example"
  }
}

✅ Title contains "Example"

🛑 AI believes goal is complete.

📊 FINAL VERIFICATION
{
  "status": "PASS"
}

✅ TEST PASSED
🎯 Project Vision

Traditional test automation usually follows this model:

Test Case
    ↓
Automation Script
    ↓
Fixed Locators
    ↓
Browser Execution
    ↓
Test Result

This project explores an alternative approach:

Natural Language Goal
    ↓
AI Agent
    ↓
Browser Observation
    ↓
Action Decision
    ↓
Browser Execution
    ↓
Goal Verification
    ↓
Test Result

The long-term goal is to reduce the amount of website-specific automation code required for common end-to-end testing workflows.

✨ Features
🧠 Autonomous Agent Loop

The agent continuously follows this cycle:

Observe
  ↓
Understand
  ↓
Decide
  ↓
Act
  ↓
Verify

The agent can decide whether the next action should be:

Navigate to a URL
Inspect the page
Click an element
Fill an input
Press a keyboard key
Wait for a page state
Assert text
Assert title
Assert URL
Assert visibility
Finish the test
🌐 Real Browser Automation

The framework uses Playwright to interact with a real Chromium browser.

The agent can perform real browser operations including:

Navigation
Clicking
Text input
Keyboard actions
Page inspection
Assertions
Screenshots
🔍 Browser Memory

The agent stores information about the current page.

Example:

{
  "title": "Example Domain",
  "url": "https://example.com",
  "buttons": [],
  "links": [],
  "inputs": []
}

For more complex pages, the memory can contain:

{
  "buttons": [
    {
      "text": "Login",
      "id": "login-button",
      "ariaLabel": "Login"
    }
  ],
  "links": [
    {
      "text": "Gmail",
      "href": "https://mail.google.com"
    }
  ],
  "inputs": [
    {
      "name": "q",
      "placeholder": "Search"
    }
  ]
}

This information is provided to the AI agent before it decides the next action.

🩹 Self-Healing Automation

The framework includes a self-healing layer for failed actions.

When an action fails:

Action
  ↓
Failure
  ↓
Search Browser Memory
  ↓
Find Similar Element
  ↓
Retry Action

The framework can use similarity matching to find alternative elements when the original action fails.

Example:

Requested:

Login

Available:

Sign In

Similarity Engine
       ↓

Potential Match

This helps reduce the dependency on fixed selectors.

✅ Independent Goal Verification

The agent does not blindly trust its own decision.

When the agent believes the goal is complete:

AI says:

FINISH
   ↓
Independent Verification
   ↓
PASS / FAIL

Example:

Goal:

Open example.com and verify title contains Example

AI Action:

assertTitle

Result:

PASS

The final goal is independently verified before the test is marked as passed.

🧪 Supported Testing Concepts

The framework is designed to support natural-language testing goals such as:

Page Validation
Open https://example.com and verify the page title contains Example
Text Validation
Open Google and verify Gmail exists
Search Flow
Open Google and search for Playwright
Login Flow
Open the application, log in using configured test credentials, and verify the dashboard is displayed
End-to-End Workflow
Open the application, log in, navigate to Box Office, and verify the Box Office page is displayed

The framework is actively being extended to support more generic end-to-end workflows across different applications.

🏗️ Architecture
                    ┌────────────────────┐
                    │   Natural Language  │
                    │       Goal          │
                    └──────────┬─────────┘
                               │
                               ▼
                    ┌────────────────────┐
                    │    Agent Loop      │
                    └──────────┬─────────┘
                               │
                               ▼
                    ┌────────────────────┐
                    │    LLM Provider    │
                    │    OpenRouter      │
                    └──────────┬─────────┘
                               │
                               ▼
                    ┌────────────────────┐
                    │   Next Action      │
                    │   Decision         │
                    └──────────┬─────────┘
                               │
                               ▼
                    ┌────────────────────┐
                    │   Tool Executor    │
                    └──────────┬─────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
          Playwright      Browser Memory   Self Healing
              │                │                │
              └────────────────┼────────────────┘
                               │
                               ▼
                    ┌────────────────────┐
                    │   Goal Verification │
                    └──────────┬─────────┘
                               │
                               ▼
                         PASS / FAIL
📁 Project Structure
src/
│
├── agent/
│   ├── AgentLoop.ts
│   ├── ToolExecutor.ts
│   ├── GoalVerifier.ts
│   └── PromptBuilder.ts
│
├── browser/
│   └── BrowserManager.ts
│
├── framework/
│   ├── ToolRegistry.ts
│   └── registerTools.ts
│
├── healing/
│   ├── AIHealer.ts
│   ├── SelfHealingAgent.ts
│   ├── RetryEngine.ts
│   └── SimilarityEngine.ts
│
├── llm/
│   ├── OpenRouterProvider.ts
│   └── LLMProvider.ts
│
├── memory/
│   ├── BrowserMemory.ts
│   └── MemoryManager.ts
│
├── prompts/
│   └── NextActionPrompt.ts
│
├── tools/
│   ├── launchBrowser.ts
│   ├── goto.ts
│   ├── inspectPage.ts
│   ├── click.ts
│   ├── fill.ts
│   ├── press.ts
│   └── assertions/
│       ├── assertTitle.ts
│       ├── assertText.ts
│       ├── assertUrl.ts
│       └── assertVisible.ts
│
└── cli/
    └── agent.ts
🛠️ Tech Stack
TypeScript
Node.js
Playwright
OpenAI SDK
OpenRouter
LLM-based Agent Architecture
Zod
Chromium
⚙️ Installation

Clone the repository:

git clone <your-repository-url>
cd mcp-learning

Install dependencies:

npm install

Install Playwright browsers:

npx playwright install chromium
🔐 Environment Configuration

Create a .env file:

OPENROUTER_API_KEY=your_openrouter_api_key

OPENROUTER_MODEL=your_model_name

TEST_USERNAME=your_test_username

TEST_PASSWORD=your_test_password

Never commit real credentials or API keys to the repository.

Use .env.example for sharing the required configuration structure:

OPENROUTER_API_KEY=

OPENROUTER_MODEL=

TEST_USERNAME=

TEST_PASSWORD=
▶️ Running the Agent

Build the project:

npm run build

Run an AI-powered browser test:

npm run agent "Open https://example.com and verify the page title contains Example"

Another example:

npm run agent "Open Google and verify Gmail exists"

Search example:

npm run agent "Open Google and search for Playwright"
🔄 Agent Execution Flow

For every goal, the agent follows a loop similar to:

1. Receive Goal
       ↓
2. Launch Browser
       ↓
3. Navigate to URL
       ↓
4. Inspect Current Page
       ↓
5. Store Page Memory
       ↓
6. Ask AI for Next Action
       ↓
7. Execute Action
       ↓
8. Inspect Updated Page
       ↓
9. Repeat
       ↓
10. AI Decides Goal Is Complete
       ↓
11. Independent Verification
       ↓
12. PASS / FAIL
🧩 Example AI Decision

The AI receives the goal and current page state:

Goal:

Open https://example.com and verify the page title contains Example

It can return:

{
  "tool": "assertTitle",
  "input": {
    "contains": "Example"
  }
}

After successful execution:

{
  "tool": "FINISH",
  "input": {}
}
🛡️ Design Principles

The framework follows several principles:

1. Observe Before Acting

The agent should inspect the current page before interacting with it.

2. Never Invent Locators

The agent should use information discovered from the current page.

3. One Action at a Time

The agent decides one action, executes it, and observes the new page state.

4. Verify the Result

The agent should not assume that an action succeeded.

5. Separate Action From Verification

The agent's decision to finish is independently verified.

🚧 Current Limitations

This project is actively under development.

Current areas being improved include:

More reliable handling of complex login flows
Better support for dynamic web applications
Improved locator selection
Handling multiple matching elements
Better handling of popups and modals
Authentication flows
Multi-page workflows
More robust AI output validation
Model fallback strategies
Reduced LLM rate-limit dependency
Better test result reporting
Improved support for complex business workflows

The goal is not to claim that AI can currently replace traditional automation frameworks.

The goal is to explore how AI can make automation:

More adaptive, intelligent, and easier to create.

🗺️ Roadmap
Phase 1 — Core Agent
 Natural-language goals
 Browser launch
 URL navigation
 Page inspection
 AI action selection
 Browser memory
 Basic assertions
Phase 2 — Autonomous Testing
 Multi-step action loop
 Goal completion detection
 Independent goal verification
 Retry mechanism
 Basic self-healing
Phase 3 — Advanced Web Automation
 Generic login flow detection
 Secure credential handling
 Dynamic form understanding
 Better locator ranking
 Modal and popup handling
 Multi-tab support
 File upload/download workflows
Phase 4 — AI Test Generation
 Generate test scenarios from application exploration
 Generate test cases from user stories
 Generate regression suites
 Automatic negative testing
 AI-generated test reports
Phase 5 — Production-Ready Platform
 Parallel execution
 CI/CD integration
 Test history
 Failure analytics
 Screenshot and video evidence
 Dashboard
 Model fallback system
🤝 Contributing

Contributions, ideas, and feedback are welcome.

If you are interested in:

AI-powered testing
Autonomous QA agents
Playwright
SDET frameworks
LLM applications
Self-healing automation

feel free to open an issue or submit a pull request.

⚠️ Disclaimer

This is an experimental AI-powered QA automation project.

LLM-based browser automation can make incorrect decisions, select incorrect elements, or fail to understand complex application states.

For production systems, test execution should always include appropriate:

Access controls
Test environments
Credential management
Execution limits
Human review where necessary
👨‍💻 Author

Built with curiosity by Shubham Sharma.

Exploring the intersection of:

QA Automation
      +
AI Agents
      +
LLMs
      +
Browser Automation

🚀 The future of software testing may not be about writing more automation code — but about building smarter systems that understand what needs to be tested.


I would recommend naming the repository something more professional than `mcp-learning` before sharing it publicly, for example:

- `ai-qa-agent`
- `autonomous-qa-agent`
- `ai-browser-tester`
- `agentic-test-automation`
- `autonomous-test-agent`

My strongest recommendation for your current project is **`ai-qa-agent`**.
