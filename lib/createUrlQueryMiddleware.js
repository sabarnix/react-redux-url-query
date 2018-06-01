'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createUrlQueryMiddleware;

var _pick = require('lodash/pick');

var _pick2 = _interopRequireDefault(_pick);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _updateUrlQuery = require('./updateUrlQuery');

var _UrlUpdateTypes = require('./UrlUpdateTypes');

var _UrlUpdateTypes2 = _interopRequireDefault(_UrlUpdateTypes);

var _urlQueryConfig = require('./urlQueryConfig');

var _urlQueryConfig2 = _interopRequireDefault(_urlQueryConfig);

var _serialize = require('./serialize');

var _getParsedQuery = require('./getParsedQuery');

var _getParsedQuery2 = _interopRequireDefault(_getParsedQuery);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createUrlQueryMiddleware(history) {
  function urlQueryMiddleware(store) {
    var getState = store.getState;

    history.listen(function (location, action) {
      if (action === 'POP' && _urlQueryConfig2.default.store && _urlQueryConfig2.default.store.urlConfigs) {
        var parsedQuery = (0, _getParsedQuery2.default)();
        var urlData = {};
        Object.keys(_urlQueryConfig2.default.store.urlConfigs).forEach(function (configKey) {
          urlData[configKey] = (0, _pick2.default)(parsedQuery, Object.keys(_urlQueryConfig2.default.store.urlConfigs[configKey].urlConfig));
        });
        store.dispatch(_extends({
          type: _constants.INITIALIZE
        }, urlData));
      }
    });

    return function (next) {
      return function (action) {
        var result = next(action);
        var state = getState();

        if (_urlQueryConfig2.default.store && _urlQueryConfig2.default.store.urlConfigs) {
          var urlConfigs = _urlQueryConfig2.default.store.urlConfigs;


          var replace = {};

          Object.keys(urlConfigs).forEach(function (k) {
            var _urlConfigs$k = urlConfigs[k],
                urlConfig = _urlConfigs$k.urlConfig,
                mapStateToUrl = _urlConfigs$k.mapStateToUrl;

            if (mapStateToUrl && urlConfig) {
              Object.keys(urlConfig).forEach(function (urlKey) {
                replace[urlKey] = (0, _serialize.encode)(urlConfig[urlKey], mapStateToUrl(state)[urlKey]);
              });
            }
          });

          (0, _updateUrlQuery.updateUrlQueryMulti)(_UrlUpdateTypes2.default.pushIn, replace, true);
        }
        return result;
      };
    };
  }

  return urlQueryMiddleware;
}