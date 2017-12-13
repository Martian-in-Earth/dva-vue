export default {
  namespace: 'share',
  state: {c: 'xxx'},
  reducers: {},
  effects: {},
  subscriptions: {
    setup ({ dispatch, history }) {
      console.log(2)
    }
  }
}
