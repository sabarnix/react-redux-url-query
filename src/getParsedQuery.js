import { parse as parseQueryString } from 'query-string';
import urlParseConfigs from './urlParseConfigs';
import urlQueryConfig from './urlQueryConfig';
import urlQueryDecoder from './urlQueryDecoder';

function getUrlObject(defaultLocation = {}) {
  let location;
  let decodeQuery;

  const urlConfigs = urlParseConfigs.getConfig();

  if (Object.keys(urlConfigs).length) {
    decodeQuery = urlQueryDecoder(urlConfigs);
  }


  // check in history
  if (urlQueryConfig.history.location) {
    location = urlQueryConfig.history.location;

    // react-router provides it as a prop
  } else if (defaultLocation.location &&
    (defaultLocation.location.query || !defaultLocation.location.search)) {
    location = defaultLocation.location;

    // not found. just use location from window
  } else {
    location = window.location;
  }

  const currentQuery = location.query || parseQueryString(location.search) || {};

  let result;
  // if a url query decoder is provided, decode the query then return that.
  if (decodeQuery) {
    result = decodeQuery(currentQuery);
  } else {
    result = currentQuery;
  }


  return result;
}

export default getUrlObject;
