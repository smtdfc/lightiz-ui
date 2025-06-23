import {LightizUIMetadata} from '../types/index.js';


interface HTMLElementWithLightiz extends HTMLElement {
  _lightizui?: LightizUIMetadata;
}

export function getMetadata(
  element: HTMLElement,
  fallback: LightizUIMetadata
): LightizUIMetadata {
  const el = element as HTMLElementWithLightiz;

  if (el._lightizui) {
    return el._lightizui;
  } else {
    el._lightizui = fallback;
    return fallback;
  }
}