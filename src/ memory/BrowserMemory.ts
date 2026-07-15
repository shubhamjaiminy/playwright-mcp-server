export interface MemoryButton {
  text: string;
  id: string;
  class: string;
  ariaLabel?: string;
  testId?: string;
}

export interface MemoryLink {
  text: string;
  href: string;
}

export interface MemoryInput {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  value?: string;
  ariaLabel?: string;
  testId?: string;
}

export interface PageMemory {
  title: string;
  url: string;
  timestamp?: Date;

  buttons: MemoryButton[];
  links: MemoryLink[];
  inputs: MemoryInput[];
}

export class BrowserMemory {

  private pages: PageMemory[] = [];

  remember(page: PageMemory) {
    this.pages.push(page);
  }

  latest(): PageMemory | undefined {
    return this.pages[this.pages.length - 1];
  }

  all(): PageMemory[] {
    return this.pages;
  }

  getAll(): PageMemory[] {
    return this.pages;
  }

  clear() {
    this.pages = [];
  }

}

export const browserMemory = new BrowserMemory();