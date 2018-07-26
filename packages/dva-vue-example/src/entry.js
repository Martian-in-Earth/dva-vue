import 'nprogress/nprogress.css'
import dva from 'dva-vue'
import nprogressDva from 'dva-nprogress'
import router from './router'
const app = dva()
app.use(nprogressDva())
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
