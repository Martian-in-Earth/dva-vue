import { isFunction } from 'dva-core/lib/utils'

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
    let _beforeCreate = Array.isArray(component.beforeCreate)
      ? component.beforeCreate.concat(beforeCreate)
      : isFunction(component.beforeCreate)
        ? [component.beforeCreate, beforeCreate]
        : beforeCreate
    if (component._Ctor) {
      // 实例化后注入    
      component._Ctor[`${Object.keys(component._Ctor)[0]}`].options.beforeCreate = _beforeCreate
    } else {
      // 模版对象注入
      component.beforeCreate = _beforeCreate
    }
    return component
  }
}
