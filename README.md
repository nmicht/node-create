# NPM Package Generator [![version][npm-version]][npm-url] [![License][license-image]][license-url]

> an opinionated npm package template

[![Build Status][travis-image]][travis-url]
[![Downloads][npm-downloads]][npm-url]
[![Code Climate][codeclimate-quality]][codeclimate-url]
[![Coverage Status][codeclimate-coverage]][codeclimate-url]
[![Dependency Status][dependencyci-image]][dependencyci-url]
[![Dependencies][david-image]][david-url]

## The Opinionated Parts

I follow the below set of rules in all projects, `npm-package-generator` ensures all those rules are followed:

- write in ES2015, compile into ES5, Node (v4, v5, v6, v7) compatible packages
- use the most permissive open source license *(currently ISC)*
- follow a preferred folder tree & npm's default expected file naming *(see [below](#folder-tree))*
- always expose your package's compiled library modules *(see [below](#folder-tree))*
- keep your package lean, only include useful files (compiled & sources) for developers *(see package.json > files)*
- use a standard template for `README` files.
- use [`semantic-release`](https://github.com/semantic-release/semantic-release)
- use [`EditorConfig`](http://editorconfig.org/) files *enforced by [`echint`](https://www.npmjs.com/package/echint)*
- Testing
  - use [`tap`](https://www.npmjs.com/package/tap) for testing & to generate coverage reports
  - use container mode in [`travis`](https://travis-ci.org/) and leverage folder caching.
  - use [`standard`](https://www.npmjs.com/package/standard) and [`echint`](https://www.npmjs.com/package/echint) for linting files
  - enforce `standard` & `echint` by running on [`pretest`](https://docs.npmjs.com/misc/scripts)
  - publish coverage reports to [codeclimate](https://codeclimate.com/) *(requires configuring travis with the appropriate `CODECLIMATE_REPO_TOKEN`)*

###### Folder Tree

```
/package-name/
├── build (compiled to Node v4)
│   ├── index.js
│   ├── browsers (compiled to last 2 versions of top browsers)
│   │   └── index.js
│   ├── node4 (compiled to Node v4) (default export)
│   │   └── index.js
│   ├── node6 (compiled to Node v6)
│   │   └── index.js
│   └── node7 (compiled to Node v7)
│       └── index.js
├── LICENSE
├── package.json
├── README.md
├── src
│   └── index.js
└── test
    ├── fixtures
    └── index.js
```

- `/build`: compiled library files, this is the default exposed output.
- `/src`: source library files: all common business logic, use this folder for your code

## Work in progress...

This is a work in progress, and will likely be in this state forever!

I will be updating this frequently as common practices change over time, or as I learn new trick.

please reach out to share any feedback & contribution!

## Install

```bash
npm install --only=production --save npm-package-generator
```

## Usage

```bash
$ npm-package-generator new my-awesome-package ~/Projects/my-awesome-package
```

```
npm-package-generator new <name> [path] [options]

Options:
  --help             Show help                                         [boolean]
  --author, -a       Author Name            [required] [default: "Ahmad Nassri"]
  --description, -d  Package Description
  --email, -e        Author Email  [required] [default: "ahmad@ahmadnassri.com"]
  --github, -g       Github Username         [required] [default: "ahmadnassri"]
  --website, -w      Author Website
                            [required] [default: "https://www.ahmadnassri.com/"]
  --install, -i      Install Dependencies?           [required] [default: false]

```

## API

### generator(options)

```js
import generator from 'npm-package-generator'

options = {
  path: '~/Projects/my-awesome-package',
  name: 'my-awesome-package',
  description: 'my-awesome-package',
  author: 'Ahmad Nassri',
  email: 'ahmad@nassri.email',
  website: 'https://www.ahmadnassri.com/',
  github: 'ahmadnassri',
  install: false
}

generator(options)
  .then(files => console.log(files)) //-> [array of files created]
```

#### options

| option        | description                               | default                               |
| ------------- | ----------------------------------------- | ------------------------------------- |
| `name`        | package name                              |                                       |
| `path`        | installation path                         |                                       |
| `author`      | author name                               | `process.env.NPM_AUTHOR_NAME`         |
| `description` | package description                       | `process.env.NPM_PACKAGE_DESCRIPTION` |
| `author`      | author name                               | `process.env.NPM_AUTHOR_NAME`         |
| `email`       | author email                              | `process.env.NPM_AUTHOR_EMAIL`        |
| `website`     | author website                            | `process.env.NPM_AUTHOR_WEBSITE`      |
| `github`      | github account                            | `process.env.NPM_GITHUB_USERNAME`     |
| `install`     | run `npm install` and update dependencies | `false`                               |

----
> :copyright: [ahmadnassri.com](https://www.ahmadnassri.com/) &nbsp;&middot;&nbsp;
> License: [ISC][license-url] &nbsp;&middot;&nbsp;
> Github: [@ahmadnassri](https://github.com/ahmadnassri) &nbsp;&middot;&nbsp;
> Twitter: [@ahmadnassri](https://twitter.com/ahmadnassri)

[license-url]: http://choosealicense.com/licenses/isc/
[license-image]: https://img.shields.io/github/license/ahmadnassri/npm-package-generator.svg?style=flat-square

[travis-url]: https://travis-ci.org/ahmadnassri/npm-package-generator
[travis-image]: https://img.shields.io/travis/ahmadnassri/npm-package-generator.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/npm-package-generator
[npm-version]: https://img.shields.io/npm/v/npm-package-generator.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/npm-package-generator.svg?style=flat-square

[codeclimate-url]: https://codeclimate.com/github/ahmadnassri/npm-package-generator
[codeclimate-quality]: https://img.shields.io/codeclimate/github/ahmadnassri/npm-package-generator.svg?style=flat-square
[codeclimate-coverage]: https://img.shields.io/codeclimate/coverage/github/ahmadnassri/npm-package-generator.svg?style=flat-square

[david-url]: https://david-dm.org/ahmadnassri/npm-package-generator
[david-image]: https://img.shields.io/david/ahmadnassri/npm-package-generator.svg?style=flat-square

[dependencyci-url]: https://dependencyci.com/github/ahmadnassri/npm-package-generator
[dependencyci-image]: https://dependencyci.com/github/ahmadnassri/npm-package-generator/badge?style=flat-square
