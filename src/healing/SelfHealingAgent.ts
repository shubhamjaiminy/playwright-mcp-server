import { memory } from "../ memory/MemoryManager.js";
import { SimilarityEngine } from "./SimilarityEngine.js";

export class HealingAgent {

    static async heal(tool: string, args: any) {

        if (tool !== "click") {
            return args;
        }

        const page = memory.latest();

        if (!page) {
            return args;
        }

        const target = (
            args.name ??
            args.text ??
            args.label ??
            args.ariaLabel ??
            ""
        ).trim().toLowerCase();

        if (!target) {
            console.log("❌ Cannot heal click: no target text provided");
            return args;
        }

        let bestScore = 0;
        let bestMatch: any = null;
        let bestRole = "";

        // Search buttons
      for (const button of page.buttons) {

    const candidates = [

        button.text,

        button.ariaLabel,

        button.testId,

        button.id,

        // Add this if your memory stores it
        (button as any).name

    ].filter(
        value =>
            typeof value === "string" &&
            value.trim().length > 0
    );

    for (const candidate of candidates) {

        const score =
            SimilarityEngine.similarity(
                target,
                candidate
            );

        if (score > bestScore) {

            bestScore = score;

            bestMatch = button;

            bestRole = "button";

        }

    }

}

        // Search links
        for (const link of page.links) {

            const score = SimilarityEngine.similarity(
                target,
                link.text
            );

            if (score > bestScore) {

                bestScore = score;
                bestMatch = link;
                bestRole = "link";

            }
        }

        console.log(`Best Match Score: ${bestScore}`);

        if (!bestMatch || bestScore < 70) {

            console.log("❌ No good locator found");

            return args;
        }

        console.log("🩹 Self Healing Success");

        // Prefer accessible text
        if (bestMatch.text?.trim()) {

            return {
                role: bestRole,
                name: bestMatch.text.trim()
            };
        }

        // Fallback to aria-label
        if (bestMatch.ariaLabel?.trim()) {

            return {
                ariaLabel: bestMatch.ariaLabel.trim()
            };
        }

        // Fallback to test id
        if (bestMatch.testId?.trim()) {

            return {
                testId: bestMatch.testId.trim()
            };
        }

        // Fallback to id
        if (bestMatch.id?.trim()) {

            return {
                selector: `#${bestMatch.id}`
            };
        }

        console.log("❌ Match found but no usable locator exists");

        return args;
    }

}