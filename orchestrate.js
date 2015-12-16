var parse = require('./parse')
var Day7 = require('./day7')

function orchestrate(input) {
  var d7 = new Day7()
  var operations = {
    SIGNAL: function(x) { return x },
    AND: d7.and,
    OR: d7.or,
    LSHIFT: d7.lshift,
    RSHIFT: d7.rshift,
    NOT: d7.not
  }

  var lines = input
    .split('\n')
    .map(function(line) { return line.trim() })
    .filter(function(line) { return !!line })
    .map(parse)
    .forEach(function(result) {
      d7.signal(result.target, operations[result.op](result.a, result.b))
    })

  return d7.readAll()
}

module.exports = orchestrate

