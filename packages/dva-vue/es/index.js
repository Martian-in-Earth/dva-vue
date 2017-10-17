var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

import Vue from 'vue';
import VueRouter from 'vue-router';
import invariant from 'invariant';
import * as core from 'dva-core';
import { isFunction } from 'dva-core/lib/utils';
import { routerMiddleware } from './middleware';
export { default as connect } from './connect';
export { default as dynamic } from './dynamic';

var isHTMLElement = function isHTMLElement(node) {
  return (typeof node === 'undefined' ? 'undefined' : _typeof(node)) === 'object' && node !== null && node.nodeType && node.nodeName;
};
var isString = function isString(str) {
  return typeof str === 'string';
};
var vueRouter = new VueRouter();
var render = function render(container, store, app, router) {
  vueRouter.addRoutes(router({ app: app, history: app._history }));
  var _app = new Vue({
    store: store,
    router: vueRouter,
    render: function render(h) {
      return h('router-view');
    }
  });
  // If has container, render; else, return vue component
  if (container) {
    _app.$mount(container);
  } else {
    return _app;
  }
};

export default function () {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var createOpts = {
    setupMiddlewares: function setupMiddlewares(middlewares) {
      return [].concat(middlewares);
    },
    setupApp: function setupApp(app) {
      app._history = vueRouter.history;
    }
  };
  var router = function router(_router) {
    invariant(isFunction(_router), '[app.router] router should be function, but got ' + (typeof _router === 'undefined' ? 'undefined' : _typeof(_router)));
    Vue.use(VueRouter);
    app._router = _router;
  };
  var start = function start(container) {
    // 允许 container 是字符串，然后用 querySelector 找元素
    if (isString(container)) {
      container = document.querySelector(container);
      invariant(container, '[app.start] container ' + container + ' not found');
    }
    // 并且是 HTMLElement
    invariant(!container || isHTMLElement(container), '[app.start] container should be HTMLElement');
    // 路由必须提前注册
    invariant(app._router, '[app.start] router must be registered before app.start()');
    oldAppStart.call(app);
    var store = app._store;
    render(container, store, app, app._router);
  };
  var app = core.create(opts, createOpts);
  var oldAppStart = app.start;
  app.router = router;
  app.start = start;
  app.plugin = Vue.use;
  return app;
}