#!/usr/bin/env node
const template = require('./lib/template')
const yargs = require('yargs')

const builder = () => {
  yargs.positional('path', {
    describe: 'path to initialize project in',
    type: 'string',
    default: '.'
  })
}

yargs.command('$0 [path]', 'initiate a new project', builder, template)
  .argv
