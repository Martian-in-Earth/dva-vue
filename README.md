# dva-vue

[![NPM version](https://img.shields.io/npm/v/dva-vue.svg?style=flat)](https://npmjs.org/package/dva-vue)
[![Build Status](https://img.shields.io/travis/jetsly/dva-vue.svg?style=flat)](https://travis-ci.org/jetsly/dva-vue)
[![Coverage Status](https://img.shields.io/coveralls/jetsly/dva-vue.svg?style=flat)](https://coveralls.io/r/jetsly/dva-vue)
[![NPM downloads](http://img.shields.io/npm/dm/dva-vue.svg?style=flat)](https://npmjs.org/package/dva-vue)
[![Dependencies](https://david-dm.org/jetsly/dva-vue/status.svg)](https://david-dm.org/jetsly/dva-vue)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![MIT](https://img.shields.io/dub/l/vibe-d.svg?style=flat-square)](http://opensource.org/licenses/MIT)

[![NPM](https://nodei.co/npm/dva-vue.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/dva-vue/)

> Lightweight front-end framework based on [dva-core](https://github.com/dvajs/dva/tree/master/packages/dva-core) and [history](https://github.com/ReactTraining/history)

## Demos & Plugins

- [dva-vue-example](https://github.com/Jetsly/dva-vue/tree/master/packages/dva-vue-example): dva-vue demos

---

### Install

```bash
$ npm install --save dva-vue
```

### Usage Example

```App.vue
<template>
    <div>
        <div>count: {{count}}</div>
        <div @click="add"></div>
    </div>
</template>
<script>
    import {connect} from 'dva-vue'
    export default connect(({count}) => ({count}))({
      methods: {
        add () {
          this.dispatch({type: 'count/add'}).then(()=>console.log('done'))
        }
      }
    })
</script>
```
```javascript
import dva, { createHashHistory } from 'dva-vue'
import App from 'App.vue'
const app = dva({
  history: createHashHistory() // 默认值
})
app.model({
  namespace: 'count',
  state: 0,
  reducers: {
    add (state, { payload }) { return state + payload || 1 },
    minus (state, { payload }) { return state - payload || 1 }
  }
})
app.router(() => [{ path: '/', component: App }])
app.start('#root')
```

## API Reference

```javascript
import dva, { 
    connect,
    dynamic,
    createBrowserHistory,
    createHashHistory,
    createMemoryHistory
} from 'dva-vue'
```


## LICENSE

MIT