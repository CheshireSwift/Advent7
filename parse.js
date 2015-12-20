function parse(line) {
  var results = /^(.+) -> (\w+)$/.exec(line)
  if (!results) {
    throw new ParseError('Line does not contain a valid output target', line)
  }

  var retval = {
    target: results[2]
  }

  var command = results[1]
  var commandResults
  if (commandResults = /^\d+$/.exec(command)) {
    retval.op = 'SIGNAL'
    retval.a = +commandResults[0]
  } else if (commandResults = /^NOT (\S+)$/.exec(command)) {
    retval.op = 'NOT'
    retval.a = +commandResults[1] || commandResults[1]
  } else if (commandResults = /^(\S+) (AND|OR|LSHIFT|RSHIFT) (\S+)$/.exec(command)) {
    retval.a = +commandResults[1] || commandResults[1]
    retval.op = commandResults[2]
    retval.b = +commandResults[3] || commandResults[3]
  } else {
    throw new ParseError(`Line contained invalid input signal "${command}" in "${line}"`, line)
  }

  return retval
}

function ParseError(message, line) {
  var err = new Error(message)
  Object.setPrototypeOf(err, ParseError.prototype)
  err.line = line
  return err
}

ParseError.prototype = Object.create(
  Error.prototype,
  {name: {value: 'ParseError', enumerable: false}}
)

parse.ParseError = ParseError
module.exports = parse

