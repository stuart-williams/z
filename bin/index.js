#! /usr/bin/env node

const commands = require('../lib/commands')
const cd = require('../lib/cd')
const [ command, ...args ] = process.argv.slice(2)

if (commands[command]) return commands[command](args)
if (command) return cd.default(command)

console.log(`
  Usage:
    z add                 Add the current working directory
    z add [<alias>]       Add the current working directory with alias
    z rm                  Remove the current working directory
    z rm [<alias>]        Remove an entry
    z ls                  List entries
    z prune               Remove entries referencing dead directories
`)
