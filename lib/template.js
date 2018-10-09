const { join, dirname } = require('path')
const { promisify } = require('util')
const { readFile, writeFile } = require('fs')
const glob = require('fast-glob')
const inquirer = require('inquirer')
const mkdirp = require('mkdirp')
const spdx = require('spdx-license-list/full')

const questions = require('./questions')

const read = promisify(readFile)
const write = promisify(writeFile)

const templates = join(__dirname, '..', 'template')

module.exports = async function main (argv) {
  // create root folder
  await mkdirp(argv.path)

  // collect info about the project
  const project = await inquirer.prompt(questions.project(spdx))

  // collect info about the author
  const author = await inquirer.prompt(questions.author)

  // collect info about the repo
  const repo = await inquirer.prompt(questions.repository(project))

  // collect info about the package
  const pkg = await inquirer.prompt(questions.package(project))

  // get license body
  let license = project.license === 'UNLICENSED' ? '(c) Copyright <year> <copyright holder>, all rights reserved' : spdx[project.license].licenseText

  // update author info
  license = license.replace(/< ?year ?>/i, new Date().getFullYear())
  license = license.replace(/<copyright holders?>/i, `${author.name} <${author.email}>`)

  // write license file
  await write(join(argv.path, 'LICENSE'), license)

  // get all template files
  const stream = glob.stream(['**/*'], { cwd: templates, dot: true })

  stream.on('data', async file => {
    const dir = dirname(file)
    if (dir !== '.') await mkdirp(join(argv.path, dir))

    let content = await read(join(templates, file))

    content = content.toString()
    content = content.replace(/\[license\.name\]/g, spdx[project.license].name)
    content = content.replace(/\[license\.url\]/g, spdx[project.license].url)
    content = content.replace(/\[project\.name\]/g, project.name)
    content = content.replace(/\[project\.description\]/g, project.description)
    content = content.replace(/\[project\.license\]/g, project.license)
    content = content.replace(/\[project\.website\]/g, project.website)
    content = content.replace(/\[project\.topics\]/g, project.keywords)
    content = content.replace(/\[project\.keywords\]/g, JSON.stringify(project.keywords.split(',').map(keyword => keyword.trim())))
    content = content.replace(/\[project\.private\]/g, project.private ? 'true' : 'false')
    content = content.replace(/\[author\.name\]/g, author.name)
    content = content.replace(/\[author\.email\]/g, author.email)
    content = content.replace(/\[author\.twitter\]/g, author.twitter)
    content = content.replace(/\[author\.website\]/g, author.website)
    content = content.replace(/\[package\.npm\]/g, pkg.npm)
    content = content.replace(/\[package\.name\]/g, pkg.scope ? `@${pkg.npm}/${pkg.name}` : pkg.name)
    content = content.replace(/\[package\.access\]/g, pkg.scope && pkg.private ? 'restricted' : 'public')
    content = content.replace(/\[package\.description\]/g, pkg.description)
    content = content.replace(/\[repo\.github\]/g, repo.github)
    content = content.replace(/\[repo\.name\]/g, repo.name)
    content = content.replace(/\[repo\.description\]/g, repo.description)
    content = content.replace(/\[repo\.github\]/g, repo.github)

    write(join(argv.path, file), content)
  })
}
