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

  this.read = function(label) {
    return getWire(label).promise;
  }

  function op(handler) {
    return function(label1, label2) {
      return Promise.all([
        this.read(label1),
        this.read(label2)
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

  function partialOp(handler) {
    return function(label, fixed) {
      return this.read(label)
        .then(function(value) {
          return handler(value, fixed)
        })
    }
  }

  this.lshift = partialOp(function(value, distance) {
    return value << distance
  })

  this.rshift = partialOp(function(value, distance) {
    return value >> distance
  })

  this.not = function(label) {
    return this.read(label)
      .then(function(value) {
        return 65536 + ~value
      })
  }
}

module.exports = Day7
