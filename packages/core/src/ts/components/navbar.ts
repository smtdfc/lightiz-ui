import { LightizUIMetadata } from '../types/index.js';
import { getMetadata } from '../utils/index.js';

export interface LightizUINavbarOptions {}

export class LightizUINavbar {
  private metadata: LightizUIMetadata;
  private items: Element[] = [];
  
  constructor(
    public root: HTMLElement,
    public options: LightizUINavbarOptions = {}
  ) {
    this.root = root;
    
    this.metadata = getMetadata(root, {
      type: 'navbar',
      data: {
        open: false
      }
    });
    
    this.init();
  }
  
  private init() {
    let toggler = this.root.querySelector(".navbar-toggle");
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