import {LightizUIComponent} from "./base.js"


interface ToastAction {
  type: 'toggle' | 'show' | 'hide';
  options ? : any[];
}

export class LightizUIToast extends LightizUIComponent{
  element: HTMLElement;
  
  constructor(element: HTMLElement) {
    super();
    this.element = element;
  }
  

  static generator(element: HTMLElement): LightizUIToast {
    return new LightizUIToast(element);
  }
  
  static create(message: string, type: string): LightizUIToast {
    let element = document.createElement('div');
    element.textContent = message;
    element.classList.add('toast', `toast-${type}`);
    return this.generator(element);
  }
  
  show(): void {
    this.element.classList.add('show');
    this.element.classList.remove('hide');
  }
  
  hide(remove: boolean = false): void {
    this.element.classList.remove('show');
    this.element.classList.add('hide');
    if (remove) {
      setTimeout(() => {
        this.element.remove();
      }, 500);
    }
  }
  
  toggle(): void {
    if (this.element.classList.contains('show')) {
      this.hide();
    } else {
      this.show();
    }
  }
  
  action(info: ToastAction): void {
    switch (info.type) {
      case 'toggle':
        this.toggle();
        break;
        
      case 'show':
        this.show();
        break;
        
      case 'hide':
        this.hide(...(info.options ?? []));
        break;
        
      default:
        throw new Error('Unsupported action!');
    }
  }
}

Object.defineProperty(LightizUIToast, 'name', {
  value: 'toast',
  writable: false,
  enumerable: true,
  configurable: true
});