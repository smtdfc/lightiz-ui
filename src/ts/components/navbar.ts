import {LightizUIComponent} from "./base.js"



export interface NavbarAction {
  type: 'toggle' | 'open' | 'close';
}

export class LightizUINavbar extends LightizUIComponent{
  element: HTMLElement;
  
  constructor(element: HTMLElement) {
    super();
    this.element = element;
  }
  
  //static name = 'navbar';
  
  static generator(element: HTMLElement): LightizUINavbar {
    return new LightizUINavbar(element);
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
  
  action(info: NavbarAction): void {
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

Object.defineProperty(LightizUINavbar, 'name', {
  value: 'navbar',
  writable: false,
  enumerable: true,
  configurable: true
});