var CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD'

export function routerMiddleware (history) {
  return () => next => action => {
    if (action.type === CALL_HISTORY_METHOD) {
      const { payload } = action
      const { method, args } = payload
      history[method].apply(history, args)
    }
    return next(action)
  }
}
