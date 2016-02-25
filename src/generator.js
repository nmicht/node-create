import debuglog from 'debug-log'
import dotenv from 'dotenv'
import glob from 'glob-promise'
import mkdirp from 'mkdirp-promise'
import path from 'path'
import read from 'read-files-promise'
import template from 'lodash.template'
import write from 'fs-writefile-promise'
import { execFileSync } from 'child_process'

// load configuration from environment
dotenv.config({ silent: true })

const debug = debuglog('npm-package-generator')

const paths = {
  template: path.join(__dirname, '..', 'template'),
  cwd: path.join(__dirname, '..')
}

const defaults = {
  author: process.env.NPM_AUTHOR_NAME,
  description: process.env.NPM_PACKAGE_DESCRIPTION,
  email: process.env.NPM_AUTHOR_EMAIL,
  github: process.env.NPM_GITHUB_USERNAME,
  website: process.env.NPM_AUTHOR_WEBSITE,
  semantic: false,
  install: false,
  year: new Date().getFullYear()
}

module.exports = function (packageName = process.env.NPM_PACKAGE_NAME, packagePath = process.cwd(), options = {}) {
  // exit early
  if (!packageName) {
    throw new Error('missing package name')
  }

  let templates = []
  let opts = Object.assign(defaults, options)

  // assign name
  opts.name = packageName

  // use name if no description given
  opts.description = opts.description || packageName

  debug('options: %j', opts)

  return mkdirp(path.join(packagePath, 'test', 'fixtures'))
    .then(() => {
      return glob('template/**/*', {
        cwd: paths.cwd,
        dot: true,
        nodir: true,
        realpath: true
      })
    })

    .then((_templates) => {
      templates = _templates

      return templates
    })

    .then(read)

    // process tempaltes
    .then((buffers) => {
      return buffers.reduce((files, buffer, index, buffers) => {
        // re-construct name
        let name = path.relative(paths.template, templates[index])

        // construct new mapping object
        files[name] = template(buffer)(opts)

        return files
      }, {})
    })

    .then((files) => {
      let promises = []

      Object.keys(files).forEach((name) => {
        let filename = path.join(packagePath, name)
        let dir = path.dirname(filename)

        debug('writing to %s', filename)

        let promise = mkdirp(dir).then(() => write(filename, files[name]))

        promises.push(promise)
      })

      return Promise.all(promises)
    })

    .then((files) => {
      if (opts.install) {
        execFileSync('npm', ['update', '--silent', '--save'], {
          cwd: packagePath
        })
      }

      return files
    })

    .then((files) => {
      if (opts.install) {
        execFileSync('npm', ['update', '--silent', '--save-dev'], {
          cwd: packagePath
        })
      }

      return files
    })

    .then((files) => {
      if (opts.semantic) {
        execFileSync('semantic-release-cli', ['setup'], {
          cwd: packagePath
        })
      }

      return files.sort()
    })
}
