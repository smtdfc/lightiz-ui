import { createOrGetData } from '../utils/data.js';
import { createElement } from '../utils/element.js';
import { LightizUIOverlay } from './overlay.js';
import {LightizUIComponent} from "./base.js"



interface OffcanvasAction {
  type: 'toggle' | 'open' | 'close';
}

interface LightizUIOffcanvasData{
  overlay: LightizUIOverlay
}

export class LightizUIOffcanvas extends LightizUIComponent {
  element: HTMLElement;
  data: LightizUIOffcanvasData;
  
  constructor(element: HTMLElement) {
    super();
    this.element = element;
    this.data = createOrGetData(
      this.element,
      {
        overlay: new LightizUIOverlay(createElement(
          'span',
          'overlay'
        ))
      }
    ) as LightizUIOffcanvasData;
  }
  
 // static name = 'offcanvas';
  
  static generator(element: HTMLElement): LightizUIOffcanvas {
    return new LightizUIOffcanvas(element);
  }
  
  open(): void {
    this.element.classList.add('open');
    this.data?.overlay?.open();
  }
  
  close(): void {
    this.element.classList.remove('open');
    this.data?.overlay?.close();
  }
  
  toggle(): void {
    if (this.element.classList.contains('open')) {
      this.close();
    } else {
      this.open();
    }
  }
  
  action(info: OffcanvasAction): void {
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

Object.defineProperty(LightizUIOffcanvas, 'name', {
  value: 'offcanvas',
  writable: false,
  enumerable: true,
  configurable: true
});