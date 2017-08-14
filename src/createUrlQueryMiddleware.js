import reduceReducers from 'reduce-reducers';
import isFunction from 'lodash/isFunction';
import getParsedQuery from './getParsedQuery';

export default function createUrlQueryMiddleware(initialReducer = null) {
  let injectReducers;
  let injectUrlConfigs;
  let reducers = [];

  if (initialReducer) {
    reducers.push(initialReducer);
  }

  function urlQueryMiddleware({ getState }) {
    function replaceReducers(newReducers) {
      if (isFunction(newReducers) && !reducers.some(reducer => reducer.name === newReducers.name)) {
        reducers.push(newReducers);
      } else if (Array.isArray(newReducers)) {
        reducers = newReducers;
      }
    }

    injectReducers = replaceReducers;

    return next => (action) => {
      const result = next(action);
      const state = getState();
      if (reducers && reducers.length && state) {
        const reducedReducer = reduceReducers(...reducers);
        const query = getParsedQuery();
        reducedReducer({ state, action, query });
      }
      return result;
    };
  }

  urlQueryMiddleware.replaceReducers = (newReducers) => {
    if (!injectReducers) return;

    injectReducers(newReducers);
  };

  urlQueryMiddleware.addUrlConfig = (config) => {
    injectUrlConfigs(config);
  };

  return urlQueryMiddleware;
}
