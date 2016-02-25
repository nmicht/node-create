#!/usr/bin/env node

import cmd from 'commander'
import debugLog from 'debug-log'
import pkg from '../package'
import ${name} from './index'

const debug = debugLog('${name}')

cmd
  .version(pkg.version)
  .arguments('<name> <path>')
  .action((name, path) => {})
  .parse(process.argv)

if (!cmd.args.length) {
  cmd.help()

  process.exit(1)
}
