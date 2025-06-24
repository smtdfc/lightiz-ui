import { LightizUIMetadata } from '../types/index.js';
import { getMetadata } from '../utils/index.js';

export interface LightizUIToastOptions {
  autoHide: boolean;
  autoRemove: boolean;
  duration: number;
}

export class LightizUIToast {
  public metadata: LightizUIMetadata;
  private timeoutId: ReturnType < typeof setTimeout > | null = null;
  public options: LightizUIToastOptions;
  
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
}