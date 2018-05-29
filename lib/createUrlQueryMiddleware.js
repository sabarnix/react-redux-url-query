'use strict';

exports.__esModule = true;
exports.default = createUrlQueryMiddleware;

var _updateUrlQuery = require('./updateUrlQuery');

var _UrlUpdateTypes = require('./UrlUpdateTypes');

var _UrlUpdateTypes2 = _interopRequireDefault(_UrlUpdateTypes);

var _urlQueryConfig = require('./urlQueryConfig');

var _urlQueryConfig2 = _interopRequireDefault(_urlQueryConfig);

var _serialize = require('./serialize');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createUrlQueryMiddleware() {
  function urlQueryMiddleware(store) {
    var getState = store.getState;


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

          (0, _updateUrlQuery.updateUrlQueryMulti)(_UrlUpdateTypes2.default.pushIn, replace);
        }
        return result;
      };
    };
  }

  return urlQueryMiddleware;
}