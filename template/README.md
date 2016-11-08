# ${name} [![version][npm-version]][npm-url] [![License][npm-license]][license-url]

> ${description}

[![Build Status][travis-image]][travis-url]
[![Downloads][npm-downloads]][npm-url]
[![Code Climate][codeclimate-quality]][codeclimate-url]
[![Coverage Status][codeclimate-coverage]][codeclimate-url]
[![Dependency Status][dependencyci-image]][dependencyci-url]
[![Dependencies][david-image]][david-url]

## Install

```bash
npm install --production --save ${name}
```

## Usage

I recommend using an optimized build matching your Node.js environment version, otherwise, the standard `require` would work just fine with any version of Node `>= v4.0` .

```js
/*
 * Node 7
 */
const ${name} = require('${name}/lib/node7')

/*
 * Node 6
 */
const ${name} = require('${name}/lib/node6')

/*
 * Node 5
 */
var ${name} = require('${name}/lib/node5')

/*
 * Node 4 (Default)
 * Note: additional ES2015 polyfills may be required
 */
var ${name} = require('${name}')
```

## API

### ${name}()

```js
import ${name} from '${name}'

${name}()
```

----
> :copyright: [${domain}](${website}) &nbsp;&middot;&nbsp;
> License: [ISC][license-url] &nbsp;&middot;&nbsp;
> Github: [@${github}](https://github.com/${github}) &nbsp;&middot;&nbsp;
> Twitter: [@${github}](https://twitter.com/${github})

[license-url]: http://choosealicense.com/licenses/isc/

[travis-url]: https://travis-ci.org/${github}/${name}
[travis-image]: https://img.shields.io/travis/${github}/${name}.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/${name}
[npm-license]: https://img.shields.io/npm/l/${name}.svg?style=flat-square
[npm-version]: https://img.shields.io/npm/v/${name}.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/${name}.svg?style=flat-square

[codeclimate-url]: https://codeclimate.com/github/${github}/${name}
[codeclimate-quality]: https://img.shields.io/codeclimate/github/${github}/${name}.svg?style=flat-square
[codeclimate-coverage]: https://img.shields.io/codeclimate/coverage/github/${github}/${name}.svg?style=flat-square

[david-url]: https://david-dm.org/${github}/${name}
[david-image]: https://img.shields.io/david/${github}/${name}.svg?style=flat-square

[dependencyci-url]: https://dependencyci.com/github/${github}/${name}
[dependencyci-image]: https://dependencyci.com/github/${github}/${name}/badge?style=flat-square
