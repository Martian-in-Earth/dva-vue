/* globals describe it expect */
import dva, {connect} from '../src/index'

const countModel = {
  namespace: 'count',
  state: 0,
  reducers: {
    add (state, { payload }) { return state + payload || 1 },
    minus (state, { payload }) { return state - payload || 1 }
  }
}

describe('connect', () => {
  it('normal', () => {
    const root = document.createElement('div')
    root.setAttribute('id', 'root')
    document.body.appendChild(root)
    const app = dva()
    app.model({ ...countModel })
    app.router(() => [{ path: '/',
      component: connect(({count}) => ({count}))({
        render (h) {
          console.log(this.$root.$props)
          return h('div')
        }
      })
    }])
    app.start('#root')
    expect(app._store.getState().count).equal(0)
  })
})
