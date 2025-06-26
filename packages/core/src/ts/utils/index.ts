import {LightizUIMetadata} from '../types/index.js';


interface HTMLElementWithLightiz extends HTMLElement {
  _lightizui?: LightizUIMetadata;
}

export function getMetadata(
  element: HTMLElement,
  fallback: LightizUIMetadata={
    type:"unknown",
    data:{}
  }
): LightizUIMetadata {
  const el = element as HTMLElementWithLightiz;

  if (el._lightizui) {
    return el._lightizui;
  } else {
    el._lightizui = fallback;
    return fallback;
  }
}

export function createElement(
  tag: string,
  attrs: Record < string, any > = {},
  children: (Node | string)[] = []
): HTMLElement {
  const element = document.createElement(tag);
  
  for (const [key, value] of Object.entries(attrs)) {
    element.setAttribute(key, String(value));
  }
  
  for (const child of children) {
    element.appendChild(
      typeof child != 'object' ?
      document.createTextNode(String(child)) :
      child
    );
  }
  
  return element;
}