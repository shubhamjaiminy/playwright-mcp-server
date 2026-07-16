import { Browser, chromium, Page } from "playwright";
import fs from "fs";

export class BrowserManager {

    private browser: Browser | null = null;
    private page: Page | null = null;

    async launch() {

        if (!this.browser) {

            console.log("Launching Chromium...");

            this.browser = await chromium.launch({
                headless: false
            });

            this.page = await this.browser.newPage();

        }

        return this.page!;

    }

    getPage() {

        if (!this.page)
            throw new Error("Browser not launched.");

        return this.page;

    }

    // NEW
    async screenshotBase64(): Promise<string> {

        if (!this.page)
            return "";

        const buffer = await this.page.screenshot({
            fullPage: true
        });

        return buffer.toString("base64");

    }

    // UPDATED
    async screenshot(fileName: string) {

        if (!this.page)
            return "";

        if (!fs.existsSync("./reports/screenshots")) {

            fs.mkdirSync("./reports/screenshots", {
                recursive: true
            });

        }

        const file =
            `./reports/screenshots/${fileName}.png`;

        await this.page.screenshot({

            path: file,

            fullPage: true

        });

        return file;

    }

    async close() {

        if (!this.browser)
            return;

        await this.browser.close();

        this.browser = null;
        this.page = null;

    }

}

export const browserManager =
    new BrowserManager();