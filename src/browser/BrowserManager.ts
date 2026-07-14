import { Browser, chromium, Page } from "playwright";
import fs from "fs";

export class BrowserManager {

    private browser: Browser | null = null;
    private page: Page |null = null;

    async launch() {

        if(!this.browser){

            console.log("Launching Chromium...");

            this.browser = await chromium.launch({
                headless:false
            });

            this.page = await this.browser.newPage();
        }

        return this.page!;
    }

    getPage(){

        if(!this.page){
            throw new Error("Browser not launched");
        }

        return this.page;
    }
    async screenshot(name:string){

await this.getPage().screenshot({

path:`screenshots/${name}.png`

});

}

 

    async close(){

        if(this.browser){

            await this.browser.close();

            this.browser=null;
            this.page=null;

        }

    }

}

export const browserManager = new BrowserManager();