export interface MemoryButton {
  text: string;
  id: string;
  class: string;
  ariaLabel?: string | null;
  testId?: string | null;
}

export interface MemoryLink {
  text: string;
  href: string | null;
}

export interface MemoryInput {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  value: string;
  ariaLabel?: string | null;
  testId?: string | null;
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

  getAll(): PageMemory[] {
    return this.pages;
  }

  all(): PageMemory[] {
    return this.pages;
  }

  clear() {
    this.pages = [];
  }
}