import { isFunction } from 'dva-core/lib/utils';

export default function connect(mapStateToComputed) {
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
    var _beforeCreate = Array.isArray(component.beforeCreate) ? component.beforeCreate.concat(beforeCreate) : isFunction(component.beforeCreate) ? [component.beforeCreate, beforeCreate] : beforeCreate;
    if (component._Ctor) {
      // 实例化后注入    
      component._Ctor['' + Object.keys(component._Ctor)[0]].options.beforeCreate = _beforeCreate;
    } else {
      // 模版对象注入
      component.beforeCreate = _beforeCreate;
    }
    return component;
  };
}