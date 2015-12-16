var parse = require('../parse')

describe('the parser', function() {
  it('returns a target', function() {
    expect(parse('1234 -> a').target).toBe('a')
  })

  it('detects raw signals', function() {
    expect(parse('1234 -> a')).toEqual(jasmine.objectContaining({a: 1234, op: 'SIGNAL'}))
  })

  var as = [123, 'x']
  var bs = [456, 'y']
  var ops = ['AND', 'OR', 'LSHIFT', 'RSHIFT']
  var opExamples = ops.map(function(op) {
    return as.map(function(a) {
      return bs.map(function(b) {
        return {
          line: `${a} ${op} ${b} -> a`,
          output: {a, b, op}
        }
      })
    }).reduce(function(a, b) { return a.concat(b) })
  }).reduce(function(a, b) { return a.concat(b) })
    .concat(
      { line: 'NOT x -> a',   output: {a: 'x', op: 'NOT'} },
      { line: 'NOT 123 -> a', output: {a: 123, op: 'NOT'} }
    )

  opExamples.forEach(function(params) {
    it('parses ' + params.line, function() {
      expect(parse(params.line)).toEqual(jasmine.objectContaining(params.output))
    })
  })

  function assertLineNotValid(line, matcher) {
    expect(function() { parse(line) }).toThrowError(parse.ParseError, matcher)
  }
  function assertLineDoesNotHaveValidTarget(line) {
    assertLineNotValid(line, /valid output target/)
  }

  it('throws on lines that do not signal', function() {
    assertLineDoesNotHaveValidTarget('does not include arrow')
  })

  it('throws on invalid targets', function() {
    assertLineDoesNotHaveValidTarget('stuff -> an invalid target')
  })

  it('throws on invalid input signals', function() {
    assertLineNotValid('not a valid op or anything -> a', /invalid input/)
  })
})

