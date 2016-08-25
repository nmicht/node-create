import dotenv from 'dotenv'
import glob from 'glob-promise'
import mkdirp from 'mkdirp-promise'
import path from 'path'
import read from 'read-files-promise'
import template from 'lodash.template'
import url from 'url'
import write from 'fs-writefile-promise'
import { execFileSync } from 'child_process'

// load configuration from environment
dotenv.config({ silent: true })

const paths = {
  template: path.join(__dirname, '..', 'template'),
  root: path.join(__dirname, '..')
}

const defaults = {
  author: process.env.NPM_AUTHOR_NAME,
  description: process.env.NPM_PACKAGE_DESCRIPTION,
  email: process.env.NPM_AUTHOR_EMAIL,
  github: process.env.NPM_GITHUB_USERNAME,
  website: process.env.NPM_AUTHOR_WEBSITE,
  install: true,
  year: new Date().getFullYear()
}

export default function (packageName = process.env.NPM_PACKAGE_NAME, cwd = process.cwd(), options = {}) {
  // exit early
  if (!packageName) {
    throw new Error('missing package name')
  }

  let templates = []
  let opts = Object.assign(defaults, options)

  // assign name
  opts.name = packageName

  // parse domain
  opts.domain = opts.website ? url.parse(opts.website).hostname : ''

  // use name if no description given
  opts.description = opts.description || packageName

  // create target directory
  return mkdirp(path.join(cwd, 'test', 'fixtures'))
    // get all template files
    .then(_ => {
      return glob('template/**/*', {
        cwd: paths.root,
        dot: true,
        nodir: true,
        realpath: true
      })
    })

    // assign to external object for later access
    .then(_templates => {
      templates = _templates
      return templates
    })

    // read the template contents
    .then(read)

    // process tempaltes
    .then(buffers => {
      return buffers.reduce((files, buffer, index, buffers) => {
        // re-construct name
        let name = path.relative(paths.template, templates[index])

        // construct new mapping object
        files[name] = template(buffer)(opts)

        return files
      }, {})
    })

    .then(files => {
      return Promise.all(
        Object
          .keys(files)

          .map(name => {
            let filename = path.join(cwd, name)
            let dir = path.dirname(filename)

            return mkdirp(dir).then(_ => write(filename, files[name]))
          })
      )
    })

    .then((files) => {
      if (opts.install) {
        execFileSync('npm', ['update', '--save'], { cwd, stdio: ['inherit', 'inherit', 'inherit'] })
      }

      return files
    })

    .then((files) => {
      if (opts.install) {
        execFileSync('npm', ['update', '--save-dev'], { cwd, stdio: ['inherit', 'inherit', 'inherit'] })
      }

      return files
    })

    .then((files) => {
      console.log('do not forget to run "semantic-release-cli setup"')

      return files.sort()
    })
}
