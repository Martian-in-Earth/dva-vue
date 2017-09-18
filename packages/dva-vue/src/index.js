import Vue from 'vue'
import invariant from 'invariant'
import * as core from 'dva-core'
import { isFunction } from 'dva-core/lib/utils'
import { createHashHistory } from 'history'
import { routerMiddleware } from './middleware'
import { Router, Link } from './router'
export { default as connect } from './connect'
export { default as dynamic } from './dynamic'
export { createBrowserHistory, createHashHistory, createMemoryHistory } from 'history'

const isHTMLElement = node => typeof node === 'object' && node !== null && node.nodeType && node.nodeName
const isString = str => typeof str === 'string'
const patchHistory = history => {
  const oldListen = history.listen
  history.listen = (callback) => {
    callback(history.location)
    return oldListen.call(history, callback)
  }
  return history
}
const render = (container, store, app, router) => {
  let _app = new Vue({
    store,
    render (h) {
      return h(Router, {
        props: {
          history: app._history,
          routes: router({ app, history: app._history }),
          store: store
        }
      })
    }
  })
  // If has container, render; else, return vue component
  if (container) {
    _app.$mount(container)
  } else {
    return _app
  }
}

export default function (opts = {}) {
  const history = opts.history || createHashHistory()
  const createOpts = {
    setupMiddlewares (middlewares) {
      return [
        routerMiddleware(history),
        ...middlewares
      ]
    },
    setupApp (app) {
      Vue.use(Link(history))
      app._history = patchHistory(history)
    }
  }
  const router = router => {
    invariant(isFunction(router), `[app.router] router should be function, but got ${typeof router}`)
    app._router = router
  }
  const start = container => {
    // 允许 container 是字符串，然后用 querySelector 找元素
    if (isString(container)) {
      container = document.querySelector(container)
      invariant(container, `[app.start] container ${container} not found`)
    }
    // 并且是 HTMLElement
    invariant(!container || isHTMLElement(container), `[app.start] container should be HTMLElement`)
    // 路由必须提前注册
    invariant(app._router, `[app.start] router must be registered before app.start()`)
    oldAppStart.call(app)
    const store = app._store
    render(container, store, app, app._router)
  }
  const app = core.create(opts, createOpts)
  const oldAppStart = app.start
  app.router = router
  app.start = start
  app.plugin = Vue.use
  return app
}
