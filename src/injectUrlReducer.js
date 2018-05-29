import React from 'react';
import PropTypes from 'prop-types';
import isObject from 'lodash/isObject';
import hoistNonReactStatics from 'hoist-non-react-statics';
import pick from 'lodash/pick';
import { INITIALIZE } from './constants';
import getParsedQuery from './getParsedQuery';
import urlParseConfigs from './urlParseConfigs';

/**
 * Dynamically injects a urlReducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
export default ({ key, urlConfig = {}, mapStateToUrl = {} }) => (WrappedComponent) => {
  class UrlReducerInjector extends React.Component {
    static WrappedComponent = WrappedComponent;
    static contextTypes = {
      store: PropTypes.object.isRequired,
    };
    static displayName = `withUrlReducer(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;

    componentWillMount() {
      if (!this.context.store) {
        throw new Error('No store found');
      }

      if (!key || !isObject(urlConfig) || !isObject(mapStateToUrl)) {
        throw new Error('Invalid Params Supplied');
      }

      if (!this.context.store.urlConfigs) {
        this.context.store.urlConfigs = {};
      }

      this.context.store.urlConfigs[key] = { urlConfig, mapStateToUrl: state => mapStateToUrl(state, this.props) };
      urlParseConfigs.addConfig(urlConfig);
      const parsedQuery = getParsedQuery();
      this.context.store.dispatch({
        type: INITIALIZE,
        key,
        urlData: pick(parsedQuery, Object.keys(urlConfig)),
      });
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(UrlReducerInjector, WrappedComponent);
};
