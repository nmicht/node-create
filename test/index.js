import fs from 'fs'
import generator from '../src/generator'
import mkdirp from 'mkdirp-promise'
import path from 'path'
import read from 'fs-readfile-promise'
import rimraf from 'rimraf'
import tap from 'tap'

const options = {
  name: 'foobar',
  author: 'foo',
  path: path.join('test', 'tmp'),
  description: 'foo bar',
  email: 'foo@bar.com',
  github: 'foo',
  website: 'http://foo.com/',
  install: false,
  quiet: true
}

tap.afterEach((done) => rimraf(options.path, done))

tap.test('should populate template variables', (assert) => {
  assert.plan(4)

  return generator(options)
    .then(() => read(path.join(options.path, 'package.json')))
    .then(JSON.parse)
    .then((pkg) => {
      assert.equal(pkg.name, 'foobar')
      assert.equal(pkg.description, options.description)
      assert.equal(pkg.author, `${options.author} <${options.email}> (${options.website})`)
      assert.equal(pkg.homepage, `https://github.com/${options.github}/foobar`)
    })
})

tap.test('should use process.cwd', (assert) => {
  assert.plan(1)

  let cwd = process.cwd()

  let opts = Object.assign({}, options)

  delete opts.path

  return mkdirp('/tmp/foo')
    .then(() => process.chdir('/tmp/foo'))
    .then(() => generator(opts))
    .then((files) => {
      var file = path.dirname(files.pop())

      assert.equal('/tmp/foo/test', file)
    })

    .then(() => process.chdir(cwd)) // return to cwd
})

tap.test('should return a list of files created', (assert) => {
  assert.plan(1)

  return generator(options)
    .then((files) => {
      assert.same(files, [
        'test/tmp/.babelrc',
        'test/tmp/.codeclimate.yml',
        'test/tmp/.editorconfig',
        'test/tmp/.gitignore',
        'test/tmp/.travis.yml',
        'test/tmp/LICENSE',
        'test/tmp/README.md',
        'test/tmp/package.json',
        'test/tmp/src/index.js',
        'test/tmp/test/index.js'
      ])
    })
})

tap.test('should install dependencies', { timeout: 10000 }, (assert) => {
  assert.plan(1)

  let opts = Object.assign({}, options)

  Object.assign(opts, { path: '/tmp/npm-package-genrator/test', install: true })

  return mkdirp(opts.path)
    .then((dir) => generator(opts))
    .then((files) => fs.stat(path.join(opts.path, 'node_modules'), (err, stats) => assert.error(err)))
})
