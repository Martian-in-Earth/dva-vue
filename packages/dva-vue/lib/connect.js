'use strict';

exports.__esModule = true;
exports.default = connect;

var _utils = require('dva-core/lib/utils');

var pushBeforeCreate = function pushBeforeCreate(beforeCreate, item) {
  return Array.isArray(beforeCreate) ? beforeCreate.concat(item) : (0, _utils.isFunction)(beforeCreate) ? [beforeCreate, item] : item;
};

function connect(mapStateToComputed) {
  return function (component) {
    var beforeCreate = function beforeCreate() {
      var _this = this;

      var store = this.$root.$options.store;
      this.dispatch = store.dispatch;
      store.subscribe(function () {
        var computeds = mapStateToComputed(store.getState());
        Object.keys(computeds).forEach(function (key) {
          _this['' + key] = computeds['' + key];
        });
      });
      var computeds = mapStateToComputed(store.getState());
      Object.keys(computeds).forEach(function (key) {
        _this.$root.constructor.util.defineReactive(_this, key, computeds['' + key]);
      });
    };
    if (component._Ctor) {
      var _Ctor = component._Ctor['' + Object.keys(component._Ctor)[0]];
      // 实例化后注入    
      _Ctor.options.beforeCreate = pushBeforeCreate(_Ctor.options.beforeCreate, beforeCreate);
    } else {
      // 模版对象注入
      component.beforeCreate = pushBeforeCreate(component.beforeCreate, beforeCreate);
    }
    return component;
  };
}