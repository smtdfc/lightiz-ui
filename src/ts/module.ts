import * as components from './components/index.js';
import {LightizUIComponent } from './components/base.js';

function findComponent(type: string) {
  for (let componentClassName in components) {
    const component = components[componentClassName as keyof typeof components];
    if (component?.name === type) return component;
  }
  return null;
}

function parseCommand(command: string) {
  const parts = command.split(':');
  if (parts.length < 3) return null;
  
  const [action, componentType, target, ...optionGroups] = parts;
  return { action, componentType, target, options: optionGroups };
}

export class LightizUIModule {
  app: any;
  options: any;
  
  constructor(app: any, opts: any = {}) {
    this.app = app;
    this.options = opts;
    this.initListener();
  }
  
  initListener() {
    window.addEventListener('click', (e: MouseEvent) => {
      const trigger = e.target as HTMLElement;
      const datasets = trigger.dataset;
      
      if (datasets.ui) {
        const parsed = parseCommand(datasets.ui);
        if (!parsed) return;
        
        const { target, action, componentType, options } = parsed;
        const element = document.querySelector(target) as HTMLElement;
        const Component = findComponent(componentType);
        if (!Component) return;
        
        (Component as LightizUIComponent).generator(element, options).action({
          type: action,
          trigger,
          target: element,
          component: Component,
          options
        });
      }
    });
  }
  
  static init(app: any, opts: any = {}) {
    return new LightizUIModule(app, opts);
  }
}