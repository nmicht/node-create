#!/usr/bin/env node

const scaffold = require('./lib/scaffold')
const yargs = require('yargs')

const builder = () => {
  yargs.positional('path', {
    describe: 'path to initialize project in',
    type: 'string',
    default: '.'
  })
}

/* eslint-disable no-unused-expressions */
yargs
  .command('$0 [path]', 'initiate a new project', builder, scaffold)
  .argv
