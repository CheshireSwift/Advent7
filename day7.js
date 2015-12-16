function Day7() {
  var wires = {}

  function getWire(label) {
    if (!wires[label]) {
      wires[label] = Promise.defer()
    }
    return wires[label]
  }

  this.signal = function(label, value) {
    getWire(label).resolve(value)
  }

  this.read = read = function(label) {
    return getWire(label).promise;
  }

  function readLabelled(label) {
    return read(label).then(function(value) {
      return { [label]: value }
    })
  }

  this.readAll = function() {
    return Promise.all(Object.keys(wires).map(readLabelled))
      .then(function(labelledOutputs) {
        return Object.assign.apply(null, [{}].concat(labelledOutputs))
      })
  }

  function op(handler) {
    return function(a, b) {
      return Promise.all([
        typeof a === 'number' ? a : read(a),
        typeof b === 'number' ? b : read(b)
      ]).then(function(values) {
        return handler(values[0], values[1])
      })
    }
  }

  this.and = op(function(value1, value2) {
    return value1 & value2
  })

  this.or = op(function(value1, value2) {
    return value1 | value2
  })

  this.lshift = op(function(value, distance) {
    return value << distance
  })

  this.rshift = op(function(value, distance) {
    return value >> distance
  })

  this.not = function(label) {
    return read(label).then(function(value) {
      return 65536 + ~value
    })
  }
}

module.exports = Day7
