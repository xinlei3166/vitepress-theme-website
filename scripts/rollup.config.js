import path from 'path'
import buble from '@rollup/plugin-buble'
import commonjs from '@rollup/plugin-commonjs'
import node from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import replace from '@rollup/plugin-replace'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import pkg from '../package.json'

const moduleName = pkg.name
const version = process.env.VERSION || pkg.version
const resolve = dir => path.resolve(__dirname, '../', dir)

const banner =
  '/**\n' +
  ` * ${moduleName} v${version}\n` +
  ` * (c) 2021-${new Date().getFullYear()} ${pkg.author}\n` +
  ' * Released under the ISC License.\n' +
  ' */'

function genConfig(input, name) {
  return {
    input: resolve(input),
    external: [...Object.keys(pkg.dependencies)],
    plugins: [
      typescript({
        exclude: 'node_modules/**',
        typescript: require('typescript'),
        tsconfigOverride: {
          compilerOptions: {
            module: 'esnext',
            target: 'es5'
          }
        }
      }),
      node(),
      commonjs(),
      json(),
      babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
      terser(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      buble({
        objectAssign: 'Object.assign',
        transforms: {
          arrow: true,
          dangerousForOf: true,
          asyncAwait: false,
          generator: false
        }
      })
    ],
    output: {
      dir: resolve('dist'),
      entryFileNames: '[name].min.js',
      format: 'umd',
      exports: 'auto',
      banner,
      name: name || moduleName
    },
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    }
  }
}

export default genConfig('src/index.ts')
