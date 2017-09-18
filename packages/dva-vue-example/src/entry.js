import dva from 'dva-vue'
import router from './router'
const app = dva()
app.model({
  namespace: 'app',
  state: {},
  subscriptions: {
    setup ({ dispatch, history }) {
      return history.block(({pathname, search}, action) => {
        if (action === 'REPLACE') {
          return true
        }
        // 如果是in 则刷新 否则不改
        if (/infashion/gi.test(window.navigator.userAgent)) {
          location.hash = `${pathname}${search}`
          location.reload()
          return false
        }
      })
    }
  }
})
app.router(router)
app.start('#app')
