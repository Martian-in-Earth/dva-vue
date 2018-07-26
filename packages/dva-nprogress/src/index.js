import NProgress from 'nprogress'

export default ({types} = {}) => {
  types = types || ['@@router/CALL_HISTORY_METHOD']
  function onEffect (effect, { put }, model, actionType) {
    return function * (...args) {
      NProgress.start()
      yield effect(...args)
      NProgress.done()
    }
  }

  function onAction () {
    return next => action => {
      const { type } = action
      if (~types.indexOf(type)) {
        NProgress.start()
        NProgress.done()
      }
      return next(action)
    }
  }
  return {
    onEffect,
    onAction
  }
}
