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
        var _action$payload = action.payload;
        var method = _action$payload.method;
        var args = _action$payload.args;

        history[method].apply(history, args);
      };
    };
  };
}