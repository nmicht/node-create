import glob from 'glob-promise'
import path from 'path'
import read from 'read-files-promise'
import spawn from '@ahmadnassri/spawn-promise'
import template from 'lodash.template'
import url from 'url'
import write from 'fs-writefile-promise'

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
  return spawn('mkdir', [ '-p', path.join(options.path, 'test', 'fixtures') ])
    // get all template files
    .then(_ => {
      let ignore = []

      if (options.only === 'projectfiles') {
        ignore.push('template/src/**', 'template/test/**')
      }

      return glob('template/**/*', {
        cwd: paths.root,
        dot: true,
        nodir: true,
        realpath: true,
        ignore
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

            return spawn('mkdir', [ '-p', dir ]).then(_ => write(filename, files[name]))
          })
      )
    })

    .then((files) => {
      if (!options.install) {
        return files
      }

      return spawn('npm', ['update', '--save'], { cwd: options.path }).then(() => files)
    })

    .then((files) => {
      if (!options.install) {
        return files
      }

      return spawn('npm', ['update', '--save-dev'], { cwd: options.path }).then(() => files)
    })

    .then((files) => files.sort())
}
