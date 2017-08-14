'use strict';

exports.__esModule = true;
exports.default = createUrlQueryMiddleware;

var _reduceReducers = require('reduce-reducers');

var _reduceReducers2 = _interopRequireDefault(_reduceReducers);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _getParsedQuery = require('./getParsedQuery');

var _getParsedQuery2 = _interopRequireDefault(_getParsedQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createUrlQueryMiddleware() {
  var initialReducer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  var injectReducers = void 0;
  var injectUrlConfigs = void 0;
  var reducers = [];

  if (initialReducer) {
    reducers.push(initialReducer);
  }

  function urlQueryMiddleware(_ref) {
    var getState = _ref.getState;

    function replaceReducers(newReducers) {
      if ((0, _isFunction2.default)(newReducers) && !reducers.some(function (reducer) {
        return reducer.name === newReducers.name;
      })) {
        reducers.push(newReducers);
      } else if (Array.isArray(newReducers)) {
        reducers = newReducers;
      }
    }

    injectReducers = replaceReducers;

    return function (next) {
      return function (action) {
        var result = next(action);
        var state = getState();
        if (reducers && reducers.length && state) {
          var reducedReducer = _reduceReducers2.default.apply(undefined, _toConsumableArray(reducers));
          var query = (0, _getParsedQuery2.default)();
          reducedReducer({ state: state, action: action, query: query });
        }
        return result;
      };
    };
  }

  urlQueryMiddleware.replaceReducers = function (newReducers) {
    if (!injectReducers) return;

    injectReducers(newReducers);
  };

  urlQueryMiddleware.addUrlConfig = function (config) {
    injectUrlConfigs(config);
  };

  return urlQueryMiddleware;
}