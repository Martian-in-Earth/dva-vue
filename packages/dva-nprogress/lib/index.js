'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

require('nprogress/nprogress.css');

var _nprogress = require('nprogress');

var _nprogress2 = _interopRequireDefault(_nprogress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      types = _ref.types;

  types = types || ['@@router/CALL_HISTORY_METHOD'];
  function onEffect(effect, _ref2, model, actionType) {
    var put = _ref2.put;

    return (/*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _args = arguments;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _nprogress2.default.start();
                _context.next = 3;
                return effect.apply(undefined, _args);

              case 3:
                _nprogress2.default.done();

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      })
    );
  }

  function onAction() {
    return function (next) {
      return function (action) {
        var type = action.type;

        if (~types.indexOf(type)) {
          _nprogress2.default.start();
          _nprogress2.default.done();
        }
        return next(action);
      };
    };
  }
  return {
    onEffect: onEffect,
    onAction: onAction
  };
};