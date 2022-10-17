import typescript from '@rollup/plugin-typescript';
const html = require('@rollup/plugin-html');
import copy from 'rollup-plugin-copy'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es'
  },
  plugins: [typescript({ tsconfig: "./tsconfig.json" }), html({ title: "Zybex - projekt końcowy", attributes: { script: { defer: true } } }), copy({ targets: [{ src: "assets", dest: "dist" }] })]
};