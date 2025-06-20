import type { LoaderContext } from 'webpack';
import { transform, LightizUIConfig } from 'lightizui-transformer';
import path from 'path';

function lightizuiStyleLoader(this: LoaderContext < {} > , source: string): void {
  const callback = this.async();
  
  try {
    const config: LightizUIConfig = JSON.parse(source);
    const css = transform(config);
    const resourceName = path.basename(this.resourcePath).replace(/\.lightizui\.style$/, '.css');
    const outputPath = `styles/${resourceName}`;
    this.emitFile(outputPath, css);
    callback(null, `export default ${JSON.stringify(outputPath)};`);
  } catch (err) {
    callback(new Error(`[LightizUI Loader] Failed to process file: ${(err as Error).message}`));
  }
}

export default lightizuiStyleLoader;