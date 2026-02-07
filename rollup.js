import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  plugins: [nodeResolve()].concat(process.env.NO_MIN ? [] : [terser()]),
  input: './auto.js',
  output: {
    esModule: true,
    dir: './dist'
  }
};
