import { ExecutionPlan } from "../models/ExecutionPlan.js";

export const loginPlan: ExecutionPlan = {

    goal: "Peak Login",

    steps: [

        {
            id:1,
            tool:"launchBrowser",
            description:"Launch browser",
            input:{}
        },

        {
            id:2,
            tool:"goto",
            description:"Navigate to login",
            input:{
                url:"https://example.com"
            }
        },

        {
            id:3,
            tool:"inspectPage",
            description:"Inspect page",
            input:{}
        }

    ]

};