import Vue from 'vue'
import invariant from 'invariant'
import * as core from 'dva-core'
import { isFunction } from 'dva-core/lib/utils'
import VueRouter from 'vue-router'
import { routerMiddleware } from './middleware'
export { default as connect } from './connect'
export { default as dynamic } from './dynamic'

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
  new Vue({
    router,
    store,
    render (h) {
      return h('router-view')
    }
  }).$mount(container)
}

export default function (opts = {}) {
  const mode = opts.mode || 'hash'
  const _router = new VueRouter({mode})
  const createOpts = {
    setupMiddlewares (middlewares) {
      return [
        routerMiddleware(_router.history),
        ...middlewares
      ]
    },
    setupApp (app) {
      Vue.use(VueRouter)
    }
  }
  const router = router => {
    invariant(isFunction(router), `[app.router] router should be function, but got ${typeof router}`);
    (app._router = _router).addRoutes(router({ app, history: (app._history = _router.history) }))
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
    // If has container, render; else, return vue component
    if (container) {
      render(container, store, app, app._router)
    } else {
      return ''
    }
  }
  const app = core.create(opts, createOpts)
  const oldAppStart = app.start
  app.router = router
  app.start = start
  app.plugin = Vue.use
  return app
}
