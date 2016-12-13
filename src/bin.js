#!/usr/bin/env node

import dotenv from 'dotenv'
import generator from './generator'
import yargs from 'yargs'

// load configuration from environment
dotenv.config({ silent: true })

const handler = (options) => {
  return generator(options)
    .then((files) => console.info('done.'))
    .then((_) => process.exit(0))

    .catch((err) => console.error(err))
    .then((_) => process.exit(1))
}

const options = {
  author: {
    alias: 'a',
    type: 'text',
    demand: true,
    description: 'Author Name',
    default: process.env.NPM_AUTHOR_NAME
  },

  only: {
    type: 'text',
    demand: false,
    description: 'Limit template scope',
    default: 'all',
    choices: ['all', 'projectfiles']
  },

  description: {
    alias: 'd',
    type: 'text',
    demand: false,
    description: 'Package Description',
    default: process.env.NPM_PACKAGE_DESCRIPTION
  },

  email: {
    alias: 'e',
    type: 'text',
    demand: true,
    description: 'Author Email',
    default: process.env.NPM_AUTHOR_EMAIL
  },

  github: {
    alias: 'g',
    type: 'text',
    demand: true,
    description: 'Github Username',
    default: process.env.NPM_GITHUB_USERNAME
  },

  website: {
    alias: 'w',
    type: 'text',
    demand: true,
    description: 'Author Website',
    default: process.env.NPM_AUTHOR_WEBSITE
  },

  install: {
    alias: 'i',
    type: 'text',
    demand: true,
    default: false,
    description: 'Install Dependencies?'
  }
}

let argv = yargs
  .command('new <name> [path] [options]', 'create new package', options, handler)
  .help()
  .argv

if (argv._.length < 1) yargs.showHelp()
