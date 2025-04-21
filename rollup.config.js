import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import scss from 'rollup-plugin-scss';
import babel from '@rollup/plugin-babel';
import os from 'os';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const isProd = process.env.NODE_ENV === 'production';
const buildTarget = process.env.BUILD_TARGET || 'js'; 
const extensions= ['.js', '.jsx', '.ts', '.tsx'];


const jsPlugins = [
  resolve({extensions}),
  commonjs(),
  babel({
    presets: [["@babel/preset-typescript", { isTSX: true, allExtensions: true }]],
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
    extensions
  }),
];

if (isProd) {
  jsPlugins.push(
    terser({
      module: true,
      compress: { defaults: true },
      mangle: true,
      output: { comments: false },
      maxWorkers: os.cpus().length || 1,
    })
  );
}



const cssPlugins = [
  scss({
    sass: require('sass'),
    fileName: isProd ? 'index.min.css' : 'index.css',
    outputStyle: isProd ? 'compressed' : 'expanded',
    output: path.join(__dirname, 'dist'),
    include: ['src/**/*.scss'],
  }),
];



const jsConfig = {
  input: path.join(__dirname, 'src/index.ts'),
  output: [
    {
      file: path.join(__dirname, `dist/index.esm.js`),
      format: 'esm',
    },
    {
      file: path.join(__dirname, `dist/index.cjs.js`),
      format: 'cjs',
    },
    {
      file: path.join(__dirname, `dist/index.min.js`),
      format: 'iife',
      name: 'LightizUI',
    },
  ],
  plugins: jsPlugins,
};

const cssConfig = {
  input: path.join(__dirname, 'src/index.scss.ts'),
  
  output: {
    file: path.join(__dirname, 'dist/_'),
    format: 'esm',
  },
  plugins: cssPlugins,
};

export default buildTarget === 'css' ? cssConfig : jsConfig;