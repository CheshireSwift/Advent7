var parse = require('../parse')

describe('the parser', function() {
  it('returns a target', function() {
    expect(parse('1234 -> a').target).toBe('a')
  })

  it('detects raw signals', function() {
    expect(parse('1234 -> a').signal).toBe(1234)
  })

  var opExamples = [
    {
      op: 'AND',
      line: '123 AND 456 -> a',
      output: {a: 123, b: 456, op: 'AND'}
    },
    {
      op: 'OR',
      line: '123 OR 456 -> a',
      output: {a: 123, b: 456, op: 'OR'}
    }
    // LSHIFT
    // RSHIFT
    // NOT
    // raw/wire combos?
  ]

  opExamples.forEach(function(params) {
    it('parses ' + params.op + ' signals', function() {
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

