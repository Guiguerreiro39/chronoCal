import preserveDirectives from 'rollup-plugin-preserve-directives'
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

import dts from 'rollup-plugin-dts'
import postcss from 'rollup-plugin-postcss'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { typescriptPaths } from 'rollup-plugin-typescript-paths'
import alias from '@rollup/plugin-alias'
import externals from 'rollup-plugin-node-externals'

import terser from '@rollup/plugin-terser'

const outputOptions = {
  sourcemap: true,
  preserveModules: true,
  preserveModulesRoot: 'src',
}

const config = [
  {
    preserveSymlinks: true,
    onwarn(message) {
      if (/Module level directives cause errors when bundled, "use client"/.test(message)) return
      console.error(message)
    },
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        entryFileNames: '[name].cjs',
        exports: 'named',
        ...outputOptions,
      },
      {
        dir: 'dist',
        format: 'esm',
        ...outputOptions,
      },
    ],
    plugins: [
      alias({
        entries: [{ find: 'cva', replacement: 'class-variance-authority' }],
      }),
      peerDepsExternal(),
      externals(),
      postcss({
        config: {
          path: './postcss.config.js',
        },
        extensions: ['.css'],
        minimize: true,
        inject: {
          insertAt: 'top',
        },
      }),
      resolve(),
      commonjs({
        strictRequires: true,
        // https://github.com/pnpm/pnpm/issues/2165#issuecomment-555752571
        preserveSymlinks: true,
      }),
      preserveDirectives(),
      terser({
        compress: {
          directives: false,
        },
      }),
      typescript(),
      typescriptPaths(),
    ],
  },
  {
    input: 'dist/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
]

export default config
