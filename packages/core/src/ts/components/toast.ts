import { LightizUIMetadata } from '../types/index.js';
import { getMetadata, createElement } from '../utils/index.js';

export type LightizUIToastContainerAnchor = |
  'top-left' |
  'top-right' |
  'top-center' |
  'bottom-left' |
  'bottom-right' |
  'bottom-center';

export interface LightizUIToastOptions {
  autoHide: boolean;
  autoRemove: boolean;
  duration: number;
}

export class LightizUIToast {
  public metadata: LightizUIMetadata;
  private timeoutId: ReturnType < typeof setTimeout > | null = null;
  public options: LightizUIToastOptions;
  
  static rootContainer = LightizUIToast.createContainer('bottom-center');
  constructor(
    public root: HTMLElement,
    options ? : Partial < LightizUIToastOptions >
  ) {
    this.root = root;
    this.options = {
      autoHide: true,
      autoRemove: true,
      duration: 3000,
      ...options
    };
    
    this.metadata = getMetadata(root, {
      type: 'toast',
      data: {
        show: false
      }
    });
  }
  
  show() {
    if (this.metadata.data.show) return;
    
    this.metadata.data.show = true;
    this.root.classList.add('show');
    
    if (this.options.autoHide && this.options.duration > 0) {
      if (this.timeoutId) clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.hide();
      }, this.options.duration);
    }
  }
  
  hide() {
    if (!this.metadata.data.show) return;
    
    this.metadata.data.show = false;
    this.root.classList.remove('show');
    this.root.classList.add('hide');
    
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    
    if (this.options.autoRemove) {
      const onAnimationEnd = () => {
        this.root.classList.remove('hide');
        this.root.removeEventListener('animationend', onAnimationEnd);
        if (this.options.autoRemove) {
          this.root.remove();
        }
      };
      this.root.addEventListener('animationend', onAnimationEnd);
    }
  }
  
  static createContainer(
    anchor: LightizUIToastContainerAnchor
  ): HTMLElement {
    let container = createElement(
      "span", { "class": `toast-container toast-${anchor}` },
      []
    );
    
    return container;
  }
  
  static showInfo(
    message: string,
    options ? : LightizUIToastOptions
  ): LightizUIToast {
    let root = createElement(
      "span", { "class": "toast toast-info" },
      [message]
    );
    LightizUIToast.rootContainer.appendChild(root);
    let ins = new LightizUIToast(root, options);
    ins.show();
    return ins;
  }
  
  static showSuccess(
    message: string,
    options ? : LightizUIToastOptions
  ): LightizUIToast {
    let root = createElement(
      "span", { "class": "toast toast-success" },
      [message]
    );
    LightizUIToast.rootContainer.appendChild(root);
    let ins = new LightizUIToast(root, options);
    ins.show();
    return ins;
  }
  
  static showWarn(
    message: string,
    options ? : LightizUIToastOptions
  ): LightizUIToast {
    let root = createElement(
      "span", { "class": "toast toast-warning" },
      [message]
    );
    LightizUIToast.rootContainer.appendChild(root);
    let ins = new LightizUIToast(root, options);
    ins.show();
    return ins;
  }
  
  static showDanger(
    message: string,
    options ? : LightizUIToastOptions
  ): LightizUIToast {
    let root = createElement(
      "span", { "class": "toast toast-danger" },
      [message]
    );
    LightizUIToast.rootContainer.appendChild(root);
    let ins = new LightizUIToast(root, options);
    ins.show();
    return ins;
  }
}

document.body.appendChild(LightizUIToast.rootContainer);