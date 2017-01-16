import rollup from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';

export default {
  entry: 'tmp/main.js',
  dest: 'dist/build.js',
  sourceMap: true,
  format: 'iife',
  useStrict: false,
  treeshake: true,
  context: 'window',
  moduleName: 'tocu',
  plugins: [
    babel(
      {presets: 'es2015-rollup'}
    ),
    nodeResolve({ jsnext: true, module: true, browser: true, main:true, extensions:['.js'] }),
    commonjs({
      ignoreGlobal: false,
      include: [
        'node_modules/**',
      ]
    }),
    uglify()
  ]
}
