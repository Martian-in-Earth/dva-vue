'use strict';

exports.__esModule = true;
exports.routerMiddleware = routerMiddleware;
var CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD';

function routerMiddleware(history) {
  return function () {
    return function (next) {
      return function (action) {
        if (action.type !== CALL_HISTORY_METHOD) {
          return next(action);
        }
        var payload = action.payload;
        var method = payload.method,
            args = payload.args;

        history[method].apply(history, args);
      };
    };
  };
}