import {LightizUIComponent} from "./base.js"



export interface SidebarAction {
  type: 'toggle' | 'open' | 'close';
}

export class LightizUISidebar extends LightizUIComponent{
  element: HTMLElement;
  
  constructor(element: HTMLElement) {
    super();
    this.element = element;
  }
  
  //static name = 'sidebar';
  
  static generator(element: HTMLElement): LightizUISidebar {
    return new LightizUISidebar(element);
  }
  
  open(): void {
    this.element.classList.add('open');
  }
  
  close(): void {
    this.element.classList.remove('open');
  }
  
  toggle(): void {
    if (this.element.classList.contains('open')) {
      this.close();
    } else {
      this.open();
    }
  }
  
  action(info: SidebarAction): void {
    switch (info.type) {
      case 'toggle':
        this.toggle();
        break;
      case 'open':
        this.open();
        break;
      case 'close':
        this.close();
        break;
      default:
        throw new Error('Unsupported action!');
    }
  }
}

Object.defineProperty(LightizUISidebar, 'name', {
  value: 'sidebar',
  writable: false,
  enumerable: true,
  configurable: true
});