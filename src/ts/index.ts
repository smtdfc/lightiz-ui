export * from './components/index.js';
export * from './events.js';
export * from './module.js';
export * from './toast.js';

import * as components from './components/index.js';
import * as events from './events.js';
import * as module from './module.js';
import * as toast from './toast.js';

declare global {
  interface Window {
    LightizUI: Record<string, any>;
  }
}

window.LightizUI = {
  ...components,
  ...events,
  ...module,
  ...toast,
};