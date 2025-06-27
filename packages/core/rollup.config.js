import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/ts/index.ts',
  external: ['lightizui-transformer'],
  output: {
    file: './dist/index.js',
    format: 'esm',
    sourcemap: false,
    paths: {
      'lightizui-transformer': '../../transformer/dist/index.js'
    }
  },
  plugins: [
    typescript({ tsconfig: './tsconfig.json' })
  ]
};