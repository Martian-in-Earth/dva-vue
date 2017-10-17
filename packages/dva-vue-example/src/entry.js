import dva from 'dva-vue'
import router from './router'
const app = dva()
app.model({
  namespace: 'app',
  state: {},
  subscriptions: {
    setup ({ dispatch, history }) {
      console.log(history)
    }
  }
})
app.router(router)
app.start('#app')
