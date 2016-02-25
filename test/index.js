import fs from 'fs'
import generator from '../src/generator'
import mkdirp from 'mkdirp-promise'
import path from 'path'
import read from 'fs-readfile-promise'
import rimraf from 'rimraf'
import tap from 'tap'

// const cwd = process.cwd()
const target = path.join('test', 'tmp')
const options = {
  author: 'foo',
  description: 'foo bar',
  email: 'foo@bar.com',
  github: 'foo',
  website: 'foo.com',
  semantic: false
}

tap.test('npm-package-generator', (t) => {
  t.afterEach((done) => rimraf(target, done))

  t.test('should populate template variables', (assert) => {
    return generator('foobar', target, options)
      .then(() => read('test/tmp/package.json'))
      .then(JSON.parse)
      .then((pkg) => {
        assert.equal(pkg.name, 'foobar')
        assert.equal(pkg.description, options.description)
        assert.equal(pkg.author, `${options.author} <${options.email}> (${options.website})`)
        assert.equal(pkg.homepage, `https://github.com/${options.github}/foobar`)
      })
      .catch(assert.threw)
  })

  t.test('should use process.cwd', (assert) => {
    let cwd = process.cwd()

    return mkdirp(target)
      .then(() => process.chdir(target))
      .then(() => generator('foo'))
      .then((files) => {
        var file = path.dirname(files.pop())

        assert.equal(path.relative(path.resolve(target), file), '..')
      })

      .then(() => process.chdir(cwd)) // return to cwd
      .catch(assert.threw)
  })

  t.test('should return a list of files created', (assert) => {
    return generator('foo', target, options)
      .then((files) => {
        assert.same(files, [
          'test/tmp/.editorconfig',
          'test/tmp/.gitignore',
          'test/tmp/.travis.yml',
          'test/tmp/LICENSE',
          'test/tmp/README.md',
          'test/tmp/package.json',
          'test/tmp/src/bin.js',
          'test/tmp/src/index.js',
          'test/tmp/test/index.js'
        ])
      })
      .catch(assert.threw)
  })

  t.test('should use environment variables', (assert) => {
    process.env.NPM_AUTHOR_EMAIL = 'foo@bar.com'
    process.env.NPM_AUTHOR_NAME = 'foo'
    process.env.NPM_AUTHOR_WEBSITE = 'foo.com'
    process.env.NPM_GITHUB_USERNAME = 'foo'
    process.env.NPM_PACKAGE_NAME = 'foobar'

    return generator('foobar', target)
      .then(() => read('test/tmp/package.json'))
      .then(JSON.parse)
      .then((pkg) => {
        assert.equal(pkg.name, process.env.NPM_PACKAGE_NAME)
        assert.equal(pkg.author, `${process.env.NPM_AUTHOR_NAME} <${process.env.NPM_AUTHOR_EMAIL}> (${process.env.NPM_AUTHOR_WEBSITE})`)
        assert.equal(pkg.repository.url, `https://github.com/${process.env.NPM_GITHUB_USERNAME}/${process.env.NPM_PACKAGE_NAME}.git`)
      })
      .catch(assert.threw)
  })

  t.test('should install dependencies', (assert) => {
    let opts = {
      install: true,
      quiet: true
    }

    return generator('foo', target, opts)
      .then((files) => assert.ok(fs.existsSync(path.join(target, 'node_modules'))))
      .catch(assert.threw)
  })

  .then(t.end)
})
