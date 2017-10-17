import Vue from 'vue'
import VueRouter from 'vue-router'
import invariant from 'invariant'
import * as core from 'dva-core'
import { isFunction } from 'dva-core/lib/utils'
import { routerMiddleware } from './middleware'
export { default as connect } from './connect'
export { default as dynamic } from './dynamic'

const isHTMLElement = node => typeof node === 'object' && node !== null && node.nodeType && node.nodeName
const isString = str => typeof str === 'string'
const vueRouter = new VueRouter()
const render = (container, store, app, router) => {
  vueRouter.addRoutes(router({ app, history: app._history }))
  let _app = new Vue({
    store,
    router: vueRouter,
    render (h) {
      return h('router-view')
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
  const createOpts = {
    setupMiddlewares (middlewares) {
      return [
        routerMiddleware(vueRouter.history),
        ...middlewares
      ]
    },
    setupApp (app) {
      app._history = vueRouter.history
    }
  }
  const router = router => {
    invariant(isFunction(router), `[app.router] router should be function, but got ${typeof router}`)
    Vue.use(VueRouter)
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
