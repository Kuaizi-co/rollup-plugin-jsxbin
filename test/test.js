const rollup = require('rollup');
const jsxbin = require('..');

process.chdir(__dirname);

const testFunc = function(entry, expectedValue) {
  return function() {
    expect.assertions(1);
    return rollup.rollup({
      input: `./fixtures/${entry}.js`,
      plugins: [
        jsxbin()
      ]
    }).then(function(bundle) {
      return bundle.generate({ format: 'cjs' }).then(function(res) {
        expectedValue(res.code).toContain(expectedValue)
      })
    })
  }
}

describe('rollup-plugin-jsxbin', function() {
  it('jsxbin the code', testFunc('test', '$.writeln("jsxbin");'))
})
