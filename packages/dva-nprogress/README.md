# dva-loading

[![NPM version](https://img.shields.io/npm/v/dva-nprogress.svg?style=flat)](https://npmjs.org/package/dva-nprogress)
[![NPM downloads](http://img.shields.io/npm/dm/dva-nprogress.svg?style=flat)](https://npmjs.org/package/dva-nprogress)

Nprogress plugin for dva. :clap:

---

## Install

```bash
$ npm install dva-nprogress --save
```

## Usage

```javascript
import nprogressDva from 'dva-nprogress';

const app = dva();
app.use(nprogressDva(['@@router/CALL_HISTORY_METHOD']));
```

Then we can access loading state from store.

### opts

- `opts.types`: property key on action type to animation, type Array, Default `['@@router/CALL_HISTORY_METHOD']`

## License

[MIT](https://tldrlegal.com/license/mit-license)