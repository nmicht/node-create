const { basename } = require('path')
const { guessAuthor, guessEmail, guessGitHubUsername } = require('conjecture')
const inquirer = require('inquirer')
const kebab = require('lodash.kebabcase')
const name = require('validate-npm-package-name')

const licenses = require('./licenses')

// validation helpers
const validate = {
  notEmpty: input => input && input.length > 0,
  name: input => name(input).validForNewPackages
}

// the actual questions
module.exports = (pkg, destination) => inquirer.prompt([
  {
    type: 'confirm',
    name: 'oss',
    message: 'is this an open source project?',
    default: true
  },
  {
    type: 'list',
    name: 'license',
    message: 'choose a license:',
    choices: licenses,
    default: answers => answers.oss ? (pkg.license || 'MIT') : 'UNLICENSED',
    when: answers => answers.oss
  },
  {
    type: 'input',
    name: 'author',
    message: 'author full name:',
    default: guessAuthor,
    filter: input => input.trim(),
    validate: validate.notEmpty
  },
  {
    type: 'input',
    name: 'email',
    message: 'author email address:',
    default: guessEmail,
    filter: input => input.trim(),
    validate: validate.notEmpty
  },
  {
    type: 'input',
    name: 'website',
    message: 'author website:',
    filter: input => input.trim(),
    validate: validate.notEmpty
  },
  {
    type: 'input',
    name: 'title',
    message: 'project title:',
    default: basename(destination),
    filter: input => input.trim(),
    validate: validate.notEmpty
  },
  {
    type: 'input',
    name: 'description',
    message: 'project description:',
    default: pkg.description,
    filter: input => input.trim(),
    validate: validate.notEmpty
  },
  {
    type: 'input',
    name: 'homepage',
    message: 'project homepage:',
    default: pkg.homepage,
    filter: input => input.trim(),
    validate: validate.notEmpty
  },
  {
    type: 'input',
    name: 'org',
    message: 'user/org name:',
    default: answers => guessGitHubUsername(answers.email),
    filter: input => input.trim(),
    validate: validate.name
  },
  {
    type: 'input',
    name: 'name',
    message: 'package/repo name:',
    default: answers => (pkg.name ? pkg.name.split('/').pop() : kebab(answers.title)),
    filter: input => input.trim(),
    validate: validate.name
  },
  {
    type: 'input',
    name: 'topics',
    message: 'keywords to use (comma separated):',
    default: pkg.keywords ? pkg.keywords.join(', ') : null,
    filter: input => input.trim().split(',').map(keyword => keyword.trim()),
    validate: validate.notEmpty
  },
  {
    type: 'input',
    name: 'twitter',
    message: 'twitter:',
    default: answers => guessGitHubUsername(answers.email),
    filter: input => input.trim(),
    validate: validate.notEmpty
  }
])
