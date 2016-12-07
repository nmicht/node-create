import glob from 'glob-promise'
import mkdirp from 'mkdirp-promise'
import path from 'path'
import read from 'read-files-promise'
import template from 'lodash.template'
import url from 'url'
import write from 'fs-writefile-promise'
import { spawn } from 'child_process'

function exec (command, args = [], options = {}) {
  if (!command) throw new Error('command requried')

  return new Promise((resolve, reject) => {
    let cmd = spawn(command, args, Object.assign(options, { stdio: 'inherit' }))

    cmd.on('close', (code) => code === 1 ? reject() : resolve())
  })
}

const paths = {
  template: path.join(__dirname, '..', 'template'),
  root: path.join(__dirname, '..')
}

const year = new Date().getFullYear()

export default function (options) {
  // exit early
  if (!options.name) {
    throw new Error('missing package name')
  }

  let templates = []

  // default value for path
  options.path = options.path || process.cwd()

  // parse domain
  options.domain = options.website ? url.parse(options.website).hostname : ''

  // use name if no description given
  options.description = options.description || options.name

  // create target directory
  return mkdirp(path.join(options.path, 'test', 'fixtures'))
    // get all template files
    .then((_) => {
      return glob('template/**/*', {
        cwd: paths.root,
        dot: true,
        nodir: true,
        realpath: true
      })
    })

    // assign to external object for later access
    .then((_templates) => {
      templates = _templates
      return templates
    })

    // read the template contents
    .then(read)

    // process tempaltes
    .then((buffers) => {
      return buffers.reduce((files, buffer, index, buffers) => {
        // re-construct name
        let name = path.relative(paths.template, templates[index])

        // construct new mapping object
        files[name] = template(buffer)(Object.assign({ year }, options))

        return files
      }, {})
    })

    .then((files) => {
      return Promise.all(
        Object
          .keys(files)

          .map((name) => {
            let filename = path.join(options.path, name)
            let dir = path.dirname(filename)

            return mkdirp(dir).then((_) => write(filename, files[name]))
          })
      )
    })

    .then((files) => {
      if (!options.install) {
        return files
      }

      return exec('npm', ['update', '--save'], { cwd: options.path }).then(() => files)
    })

    .then((files) => {
      if (!options.install) {
        return files
      }

      return exec('npm', ['update', '--save-dev'], { cwd: options.path }).then(() => files)
    })

    .then((files) => {
      console.log('do not forget to run "semantic-release-cli setup"')

      return files.sort()
    })
}
