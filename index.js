#!/usr/bin/env node

var program = require('commander')
var fs = require('fs')
var orchestrate = require('./orchestrate')

program
  .version('0.0.0')
  .arguments('<file>')
  .action(function(file) {
    fs.readFile(file, 'utf8', function(err, data) {
      if (err) throw err
      orchestrate(data).then(console.log)
    })
  })
  .parse(process.argv)
