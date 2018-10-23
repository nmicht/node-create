# NPM Library Initializer

[![version][npm-image]][npm-url] [![Build Status][circle-image]][circle-url]

> an opinionated [npm package initializer][npm/init]

## Requirements

- `npm >= 6.x`
- `node >= 8.*`

## Usage

```bash
npm init @ahmadnassri/library
```

## How does this work?

> _`npm init <initializer>` can be used to set up a new or existing npm package._  
> _`initializer` in this case is an npm package named `create-<initializer>`, which will be installed by `npx`, and then have its main bin executed -- presumably creating or updating `package.json` and running any other initialization-related operations._  
> _[&mdash; Source: `docs.npmjs.com`][npm/init]_

---
> Author: [Ahmad Nassri](https://www.ahmadnassri.com/) &bull; 
> Github: [@ahmadnassri](https://github.com/ahmadnassri) &bull; 
> Twitter: [@AhmadNassri](https://twitter.com/AhmadNassri)

[circle-url]: https://circleci.com/gh/ahmadnassri/node-create
[circle-image]: https://img.shields.io/circleci/project/github/ahmadnassri/node-create/master.svg?style=for-the-badge&logo=circleci

[npm-url]: https://www.npmjs.com/package/@ahmadnassri/create-library
[npm-image]: https://img.shields.io/npm/v/@ahmadnassri/create-library.svg?style=for-the-badge&logo=npm

[npm/init]: https://docs.npmjs.com/cli/init#description
