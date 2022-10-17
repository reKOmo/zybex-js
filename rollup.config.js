import typescript from '@rollup/plugin-typescript';
const html = require('@rollup/plugin-html');

export default {
  input: 'src/index.ts',
  output: {
    dir: 'build',
    format: 'es'
  },
  plugins: [typescript({ tsconfig: "./tsconfig.json" }), html({ title: "Zybex - projekt końcowy", attributes: { script: { defer: true } } })]
};