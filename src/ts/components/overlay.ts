import {LightizUIComponent} from "./base.js"




export interface OverlayAction {
  type: 'toggle' | 'open' | 'close';
}

export class LightizUIOverlay extends LightizUIComponent {
  element: HTMLElement;
  
  constructor(element: HTMLElement) {
    super();
    this.element = element;
  }
  
//  static name = 'overlay';
  
  static generator(element: HTMLElement): LightizUIOverlay {
    return new LightizUIOverlay(element);
  }
  
  open(): void {
    this.element.classList.add('active');
  }
  
  close(): void {
    this.element.classList.remove('active');
  }
  
  toggle(): void {
    if (this.element.classList.contains('active')) {
      this.close();
    } else {
      this.open();
    }
  }
  
  action(info: OverlayAction): void {
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

Object.defineProperty(LightizUIOverlay, 'name', {
  value: 'overlay',
  writable: false,
  enumerable: true,
  configurable: true
});