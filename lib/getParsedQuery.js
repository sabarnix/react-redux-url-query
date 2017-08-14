'use strict';

exports.__esModule = true;

var _queryString = require('query-string');

var _urlParseConfigs = require('./urlParseConfigs');

var _urlParseConfigs2 = _interopRequireDefault(_urlParseConfigs);

var _urlQueryConfig = require('./urlQueryConfig');

var _urlQueryConfig2 = _interopRequireDefault(_urlQueryConfig);

var _urlQueryDecoder = require('./urlQueryDecoder');

var _urlQueryDecoder2 = _interopRequireDefault(_urlQueryDecoder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUrlObject() {
  var defaultLocation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var location = void 0;
  var decodeQuery = void 0;

  var urlConfigs = _urlParseConfigs2.default.getConfig();

  if (Object.keys(urlConfigs).length) {
    decodeQuery = (0, _urlQueryDecoder2.default)(urlConfigs);
  }

  // check in history
  if (_urlQueryConfig2.default.history.location) {
    location = _urlQueryConfig2.default.history.location;

    // react-router provides it as a prop
  } else if (defaultLocation.location && (defaultLocation.location.query || !defaultLocation.location.search)) {
    location = defaultLocation.location;

    // not found. just use location from window
  } else {
    location = window.location;
  }

  var currentQuery = location.query || (0, _queryString.parse)(location.search) || {};

  var result = void 0;
  // if a url query decoder is provided, decode the query then return that.
  if (decodeQuery) {
    result = decodeQuery(currentQuery);
  } else {
    result = currentQuery;
  }

  return result;
}

exports.default = getUrlObject;