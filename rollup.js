import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  plugins: [nodeResolve(), terser()],
  input: './index.js',
  output: {
    esModule: true,
    file: `./min.js`,
  }
};
