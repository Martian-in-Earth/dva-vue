export default {
  namespace: 'share',
  state: {c: 'xxx'},
  reducers: {},
  subscriptions: {
    setup ({ dispatch, history }) {
      console.log(2)
    }
  }
}
