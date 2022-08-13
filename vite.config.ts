// vite.config.js
import path from 'path' 
import { defineConfig } from 'vite'
import typescript from '@rollup/plugin-typescript';

const resolvePath = (str) => path.resolve(__dirname, str)

const fileName = (format) => {
  let type = format === 'cjs' ? 'c' : format === 'es' ? 'm' : format === 'iife' ? 'min.' : ''
  return `index.${type}js`
}

module.exports = defineConfig({
  plugins: [
    {
      ...typescript({
        'declaration': true,
        'declarationDir': resolvePath('dist'),
        exclude: resolvePath('../node_modules/**'),
      }),
      apply: 'build',
    },
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ngSpring',
      formats: ['cjs', 'es', 'umd', 'iife'],
      fileName
    }
  }
})