var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

import Vue from 'vue';
import invariant from 'invariant';
import * as core from 'dva-core';
import { isFunction } from 'dva-core/lib/utils';
import VueRouter from 'vue-router';
import { routerMiddleware } from './middleware';
export { default as connect } from './connect';
export { default as dynamic } from './dynamic';

var isHTMLElement = function isHTMLElement(node) {
  return (typeof node === 'undefined' ? 'undefined' : _typeof(node)) === 'object' && node !== null && node.nodeType && node.nodeName;
};
var isString = function isString(str) {
  return typeof str === 'string';
};
var render = function render(container, store, app, router) {
  new Vue({
    router: router,
    store: store,
    render: function render(h) {
      return h('router-view');
    }
  }).$mount(container);
};

export default function () {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var mode = opts.mode || 'hash';
  var _router = new VueRouter({ mode: mode });
  var createOpts = {
    setupMiddlewares: function setupMiddlewares(middlewares) {
      return [routerMiddleware(_router.history)].concat(middlewares);
    },
    setupApp: function setupApp(app) {
      Vue.use(VueRouter);
    }
  };
  var router = function router(_router2) {
    invariant(isFunction(_router2), '[app.router] router should be function, but got ' + (typeof _router2 === 'undefined' ? 'undefined' : _typeof(_router2)));
    (app._router = _router).addRoutes(_router2({ app: app, history: app._history = _router.history }));
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
    // If has container, render; else, return vue component
    if (container) {
      render(container, store, app, app._router);
    } else {
      return '';
    }
  };
  var app = core.create(opts, createOpts);
  var oldAppStart = app.start;
  app.router = router;
  app.start = start;
  app.plugin = Vue.use;
  return app;
}