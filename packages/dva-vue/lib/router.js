'use strict';

exports.__esModule = true;
exports.Router = exports.Link = undefined;

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Link = exports.Link = function Link(history) {
  return function (Vue) {
    Vue.component('dva-link', {
      props: {
        tag: {
          default: 'a'
        },
        to: {
          require: true,
          type: String
        },
        replace: {
          type: Boolean,
          default: false
        }
      },
      render: function render(h) {
        var _this = this;

        return h(this.tag, {
          on: {
            click: function click() {
              return (_this.replace ? history.replace : history.push)(_this.to);
            }
          }
        }, this.$slots.default);
      }
    });
  };
};
var Router = exports.Router = {
  props: {
    history: {
      require: true,
      type: Object
    },
    routes: {
      require: true,
      type: Array
    },
    store: {
      require: true,
      type: Object
    }
  },
  data: function data() {
    return {
      location: {}
    };
  },
  beforeMount: function beforeMount() {
    var _this2 = this;

    this.history.listen(function (location) {
      _this2.location = location;
    });
  },

  methods: {
    matchPath: function matchPath(path) {
      var re = (0, _pathToRegexp2.default)(path);
      var pathname = this.location.pathname;

      var match = re.exec(pathname);
      return match;
    }
  },
  render: function render(h) {
    var _this3 = this;

    var match = null;
    var child = null;
    this.routes.forEach(function (route) {
      var component = route.component,
          path = route.path;

      if (match == null) {
        child = component;
        match = path ? _this3.matchPath(path) : null;
      }
    });
    return match ? h(child) : null;
  }
};