# ${name} [![version][npm-version]][npm-url] [![License][license-image]][license-url]

> ${description}

[![Build Status][travis-image]][travis-url]
[![Downloads][npm-downloads]][npm-url]
[![Code Climate][codeclimate-quality]][codeclimate-url]
[![Coverage Status][codeclimate-coverage]][codeclimate-url]
[![Dependency Status][dependencyci-image]][dependencyci-url]
[![Dependencies][david-image]][david-url]

## Install

```bash
npm install --only=production --save ${name}
```

## API

### ${name}()

```js
import ${name} from '${name}'

${name}()
```

## Targeted Builds

an optimized build is made available for every major Node.js version marked as [Active LTS](https://github.com/nodejs/LTS).

```js
// Browsers (last 2 versions at time of last build)
const ${name} = require('${name}/build/browsers')

// Node 7
const ${name} = require('${name}/build/node7')

// Node 6
const ${name} = require('${name}/build/node6')

// Node 4 (Default)
var ${name} = require('${name}')
```

---
> :copyright: [${domain}](${website}) &nbsp;&middot;&nbsp;
> License: [ISC][license-url] &nbsp;&middot;&nbsp;
> Github: [@${github}](https://github.com/${github}) &nbsp;&middot;&nbsp;
> Twitter: [@${github}](https://twitter.com/${github})

[license-url]: http://choosealicense.com/licenses/isc/
[license-image]: https://img.shields.io/github/license/${github}/${name}.svg?style=flat-square

[travis-url]: https://travis-ci.org/${github}/${name}
[travis-image]: https://img.shields.io/travis/${github}/${name}.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/${name}
[npm-version]: https://img.shields.io/npm/v/${name}.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/${name}.svg?style=flat-square

[codeclimate-url]: https://codeclimate.com/github/${github}/${name}
[codeclimate-quality]: https://img.shields.io/codeclimate/github/${github}/${name}.svg?style=flat-square
[codeclimate-coverage]: https://img.shields.io/codeclimate/coverage/github/${github}/${name}.svg?style=flat-square

[david-url]: https://david-dm.org/${github}/${name}
[david-image]: https://img.shields.io/david/${github}/${name}.svg?style=flat-square

[dependencyci-url]: https://dependencyci.com/github/${github}/${name}
[dependencyci-image]: https://dependencyci.com/github/${github}/${name}/badge?style=flat-square
