import { memory } from "../ memory/MemoryManager.js";
import { SimilarityEngine } from "./SimilarityEngine.js";

export class HealingAgent {

  static async heal(tool: string, args: any) {

    if (tool !== "click")
      return args;

    const page = memory.latest();

    if (!page)
      return args;

    const target = (
      args.name ??
      args.text ??
      args.label ??
      ""
    ).toLowerCase();

    let bestScore = 0;
    let bestRole = "";
    let bestMatch: any;

    for (const button of page.buttons) {

      const score = SimilarityEngine.similarity(
        target,
        button.text
      );

      if (score > bestScore) {
        bestScore = score;
        bestMatch = button;
        bestRole = "button";
      }

    }

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

    console.log(`Best Match Score : ${bestScore}`);

    if (bestScore >= 70 && bestMatch) {

      console.log("🩹 Self Healing Success");

      return {
        role: bestRole,
        name: bestMatch.text
      };

    }

    console.log("❌ No good locator found");

    return args;

  }

}