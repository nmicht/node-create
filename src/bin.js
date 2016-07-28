#!/usr/bin/env node

import cmd from 'commander'
import generator from './generator'
import pkg from '../package'

let packageName, packagePath

cmd
  .version(pkg.version)
  .arguments('<name> <path>')
  .action((name, path) => {
    packageName = name
    packagePath = path
  })
  .option('-a, --author <name>', 'Author Name')
  .option('-d, --description <description>', 'description')
  .option('-e, --email <email>', 'Author Email')
  .option('-g, --github <username>', 'Github Username')
  .option('-w, --website <url>', 'Author Website')
  .option('-i, --no-install', "don't install dependencies")
  .parse(process.argv)

if (!packageName || !packagePath) {
  cmd.help()
}

generator(packageName, packagePath, cmd)
  .then(files => console.info('done.'))
  .then(_ => process.exit(0))
  .catch(err => console.error(err))
  .then(_ => process.exit(1))
