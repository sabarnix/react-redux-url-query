import { updateUrlQueryMulti } from './updateUrlQuery';
import UrlUpdateTypes from './UrlUpdateTypes';
import urlQueryConfig from './urlQueryConfig';
import { encode } from './serialize';

export default function createUrlQueryMiddleware() {
  function urlQueryMiddleware(store) {
    const { getState } = store;

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

        updateUrlQueryMulti(UrlUpdateTypes.pushIn, replace);
      }
      return result;
    };
  }

  return urlQueryMiddleware;
}
