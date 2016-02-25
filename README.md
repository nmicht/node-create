# npm-package-generator [![version][npm-version]][npm-url] [![License][npm-license]][license-url]

> an opinionated npm package template

[![Build Status][travis-image]][travis-url]
[![Downloads][npm-downloads]][npm-url]
[![Code Climate][codeclimate-quality]][codeclimate-url]
[![Coverage Status][codeclimate-coverage]][codeclimate-url]
[![Dependencies][david-image]][david-url]

## The Opinionated Parts

I follow the below set of rules in all projects, `npm-package-generator` ensures all those rules are followed:

- write in ES2015, compile into ES5
- use the most permissive open source license *(currently ISC)*
- follow a preferred folder tree & npm's default expected file naming *(see below)*
- always expose your package's compiled library modules *(see folder tree below)*
- keep your package lean, only include useful files (compiled & sources) for developers *(see package.json > files)*
- use a standard template for `README` files.
- use [`semantic-release`](https://github.com/semantic-release/semantic-release)
- use [`EditorConfig`](http://editorconfig.org/) files *enforced by [`echint`](https://www.npmjs.com/package/echint)*
- use [`commander`](https://www.npmjs.com/package/commander) to provide a CLI (Command Line Interface) *when applicable*
- use [`debug-log`](https://www.npmjs.com/package/debug-log) to provide helpful debugging messages without the use of `console.log`
- Testing
  - use [`tap`](https://www.npmjs.com/package/tap) for testing & to generate coverage reports
  - use container mode in [`travis`](https://travis-ci.org/) and leverage folder caching.
  - use [`standard`](https://www.npmjs.com/package/standard) and [`echint`](https://www.npmjs.com/package/echint) for linting files
  - enforce `standard` & `echint` by running on [`pretest`](https://docs.npmjs.com/misc/scripts)
  - publish coverage reports to [codeclimate](https://codeclimate.com/) *(requires configuring travis with the appropriate `CODECLIMATE_REPO_TOKEN`)*

###### Folder Tree

```
/package-name/
├── lib (compiled)
│   ├── bin.js
│   └── index.js
├── LICENSE
├── package.json
├── README.md
├── src (es6)
│   ├── bin.js
│   └── index.js
└── test
    ├── fixtures
    └── index.js
```

- `/lib`: ES5 compiled library files, this is the default exposed output.
- `/src`: source library files: all common business logic, use this folder as heavily as possible

### First Run

- remove any optional files and folders based on the type of project (e.g. `src/bin`)
- use `npm scripts` when possible to automate install and build steps:
  - e.g. `"postinstall": "bower install"`
  - e.g. `"beforestart": "gulp build"`

## Work in progress...

This is a work in progress, and will likely be in this state forever!

I will be updating this frequently as common practices change over time, or as I learn new trick.

please reach out to share any feedback & contribution!

## Install

```sh
npm install --save npm-package-generator
```

## Usage

```

  Usage: bin [options] <name> <path>

  Options:

    -h, --help                       output usage information
    -V, --version                    output the version number
    -a, --author <name>              Author Name
    -d, --description <description>  description
    -e, --email <email>              Author Email
    -g, --github <username>          Github Username
    -w, --website <url>              Author Website
    -s, --semantic-release           run semantic-release-cli setup
    -i, --install                    Install Dependencies
    -q, --quiet                      hide npm install output
```

## API

### generator(name, path, [options])

```js
import generator from 'npm-package-generator'

generator('my-awesome-package', '~/Projects/my-awesome-package', options)
  .then((files) => console.log(files)) //-> [array of files created]
```

#### options

| option        | description                                     | default                               |
| ------------- | ----------------------------------------------- | ------------------------------------- |
| `author`      | author name                                     | `process.env.NPM_AUTHOR_NAME`         |
| `description` | package description                             | `process.env.NPM_PACKAGE_DESCRIPTION` |
| `email`       | author email                                    | `process.env.NPM_AUTHOR_EMAIL`        |
| `website`     | author website                                  | `process.env.NPM_AUTHOR_WEBSITE`      |
| `github`      | github account                                  | `process.env.NPM_GITHUB_USERNAME`     |
| `install`     | run `npm install` and update dependencies       | `false`                               |
| `quiet`       | pipe npm output to `process.stdout`             | `false`                               |

## License

[ISC License](LICENSE) &copy; [Ahmad Nassri](https://www.ahmadnassri.com/)

[license-url]: https://github.com/ahmadnassri/npm-package-generator/blob/master/LICENSE

[travis-url]: https://travis-ci.org/ahmadnassri/npm-package-generator
[travis-image]: https://img.shields.io/travis/ahmadnassri/npm-package-generator.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/npm-package-generator
[npm-license]: https://img.shields.io/npm/l/npm-package-generator.svg?style=flat-square
[npm-version]: https://img.shields.io/npm/v/npm-package-generator.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/npm-package-generator.svg?style=flat-square

[codeclimate-url]: https://codeclimate.com/github/ahmadnassri/npm-package-generator
[codeclimate-quality]: https://img.shields.io/codeclimate/github/ahmadnassri/npm-package-generator.svg?style=flat-square
[codeclimate-coverage]: https://img.shields.io/codeclimate/coverage/github/ahmadnassri/npm-package-generator.svg?style=flat-square

[david-url]: https://david-dm.org/ahmadnassri/npm-package-generator
[david-image]: https://img.shields.io/david/ahmadnassri/npm-package-generator.svg?style=flat-square
