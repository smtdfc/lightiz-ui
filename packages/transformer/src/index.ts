import { LightizUIConfig, LightizUIComponent } from './types.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getComponentCode(
  config: LightizUIConfig,
  component: LightizUIComponent
): string {
  const cssPath = path.resolve(
    __dirname,
    config.base,
    'dist/styles/components',
    `${component}.css`
  );
  
  if (!fs.existsSync(cssPath)) {
    console.warn(`[LightizUI] Warning: ${component}.css not found at ${cssPath}`);
    return '';
  }
  
  return fs.readFileSync(cssPath, 'utf-8');
}

export function transform(config: LightizUIConfig): string {
  let code = `/* LightizUI Auto Generated */\n`;
  
  for (const component of config.use) {
    code += `\n/* ${component}.css */\n`;
    code += getComponentCode(config, component);
    code += '\n';
  }
  
  return code;
}

export * from './types.js';