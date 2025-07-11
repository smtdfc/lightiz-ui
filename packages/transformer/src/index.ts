import { LightizUIConfig, LightizUIComponent, LightizUIHelper } from './types.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getComponentCode(
  config: LightizUIConfig,
  component: LightizUIComponent
): string {
  const cssPath = path.resolve(
    process.cwd(),
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

function getHelperCode(
  config: LightizUIConfig,
  component: LightizUIHelper
): string {
  const cssPath = path.resolve(
    process.cwd(),
    config.base,
    'dist/styles/helpers',
    `${component}.css`
  );
  
  if (!fs.existsSync(cssPath)) {
    console.warn(`[LightizUI] Warning: ${component}.css not found at ${cssPath}`);
    return '';
  }
  
  return fs.readFileSync(cssPath, 'utf-8');
}

function getBaseCode(
  config: LightizUIConfig,
): string {
  const cssPath = path.resolve(
    process.cwd(),
    config.base,
    'dist/styles/',
    `index.css`
  );
  
  if (!fs.existsSync(cssPath)) {
    console.warn(`[LightizUI] Warning: index.css not found at ${cssPath}`);
    return '';
  }
  
  return fs.readFileSync(cssPath, 'utf-8');
}


export function transform(config: LightizUIConfig): string {
  let code = `/* LightizUI Auto Generated */\n`;
  
  code += getBaseCode(config);
  if (config.components) {
    for (const component of config.components) {
      code += `\n/* ${component}.css */\n`;
      code += getComponentCode(config, component);
      code += '\n';
    }
  }
  
  if (config.helpers) {
    for (const helper of config.helpers) {
      code += `\n/* ${helper}.css */\n`;
      code += getHelperCode(config, helper);
      code += '\n';
    }
  }
  
  return code;
}

export * from './types.js';