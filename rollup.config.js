import typescript from 'rollup-plugin-typescript'
const pkg = require('./package.json')

export default ['cjs', 'es'].map(format => ({
  input: './src/index.ts',
  output: {
    file: format === 'cjs' ? pkg.main : pkg.module,
    format
  },
  plugins: [
    typescript({lib: ["es5", "es6"], target: "es5"})
  ]
}))