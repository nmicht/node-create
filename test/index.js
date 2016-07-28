import fs from 'fs'
import generator from '../src/generator'
import mkdirp from 'mkdirp-promise'
import path from 'path'
import read from 'fs-readfile-promise'
import rimraf from 'rimraf'
import tap from 'tap'

const target = path.join('test', 'tmp')
const options = {
  author: 'foo',
  description: 'foo bar',
  email: 'foo@bar.com',
  github: 'foo',
  website: 'http://foo.com/',
  install: false,
  quiet: true
}

tap.afterEach(done => rimraf(target, done))

tap.test('should populate template variables', assert => {
  assert.plan(4)

  return generator('foobar', target, options)
    .then(_ => read(path.join(target, 'package.json')))
    .then(JSON.parse)
    .then(pkg => {
      assert.equal(pkg.name, 'foobar')
      assert.equal(pkg.description, options.description)
      assert.equal(pkg.author, `${options.author} <${options.email}> (${options.website})`)
      assert.equal(pkg.homepage, `https://github.com/${options.github}/foobar`)
    })
})

tap.test('should use process.cwd', assert => {
  assert.plan(1)

  let cwd = process.cwd()

  return mkdirp('/tmp/foo')
    .then(_ => process.chdir('/tmp/foo'))
    .then(_ => generator('foo'))
    .then(files => {
      var file = path.dirname(files.pop())

      assert.equal('/tmp/foo/test', file)
    })

    .then(_ => process.chdir(cwd)) // return to cwd
})

tap.test('should return a list of files created', assert => {
  assert.plan(1)

  return generator('foo', target, options)
    .then(files => {
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

tap.test('should use environment variables', assert => {
  assert.plan(3)

  process.env.NPM_AUTHOR_EMAIL = 'foo@bar.com'
  process.env.NPM_AUTHOR_NAME = 'foo'
  process.env.NPM_AUTHOR_WEBSITE = 'http://foo.com/'
  process.env.NPM_GITHUB_USERNAME = 'foo'
  process.env.NPM_PACKAGE_NAME = 'foobar'

  return generator('foobar', target)
    .then(_ => read('test/tmp/package.json'))
    .then(JSON.parse)
    .then(pkg => {
      assert.equal(pkg.name, process.env.NPM_PACKAGE_NAME)
      assert.equal(pkg.author, `${process.env.NPM_AUTHOR_NAME} <${process.env.NPM_AUTHOR_EMAIL}> (${process.env.NPM_AUTHOR_WEBSITE})`)
      assert.equal(pkg.repository.url, `https://github.com/${process.env.NPM_GITHUB_USERNAME}/${process.env.NPM_PACKAGE_NAME}.git`)
    })
})

tap.test('should install dependencies', assert => {
  assert.plan(1)

  let opts = Object.assign(options, { install: true })
  let target = '/tmp/npm-package-genrator/test'

  return mkdirp(target)
    .then(dir => generator('foo', target, opts))
    .then(files => assert.ok(fs.existsSync(path.join(target, 'node_modules'))))
})
