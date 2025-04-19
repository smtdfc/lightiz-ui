import {LightizUIComponent} from "./base.js"



export interface ModalAction {
  type: 'toggle' | 'open' | 'close';
}

export class LightizUIModal extends LightizUIComponent {
  element: HTMLElement;
  contents: HTMLElement | null;
  overlay: HTMLDivElement | null = null;
  
  constructor(element: HTMLElement) {
    super();
    this.element = element;
    this.contents = this.element.querySelector('.modal-content');
    this.element.style.display = 'none';
  }
  
 // static name = 'modal';
  
  static generator(element: HTMLElement): LightizUIModal {
    return new LightizUIModal(element);
  }
  
  open(): void {
    if (this.element.classList.contains('active')) return;
    
    this.overlay = document.createElement('div');
    this.overlay.classList.add('modal-overlay');
    this.element.prepend(this.overlay);
    
    this.overlay.addEventListener('click', (e: MouseEvent) => {
      if (e.target === this.overlay) this.close();
    });
    
    this.element.style.display = 'block';
    
    requestAnimationFrame(() => {
      this.element.classList.add('active');
      this.element.classList.remove('modal-hidden');
    });
  }
  
  close(): void {
    this.element.classList.add('modal-hidden');
    this.element.classList.remove('active');
    
    const onAnimationEnd = () => {
      this.element.style.display = 'none';
      this.element.classList.remove('modal-hidden');
      
      if (this.overlay) {
        this.overlay.remove();
        this.overlay = null;
      }
      
      this.element.removeEventListener('animationend', onAnimationEnd);
    };
    
    this.element.addEventListener('animationend', onAnimationEnd);
  }
  
  toggle(): void {
    if (this.element.classList.contains('active')) {
      this.close();
    } else {
      this.open();
    }
  }
  
  action(info: ModalAction): void {
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

Object.defineProperty(LightizUIModal, 'name', {
  value: 'modal',
  writable: false,
  enumerable: true,
  configurable: true
});