'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _pick = require('lodash/pick');

var _pick2 = _interopRequireDefault(_pick);

var _constants = require('./constants');

var _getParsedQuery = require('./getParsedQuery');

var _getParsedQuery2 = _interopRequireDefault(_getParsedQuery);

var _urlParseConfigs = require('./urlParseConfigs');

var _urlParseConfigs2 = _interopRequireDefault(_urlParseConfigs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Dynamically injects a urlReducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
exports.default = function (_ref) {
  var key = _ref.key,
      _ref$urlConfig = _ref.urlConfig,
      urlConfig = _ref$urlConfig === undefined ? {} : _ref$urlConfig,
      _ref$mapStateToUrl = _ref.mapStateToUrl,
      _mapStateToUrl = _ref$mapStateToUrl === undefined ? {} : _ref$mapStateToUrl;

  return function (WrappedComponent) {
    var UrlReducerInjector = function (_React$Component) {
      _inherits(UrlReducerInjector, _React$Component);

      function UrlReducerInjector() {
        _classCallCheck(this, UrlReducerInjector);

        return _possibleConstructorReturn(this, (UrlReducerInjector.__proto__ || Object.getPrototypeOf(UrlReducerInjector)).apply(this, arguments));
      }

      _createClass(UrlReducerInjector, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          var _this2 = this;

          if (!this.context.store) {
            throw new Error('No store found');
          }

          if (!key || !(0, _isObject2.default)(urlConfig) || !(0, _isObject2.default)(_mapStateToUrl)) {
            throw new Error('Invalid Params Supplied');
          }

          if (!this.context.store.urlConfigs) {
            this.context.store.urlConfigs = {};
          }

          this.context.store.urlConfigs[key] = { urlConfig: urlConfig, mapStateToUrl: function mapStateToUrl(state) {
              return _mapStateToUrl(state, _this2.props);
            } };
          _urlParseConfigs2.default.addConfig(urlConfig);
          var parsedQuery = (0, _getParsedQuery2.default)();
          this.context.store.dispatch({
            type: _constants.INITIALIZE,
            key: key,
            urlData: (0, _pick2.default)(parsedQuery, Object.keys(urlConfig))
          });
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, this.props);
        }
      }]);

      return UrlReducerInjector;
    }(_react2.default.Component);

    UrlReducerInjector.WrappedComponent = WrappedComponent;
    UrlReducerInjector.contextTypes = {
      store: _propTypes2.default.object.isRequired
    };
    UrlReducerInjector.displayName = 'withUrlReducer(' + (WrappedComponent.displayName || WrappedComponent.name || 'Component') + ')';


    return (0, _hoistNonReactStatics2.default)(UrlReducerInjector, WrappedComponent);
  };
};