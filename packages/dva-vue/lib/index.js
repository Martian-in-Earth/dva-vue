'use strict';

exports.__esModule = true;
exports.dynamic = exports.connect = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _connect = require('./connect');

Object.defineProperty(exports, 'connect', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_connect).default;
  }
});

var _dynamic = require('./dynamic');

Object.defineProperty(exports, 'dynamic', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_dynamic).default;
  }
});

exports.default = function () {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var mode = opts.mode || 'hash';
  var router = function router(_router) {
    (0, _invariant2.default)((0, _utils.isFunction)(_router), '[app.router] router should be function, but got ' + (typeof _router === 'undefined' ? 'undefined' : _typeof(_router)));
    app._router = _router;
  };
  var start = function start(container) {
    // 允许 container 是字符串，然后用 querySelector 找元素
    if (isString(container)) {
      container = document.querySelector(container);
      (0, _invariant2.default)(container, '[app.start] container ' + container + ' not found');
    }
    // 并且是 HTMLElement
    (0, _invariant2.default)(!container || isHTMLElement(container), '[app.start] container should be HTMLElement');
    // 路由必须提前注册
    (0, _invariant2.default)(app._router, '[app.start] router must be registered before app.start()');
    oldAppStart.call(app);
    var store = app._store;
    // If has container, render; else, return vue component
    if (container) {
      render(container, store, app, app._router);
    } else {
      return '';
    }
  };
  var createOpts = {
    setupApp: function setupApp(app) {
      _vue2.default.use(_vueRouter2.default);
      app._router = new _vueRouter2.default({
        mode: mode,
        routes: app._router({ app: app, history: app._history })
      });
      app._history = patchHistory(app._router.history);
    }
  };
  var app = core.create(opts, createOpts);
  var oldAppStart = app.start;
  app.router = router;
  app.start = start;
  app.plugin = _vue2.default.use;
  return app;
};

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _dvaCore = require('dva-core');

var core = _interopRequireWildcard(_dvaCore);

var _utils = require('dva-core/lib/utils');

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isHTMLElement = function isHTMLElement(node) {
  return (typeof node === 'undefined' ? 'undefined' : _typeof(node)) === 'object' && node !== null && node.nodeType && node.nodeName;
};
var isString = function isString(str) {
  return typeof str === 'string';
};
var patchHistory = function patchHistory(history) {
  var oldListen = history.listen;
  history.listen = function (callback) {
    callback(history.location);
    return oldListen.call(history, callback);
  };
  return history;
};
var render = function render(container, store, app, router) {
  new _vue2.default({
    router: router,
    store: store,
    render: function render(h) {
      return h('router-view');
    }
  }).$mount(container);
};