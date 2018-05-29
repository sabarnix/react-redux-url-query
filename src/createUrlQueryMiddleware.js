import pick from 'lodash/pick';
import isEqual from 'lodash/isEqual';
import { updateUrlQueryMulti } from './updateUrlQuery';
import UrlUpdateTypes from './UrlUpdateTypes';
import urlQueryConfig from './urlQueryConfig';
import { encode } from './serialize';
import getParsedQuery from './getParsedQuery';
import { INITIALIZE } from './constants';

const urlHistory = {};

export default function createUrlQueryMiddleware(history) {
  function urlQueryMiddleware(store) {
    const { getState } = store;
    history.listen((location, action) => {
      if (action === 'POP' && urlQueryConfig.store && urlQueryConfig.store.urlConfigs) {
        const parsedQuery = getParsedQuery();
        Object.keys(urlQueryConfig.store.urlConfigs).forEach((configKey) => {
          const urlData = pick(parsedQuery, Object.keys(urlQueryConfig.store.urlConfigs[configKey].urlConfig));
          if (!isEqual(urlData, urlHistory[configKey])) {
            store.dispatch({
              type: INITIALIZE,
              key: configKey,
              urlData,
            });
          }
          urlHistory[configKey] = urlData;
        });
      }
    });

    return next => (action) => {
      const result = next(action);
      const state = getState();

      if (urlQueryConfig.store && urlQueryConfig.store.urlConfigs) {
        const { urlConfigs } = urlQueryConfig.store;

        const replace = {};

        Object.keys(urlConfigs).forEach((k) => {
          const { urlConfig, mapStateToUrl } = urlConfigs[k];
          if (mapStateToUrl && urlConfig) {
            Object.keys(urlConfig).forEach((urlKey) => {
              replace[urlKey] = encode(urlConfig[urlKey], mapStateToUrl(state)[urlKey]);
            });
          }
        });

        updateUrlQueryMulti(UrlUpdateTypes.pushIn, replace, true);
      }
      return result;
    };
  }

  return urlQueryMiddleware;
}
