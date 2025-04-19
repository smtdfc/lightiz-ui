import { createOrGetData } from '../utils/data.js';
import { createElement } from '../utils/element.js';
import { generateId } from '../utils/key.js';
import { LightizUIComponent } from "./base.js"



interface TabAction {
  type: 'active';
  trigger: HTMLElement;
}

interface LightizUITabData {
  id: string;
  isObserve: boolean;
  activeItem: HTMLElement;
  index: number;
  
}


export class LightizUITab extends LightizUIComponent {
  element: HTMLElement;
  indicator: HTMLElement;
  metadata: LightizUITabData;
  
  constructor(element: HTMLElement) {
    super();
    this.element = element;
    this.indicator = this.element.querySelector('.tab-indicator') ?? createElement('div', 'tab-indicator');
    this.metadata = createOrGetData(this.element, {
      id: generateId(),
      isObserve: false,
      activeItem: this.getActiveItem() ?? createElement('div', 'tab'),
      index: 0,
    }) as LightizUITabData;
    
    if (!this.metadata.isObserve) this._setup();
  }
  
  //static name = 'tab';
  
  static generator(element: HTMLElement): LightizUITab {
    return new LightizUITab(element);
  }
  
  private _setup(): void {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if ((node as HTMLElement).classList?.contains('tab')) {
            this.updateIndicator(this.metadata.activeItem);
          }
        });
      });
    });
    
    observer.observe(this.element, { childList: true });
  }
  
  updateIndicator(anchor: HTMLElement = createElement('div')): void {
    const containerRect = this.element.getBoundingClientRect();
    const anchorRect = anchor.getBoundingClientRect();
    const left = anchorRect.left - containerRect.left + this.element.scrollLeft;
    const width = anchorRect.width;
    this.indicator.style.left = left + 'px';
    this.indicator.style.width = width + 'px';
  }
  
  getActiveItem(): HTMLElement | null {
    for (let element of (Array.from(this.element.children) as HTMLElement[])){
      if (element.classList.contains('active')) return element;
    }
    return null;
  }
  
  inactiveAll(): void {
    (Array.from(this.element.children) as HTMLElement[]).forEach((element) => {
      element.classList.remove('active');
      if (element.dataset.panel) {
        document.querySelector(element.dataset.panel)?.classList.remove('active');
      }
    });
  }
  
  setTabByIndex(index: number, force: boolean = false): void {
    if (this.metadata.index === index && !force) return;
    this.metadata.index = index;
    this.active(this.element.children[index] as HTMLElement);
  }
  
  active(element: HTMLElement): void {
    this.inactiveAll();
    this.metadata.activeItem = element;
    this.updateIndicator(element);
    element.classList.add('active');
    
    if (element.dataset.panel) {
      document.querySelector(element.dataset.panel)?.classList.add('active');
    }
  }
  
  action(info: TabAction): void {
    switch (info.type) {
      case 'active':
        this.active(info.trigger);
        break;
        
      default:
        throw new Error('Unsupported action!');
    }
  }
}

Object.defineProperty(LightizUITab, 'name', {
  value: 'tab',
  writable: false,
  enumerable: true,
  configurable: true
});