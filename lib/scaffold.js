const { green } = require('chalk')
const { join, dirname, resolve } = require('path')
const { promisify } = require('util')
const { readFile, writeFile } = require('fs')
const glob = require('fast-glob')
const mkdirp = require('mkdirp')
const spdx = require('spdx-license-list/full')

const questions = require('./questions')

// promise helpers
const read = promisify(readFile)
const write = promisify(writeFile)

// path to template directory
const template = join(__dirname, '..', 'template')

// main
module.exports = async function main (argv) {
  const destination = resolve(argv.path)

  // create root folder
  await mkdirp(destination)

  let pkg = {}

  try {
    pkg = require(join(destination, 'package.json')) // eslint-disable-line import/no-dynamic-require
  } catch (e) {} // eslint-disable-line no-empty

  // collect info about the project
  const answers = await questions(pkg, destination)

  // get license text
  let license = answers.oss ? spdx[answers.license].licenseText : '(c) Copyright <year> <copyright holder>. all rights reserved'

  // update author info
  license = license
    .replace(/< ?year ?>/i, new Date().getFullYear())
    .replace(/<copyright holders?>/i, `${answers.author} <${answers.email}>`)

  // update answers object
  answers.private = !answers.oss
  answers.access = answers.oss ? 'public' : 'restricted'
  answers.keywords = JSON.stringify(answers.topics)

  // write license file
  await write(join(destination, 'LICENSE'), `${license}\n`)

  // get all template files
  const stream = glob.stream('**/*', { cwd: template, dot: true })

  stream.on('data', async file => {
    const dir = dirname(file)

    // create directory if none-exists
    if (dir !== '.') await mkdirp(join(destination, dir))

    // read file content
    let content = await read(join(template, file), 'utf8')

    // replace each template key
    Object.entries(answers).forEach(([key, value]) => {
      content = content.replace(new RegExp(`\\[${key}\\]`, 'g'), value)
    })

    // write file to destination
    await write(join(destination, file), content)

    // yellow('skipped existing file')

    // console message
    console.log(`${green('created file')}: ${join(destination, file)}`)
  })
}
