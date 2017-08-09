#! /usr/bin/env node

const commands = require('../lib/commands')
const cd = require('../lib/cd')
const [ command, ...args ] = process.argv.slice(2)

if (commands[command]) {
  commands[command](args)
} else {
  cd.default(command)
}
