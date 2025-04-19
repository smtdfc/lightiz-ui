import {LightizUIComponent} from "./base.js"

export interface AccordionAction {
  type: 'toggle' | 'open' | 'close';
}

export class LightizUIAccordion extends LightizUIComponent{
  element: HTMLElement;
  
  constructor(element: HTMLElement) {
    super();
    this.element = element;
  }
  
 
  static generator(element: HTMLElement): LightizUIAccordion {
    return new LightizUIAccordion(element);
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
  
  action(info: AccordionAction): void {
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

Object.defineProperty(LightizUIAccordion, 'name', {
  value: 'accordion',
  writable: false,
  enumerable: true,
  configurable: true
});