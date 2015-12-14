var Day7 = require('../Day7')

describe('the day 7 machine', function() {
  var d7

  beforeEach(function() {
    d7 = new Day7()
  })

  it('provides signals to wires', function(done) {
    d7.signal('a', 13)
    d7.read('a')
      .then(function(a) {
        expect(a).toBe(13)
      })
      .then(done, done)
  })

  it('can AND wires', function(done) {
    d7.signal('a', d7.and('x', 'y'))
    d7.signal('x', 123)
    d7.signal('y', 456)
    d7.read('a')
      .then(function(a) {
        expect(a).toBe(123 & 456)
      })
      .then(done, done)
  })

  it('can OR wires', function(done) {
    d7.signal('a', d7.or('x', 'y'))
    d7.signal('x', 123)
    d7.signal('y', 456)
    d7.read('a')
      .then(function(a) {
        expect(a).toBe(123 | 456)
      })
      .then(done, done)
  })

  it('can LSHIFT wires', function(done) {
    d7.signal('a', d7.lshift('x', 2))
    d7.signal('x', 123)
    d7.read('a')
      .then(function(a) {
        expect(a).toBe(123 << 2)
      })
      .then(done, done)
  })

  it('can RSHIFT wires', function(done) {
    d7.signal('a', d7.rshift('x', 2))
    d7.signal('x', 123)
    d7.read('a')
      .then(function(a) {
        expect(a).toBe(123 >> 2)
      })
      .then(done, done)
  })

  it('can negate wires with NOT', function(done) {
    d7.signal('a', d7.not('x'))
    d7.signal('x', 123)
    d7.read('a')
      .then(function(a) {
        expect(a).toBe(65412)
      })
      .then(done, done)
  })

  it('behaves in accordance with the example provided on http://adventofcode.com/day/7', function(done) {
    d7.signal('x', 123)
    d7.signal('y', 456)
    d7.signal('d', d7.and('x', 'y'))
    d7.signal('e', d7.or('x', 'y'))
    d7.signal('f', d7.lshift('x', 2))
    d7.signal('g', d7.rshift('y', 2))
    d7.signal('h', d7.not('x'))
    d7.signal('i', d7.not('y'))

    Promise.all([
      d7.read('d').then(function(value) { expect(value).toBe(72) }),
      d7.read('e').then(function(value) { expect(value).toBe(507) }),
      d7.read('f').then(function(value) { expect(value).toBe(492) }),
      d7.read('g').then(function(value) { expect(value).toBe(114) }),
      d7.read('h').then(function(value) { expect(value).toBe(65412) }),
      d7.read('i').then(function(value) { expect(value).toBe(65079) }),
      d7.read('x').then(function(value) { expect(value).toBe(123) }),
      d7.read('y').then(function(value) { expect(value).toBe(456) })
    ])
      .then(done, done)
  })
})

