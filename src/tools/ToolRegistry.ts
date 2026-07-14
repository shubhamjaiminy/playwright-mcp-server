import { ToolDefinition } from "./ToolDefinition.js";

export class ToolRegistry {

    static getTools(): ToolDefinition[] {

        return [

            {
                name: "launchBrowser",
                description: "Launch Chromium browser",
                inputs: []
            },

            {
                name: "goto",
                description: "Navigate browser to URL",
                inputs: ["url"]
            },

            {
                name: "inspectPage",
                description: "Read title, url and DOM",
                inputs: []
            },

            {
                name: "click",
                description: "Click an element",
                inputs: ["locator"]
            },

            {
                name: "fill",
                description: "Fill textbox",
                inputs: ["locator","value"]
            },

            {
                name: "wait",
                description: "Wait for page",
                inputs: ["milliseconds"]
            }

        ];

    }

}