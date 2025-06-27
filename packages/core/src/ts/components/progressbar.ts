import { LightizUIMetadata } from '../types/index.js';
import { getMetadata } from '../utils/index.js';

export interface LightizUIProgressBarOptions {
  speed:number;
}

export class LightizUIProgressBar {
  private metadata: LightizUIMetadata;
  private items: Element[] = [];
  
  constructor(
    public root: HTMLElement,
    public options:Partial<LightizUIProgressBarOptions> = {}
  ) {
    this.root = root;
    
    this.metadata = getMetadata(root, {
      type: 'progressbar',
      data: {
        value:parseInt(this.root.style.getPropertyValue('--progress-bar-value')),
        speed:options.speed ?? 0.5
      }
    });
    
    this.init();
  }
  
  private init() {
    this.root.style.setProperty("--progress-bar-transition-speed",`${this.metadata.data.speed}s`);
  }
  
  setValue(val:number){
    this.metadata.data.speed = val;
    this.root.style.setProperty("--progress-bar-value",String(val));
  }
}