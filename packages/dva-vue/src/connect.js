import { isFunction } from 'dva-core/lib/utils'

const pushBeforeCreate = (beforeCreate, item) => Array.isArray(beforeCreate)
  ? beforeCreate.concat(item)
  : isFunction(beforeCreate)
    ? [beforeCreate, item]
    : item

export default function connect (mapStateToComputed) {
  return component => {
    let beforeCreate = function () {
      const store = this.$root.$options.store
      this.dispatch = store.dispatch
      store.subscribe(() => {
        let computeds = mapStateToComputed(store.getState())
        Object.keys(computeds).forEach(key => {
          this[`${key}`] = computeds[`${key}`]
        })
      })
      let computeds = mapStateToComputed(store.getState())
      Object.keys(computeds).forEach(key => {
        this.$root.constructor.util.defineReactive(this, key, computeds[`${key}`])
      })
    }
    if (component._Ctor) {
      let _Ctor = component._Ctor[`${Object.keys(component._Ctor)[0]}`]
      // 实例化后注入    
      _Ctor.options.beforeCreate = pushBeforeCreate(_Ctor.options.beforeCreate, beforeCreate)
    } else {
      // 模版对象注入
      component.beforeCreate = pushBeforeCreate(component.beforeCreate, beforeCreate)
    }
    return component
  }
}
