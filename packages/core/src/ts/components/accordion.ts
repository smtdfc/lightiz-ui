import { LightizUIMetadata } from '../types/index.js';
import { getMetadata } from '../utils/index.js';

export interface LightizUIAccordionOptions {
  multiple ? : boolean;
}

export class LightizUIAccordion {
  private metadata: LightizUIMetadata;
  private items: Element[] = [];
  
  constructor(
    public root: HTMLElement,
    public options: LightizUIAccordionOptions = {}
  ) {
    this.root = root;
    
    this.metadata = getMetadata(root, {
      type: 'accordion',
      data: {
        multiple: options.multiple ?? false
      }
    });
    
    this.init();
  }
  
  private init() {
    this.items = Array.from(this.root.querySelectorAll('.accordion-item'));
    
    this.items.forEach(item => {
      const header = item.querySelector('.accordion-header');
      
      if (header) {
        header.addEventListener('click', () => this.toggleItem(item));
      }
      
      const itemMeta = getMetadata(item as HTMLElement, {
        type: 'accordion-item',
        data: { open: item.hasAttribute('data-open') }
      });
      
      if (itemMeta.data.open) {
        this.openItem(item);
      } else {
        this.closeItem(item);
      }
    });
  }
  
  public toggleItem(item: Element) {
    if (item.classList.contains('active')) {
      this.closeItem(item);
    } else {
      this.openItem(item);
    }
  }
  
  public openItem(item: Element) {
    
    item.classList.add('active');
    const body = item.querySelector('.accordion-body') as HTMLElement;
    if (body) {
      body.style.maxHeight = body.scrollHeight + 'px';
    }
    
    const meta = getMetadata(item as HTMLElement); 
    meta.data.open = true;
  }
  
  public closeItem(item: Element) {
    item.classList.remove('active');
    const body = item.querySelector('.accordion-body') as HTMLElement;
    if (body) {
      body.style.maxHeight = '0';
    }
    
    const meta = getMetadata(item as HTMLElement);
    meta.data.open = false;
  }
  
  public closeAll() {
    this.items.forEach(item => this.closeItem(item));
  }
  
  public open(index: number) {
    const item = this.items[index];
    if (item) this.openItem(item);
  }
  
  public close(index: number) {
    const item = this.items[index];
    if (item) this.closeItem(item);
  }
  
  public toggle(index: number) {
    const item = this.items[index];
    if (item) this.toggleItem(item);
  }
}