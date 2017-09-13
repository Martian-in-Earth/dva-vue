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
    return {
      ...component,
      beforeCreate: Array.isArray(component.beforeCreate)
        ? component.beforeCreate.concat(beforeCreate)
        : isFunction(component.beforeCreate)
          ? [component.beforeCreate, beforeCreate]
          : beforeCreate
    }
  }
}
