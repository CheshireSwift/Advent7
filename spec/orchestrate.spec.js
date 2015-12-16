var orchestrate = require('../orchestrate')

describe('the orchestrated system', function() {
  it('gives the expected output for the example at http://adventofcode.com/day/7', function(done) {
    var input = `
      123 -> x
      456 -> y
      x AND y -> d
      x OR y -> e
      x LSHIFT 2 -> f
      y RSHIFT 2 -> g
      NOT x -> h
      NOT y -> i
    `
    var expectedOutput = {
      d: 72,
      e: 507,
      f: 492,
      g: 114,
      h: 65412,
      i: 65079,
      x: 123,
      y: 456
    }

    orchestrate(input)
      .then(function(actualOutput) { expect(actualOutput).toEqual(expectedOutput) })
      .then(done, done)
  })
})

