import { LightizUIComponent } from './components/index.js'; 

interface ActionInfo {
  type: 'toggle' | 'active';
  trigger: HTMLElement;
  target: HTMLElement;
  component:  LightizUIComponent;
  options: any[];
}

export function toggle(component:  LightizUIComponent, element: HTMLElement, options: any[] = []): void {
  component.generator(element, options).action({
    type: 'toggle',
    trigger: element,
    target: element,
    component,
    options
  });
}

export function active(component: LightizUIComponent, element: HTMLElement, options: any[] = []): void {
  component.generator(element, options).action({
    type: 'active',
    trigger: element,
    component,
    target: element,
    options
  });
}