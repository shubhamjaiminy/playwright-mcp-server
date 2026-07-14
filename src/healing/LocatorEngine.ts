import { ElementMemory } from "./ElementMemory.js";

export class LocatorEngine {
    all(): any {
      throw new Error("Method not implemented.");
    }

    private elements: ElementMemory[] = [];

    remember(element: ElementMemory) {

        console.log("📌 Learned:", element.text);

        this.elements.push(element);

    }

    find(text: string) {

        return this.elements.find(e =>
            e.text.toLowerCase() === text.toLowerCase()
        );

    }

    getAll() {

        return this.elements;

    }

}