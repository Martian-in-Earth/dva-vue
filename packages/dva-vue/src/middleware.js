var CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD'

export function routerMiddleware (history) {
  return () => next => action => {
    if (action.type !== CALL_HISTORY_METHOD) {
      return next(action)
    }
    var _action$payload = action.payload
    var method = _action$payload.method
    var args = _action$payload.args

    history[method].apply(history, args)
  }
}
