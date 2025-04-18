import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import scss from 'rollup-plugin-scss';
import os from 'os';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default [
{
  input: path.join(__dirname, 'src/index.js'),
  output: [
  {
    file: path.join(__dirname, 'dist/index.esm.js'),
    format: 'esm',
    sourcemap: path.join(__dirname, 'dist/index.map'),
    sourcemapExcludeSources: true,
  },
  {
    file: path.join(__dirname, 'dist/index.cjs.js'),
    format: 'cjs',
    sourcemap: false,
  },
  {
    file: path.join(__dirname, 'dist/index.js'),
    format: 'iife',
    name: 'LightizUI',
    sourcemap: false,
  }, ],
  plugins: [
    resolve(),
    commonjs(),
    scss({
      fileName: 'index.css',
      output: path.join(__dirname, 'dist')
    })
  ],
},
{
  input: path.join(__dirname, 'src/index.js'),
  output: [
  {
    file: path.join(__dirname, 'dist/index.esm.min.js'),
    format: 'esm',
    sourcemap: false,
  },
  {
    file: path.join(__dirname, 'dist/index.cjs.min.js'),
    format: 'cjs',
    sourcemap: false,
  },
  {
    file: path.join(__dirname, 'dist/index.min.js'),
    format: 'iife',
    name: 'LightizUI',
    sourcemap: false,
  }, ],
  
  plugins: [
    resolve(),
    commonjs(),
    terser({
      module: true,
      compress: { defaults: true },
      mangle: true,
      output: { comments: false },
      maxWorkers: os.cpus().length || 1,
    }),
    scss({
      sass: require('sass'),
      fileName: 'index.min.css',
      outputStyle: 'compressed',
      output: path.join(__dirname, 'dist')
    })
  ],
}, ];