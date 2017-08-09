#! /usr/bin/env node

const commands = require('../lib/commands')
const [ command, ...args ] = process.argv.slice(2)

commands[command](args)
