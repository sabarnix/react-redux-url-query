import { urlPushAction, UrlQueryParamTypes, encode } from 'react-url-query';

export const CHANGE_BAZ = 'CHANGE_BAZ';
export const CHANGE_FOO = 'CHANGE_FOO';
export const CHANGE_BAR = 'CHANGE_BAR';
export const CHANGE_ARR = 'CHANGE_ARR';
export const CHANGE_MANY = 'CHANGE_MANY';

/**
 * Standard redux action creator
 */
export function changeBaz(baz) {
  return {
    type: CHANGE_BAZ,
    payload: baz,
  };
}

export function changeFoo(foo) {
  return {
    type: CHANGE_FOO,
    payload: foo,
  };
}

export function changeBar(bar) {
  return {
    type: CHANGE_BAR,
    payload: bar,
  };
}

export function changeArr(arr) {
  return {
    type: CHANGE_ARR,
    payload: arr,
  };
}

/**
 * Example of pushing a whole new query. The second argument specifies how to
 * encode the query for the URL
 */
export const changeMany = urlPushAction(CHANGE_MANY,
  newQuery => ({
    fooInUrl: encode(UrlQueryParamTypes.number, newQuery.foo),
    bar: 'par',
    arr: encode(UrlQueryParamTypes.array, ['T', 'Y']),
  }));
