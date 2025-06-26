import { LightizUIMetadata } from '../types/index.js';
import { getMetadata } from '../utils/index.js';

export interface LightizUITabOption {
  activeIndex ? : number;
}

export class LightizUITab {
  private metadata: LightizUIMetadata;
  private tabButtons: HTMLElement[] = [];
  private tabPanels: HTMLElement[] = [];
  
  constructor(
    public root: HTMLElement,
    public options: LightizUITabOption = {}
  ) {
    this.root = root;
    
    this.metadata = getMetadata(root, {
      type: 'tabs',
      data: {
        activeIndex: options.activeIndex ?? 0,
      }
    });
    
    this.init();
  }
  
  private init() {
    this.tabButtons = Array.from(this.root.querySelectorAll < HTMLElement > ('[data-tab]'));
    this.tabPanels = Array.from(this.root.querySelectorAll < HTMLElement > ('[data-tab-panel]'));
    
    this.tabButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => this.activate(index));
    });
    
    this.activate(this.metadata.data.activeIndex);
  }
  
  public activate(index: number) {
    if (index < 0 || index >= this.tabButtons.length) return;
    
    this.tabButtons.forEach(btn => btn.classList.remove('active'));
    this.tabPanels.forEach(panel => panel.classList.remove('active'));

    const indicator = this.root.querySelector('.tab-indicator') as HTMLElement;
    const button = this.tabButtons[index];
    const panel = this.tabPanels[index];

    button && button.classList.add('active');
    if (indicator) {
      const activeTab = this.tabButtons[index];
      const { offsetLeft, offsetWidth } = activeTab;
      indicator.style.transform = `translateX(${offsetLeft}px)`;
      indicator.style.width = `${offsetWidth}px`;
    }
    panel && panel.classList.add('active');

    this.metadata.data.activeIndex = index;
  }
  
  public activateById(tabId: string) {
    const index = this.tabButtons.findIndex(btn => btn.dataset.tab === tabId);
    if (index !== -1) this.activate(index);
  }
  
  public activateByElement(element: HTMLElement) {
    const index = this.tabButtons.indexOf(element);
    if (index !== -1) this.activate(index);
  }
  
  public get activeIndex() {
    return this.metadata.data.activeIndex;
  }
}