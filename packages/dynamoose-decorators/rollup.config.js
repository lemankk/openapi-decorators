import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import filesize from 'rollup-plugin-filesize';

const packageJson = require('./package.json');
const isDev = process.env.build === 'dev';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: './dist/cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        dir: './dist/esm',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        useTsconfigDeclarationDir: true,
      }),
      filesize(),
    ],
  },
];
