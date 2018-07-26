var CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD';

export function routerMiddleware(history) {
  return function () {
    return function (next) {
      return function (action) {
        if (action.type === CALL_HISTORY_METHOD) {
          var payload = action.payload;
          var method = payload.method,
              args = payload.args;

          history[method].apply(history, args);
        }
        return next(action);
      };
    };
  };
}