export configureUrlQuery from './configureUrlQuery';

export * as Serialize, { encode, decode } from './serialize';
export {
  replaceInUrlQuery,
  replaceUrlQuery,
  pushInUrlQuery,
  pushUrlQuery,
  multiReplaceInUrlQuery,
  multiPushInUrlQuery,
} from './updateUrlQuery';
export UrlQueryParamTypes from './UrlQueryParamTypes';
export UrlUpdateTypes from './UrlUpdateTypes';

export createUrlQueryMiddleware from './createUrlQueryMiddleware';
export urlParseConfig from './urlParseConfigs';
export getParsedQuery from './getParsedQuery';
