import typescript from '@rollup/plugin-typescript';

const isProduction = process.env.NODE_ENV === 'production';
console.log(isProduction)
export default {
  input: 'src/index.ts',
  external: ['lightizui-transformer'],
  output: {
    file: './dist/index.js',
    format: 'esm',
    sourcemap: true,
    paths: {
      'lightizui-transformer': !isProduction ? '../../transformer/dist/index.js' : 'lightizui-transformer'
    }
  },
  plugins: [
    typescript({ tsconfig: './tsconfig.json' })
  ]
};