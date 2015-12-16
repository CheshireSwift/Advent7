function parse(line) {
  var results = /^(.+) -> (\w+)$/.exec(line)
  if (!results) {
    throw new ParseError('Line does not contain a valid output target.', line)
  }

  var command = results[1]
  var retval = {
    target: results[2]
  }

  var commandResults
  if (commandResults = /^\d+$/.exec(command)) {
    retval.signal = +commandResults[0]
  } else if (commandResults = /^(\d+) (AND|OR) (\d+)$/.exec(command)) {
    retval.a = +commandResults[1]
    retval.op = commandResults[2]
    retval.b = +commandResults[3]
  } else {
    throw new ParseError('Line contained invalid input signal.', line)
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

