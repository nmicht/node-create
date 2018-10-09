const filter = (input) => input.trim()
const validate = (input) => input && input.length > 0

const filters = {
  scope: (input) => input ? input.trim().replace(/^@/, '') : null,
  name: (input) => input ? input.trim().toLowerCase().replace(/\s/g, '-') : null
}

exports.project = (spdx) => {
  let licenses = [ { name: 'UNLICENSED', value: 'UNLICENSED' } ]
  licenses = licenses.concat(Object.entries(spdx).map(([ key, license ]) => ({ name: license.name, value: key })))

  return [
    {
      type: 'confirm',
      name: 'private',
      message: 'private project',
      default: false
    },
    {
      type: 'input',
      name: 'name',
      message: 'project name',
      filter,
      validate
    },
    {
      type: 'input',
      name: 'description',
      message: 'project description',
      filter,
      validate
    },
    {
      type: 'input',
      name: 'website',
      message: 'project website',
      default: process.env.AUTHOR_WEBSITE,
      filter,
      validate
    },
    {
      type: 'list',
      name: 'license',
      message: 'choose a license',
      choices: licenses,
      default: 'MIT'
    },
    {
      type: 'input',
      name: 'keywords',
      message: 'keywords to use (comma separated)',
      filter,
      validate
    }
  ]
}

exports.package = (project) => {
  return [
    {
      type: 'input',
      name: 'npm',
      message: 'npm username/org',
      default: filters.scope(process.env.NPM_NAME),
      filter: filters.scope
    },
    {
      type: 'confirm',
      name: 'scope',
      message: 'use npm scopes?',
      default: true
    },
    {
      type: 'input',
      name: 'name',
      message: 'npm package name',
      default: filters.name(project.name),
      filter: filters.name,
      validate
    },
    {
      type: 'input',
      name: 'description',
      message: 'npm package description',
      default: project.description,
      filter,
      validate
    }
  ]
}

exports.author = [
  {
    type: 'input',
    name: 'name',
    message: 'author name',
    default: process.env.AUTHOR_NAME,
    validate,
    filter
  },
  {
    type: 'input',
    name: 'email',
    message: 'author email',
    default: process.env.AUTHOR_EMAIL,
    validate,
    filter
  },
  {
    type: 'input',
    name: 'website',
    message: 'author website',
    default: process.env.AUTHOR_WEBSITE,
    validate,
    filter
  },
  {
    type: 'input',
    name: 'twitter',
    message: 'twitter account',
    default: process.env.AUTHOR_TWITTER,
    validate,
    filter
  }
]

exports.repository = (project) => {
  return [
    {
      type: 'input',
      name: 'github',
      message: 'github username/org',
      default: filters.scope(process.env.GITHUB_NAME),
      filter: filters.scope,
      validate
    },
    {
      type: 'input',
      name: 'name',
      message: 'repository name',
      default: filters.name(project.name),
      filter: filters.name,
      validate
    },
    {
      type: 'input',
      name: 'description',
      message: 'repository description',
      default: project.description,
      filter,
      validate
    }
  ]
}
