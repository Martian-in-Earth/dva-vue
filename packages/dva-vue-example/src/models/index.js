export default {
  namespace: 'index',
  state: {},
  reducers: {
    show (state, {payload}) {
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: {
    * getUser ({payload}, { call, put }) {
      yield put({ type: 'show',
        payload: {
          nickName: payload
        } })
    }
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      dispatch({type: 'getUser', payload: 'aaxcc'})
      console.log(1)
    }
  }
}
