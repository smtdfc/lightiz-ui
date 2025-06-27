import { LightizUIMetadata } from '../types/index.js';
import { getMetadata } from '../utils/index.js';

export interface LightizUIOffcanvasOptions {}

export class LightizUIOffcanvas {
  private metadata: LightizUIMetadata;
  private items: Element[] = [];
  
  constructor(
    public root: HTMLElement,
    public options: LightizUIOffcanvasOptions = {}
  ) {
    this.root = root;
    
    this.metadata = getMetadata(root, {
      type: 'offcanvas',
      data: {
        open: false
      }
    });
    
    this.init();
  }
  
  private init() {
    let toggler = this.root.querySelector(".offcanvas-toggle");
    if (toggler) toggler.addEventListener('click', () => this.toggle());
  }
  
  open() {
    this.root.classList.add('open');
    this.metadata.data.open = true;
  }
  
  close() {
    this.root.classList.remove('open');
    this.metadata.data.open = true;
  }
  
  toggle() {
    if (this.metadata.data.open) this.close();
    else this.open();
  }
}