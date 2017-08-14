import { CHANGE_FOO, CHANGE_ARR, CHANGE_BAR } from './actions';
import { encodeArray, encodeObject } from '../../../lib/serialize';
import { replaceInUrlQuery } from '../../../lib';

/**
 * Reducer that handles actions that modify the URL query parameters.
 * In this case, the actions replace a single query parameter at a time.
 */

export default function urlQueryReducer({ state, action }) {
  switch (action.type) {
    case CHANGE_FOO: {
      replaceInUrlQuery('foo', encodeObject(state.foo));
      break;
    }
    case CHANGE_ARR: {
      replaceInUrlQuery('arr', encodeArray(state.arr));
      break;
    }
    case CHANGE_BAR: {
      replaceInUrlQuery('bar', state.bar);
      break;
    }
    default:
      break;
  }
}
