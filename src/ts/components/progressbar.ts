import { createOrGetData } from '../utils/data.js';
import { createElement } from '../utils/element.js';
import { LightizUIComponent } from "./base.js"



interface ProgressBarAction {
  type: 'increase' | 'set' | 'decrease';
  options: string[];
}

interface LightizUIProgressBarData {
  current: number
}


export class LightizUIProgressBar extends LightizUIComponent {
  element: HTMLElement;
  data: LightizUIProgressBarData;
  
  constructor(element: HTMLElement) {
    super();
    this.element = element;
    this.data = createOrGetData(
      this.element,
      {
        current: parseFloat(getComputedStyle(this.element).getPropertyValue('--progress-bar-value').replace('%', '')) || 0
      }
    ) as LightizUIProgressBarData;
  }
  
  // static name = 'progressbar';
  
  static generator(element: HTMLElement): LightizUIProgressBar {
    return new LightizUIProgressBar(element);
  }
  
  updateText(): void {
    if (this.element.classList.contains('progree-bar-text')) {
      (this.element.querySelector('.progress-bar') ?? createElement('div', 'progress-bar')).textContent = `${this.data.current} %`;
    } else {
      (this.element.querySelector('.progress-bar') ?? createElement('div', 'progress-bar')).textContent = '0';
    }
  }
  
  increase(value: number): void {
    this.data.current += value;
    this.element.style.setProperty('--progress-bar-value', `${this.data.current}%`);
  }
  
  decrease(value: number): void {
    this.data.current -= value;
    this.element.style.setProperty('--progress-bar-value', `${this.data.current}%`);
  }
  
  set(value: number): void {
    this.data.current = value;
    this.element.style.setProperty('--progress-bar-value', `${this.data.current}%`);
  }
  
  action(info: ProgressBarAction): void {
    switch (info.type) {
      case 'increase':
        this.increase(parseInt(info.options[0]) || 1);
        break;
        
      case 'set':
        this.set(parseInt(info.options[0]) || 0);
        break;
        
      case 'decrease':
        this.decrease(parseInt(info.options[0]) || 1);
        break;
        
      default:
        throw new Error('Unsupported action!');
    }
  }
}


Object.defineProperty(LightizUIProgressBar, 'name', {
  value: 'progressbar',
  writable: false,
  enumerable: true,
  configurable: true
});