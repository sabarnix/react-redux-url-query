import { CHANGE_BAZ, CHANGE_FOO, CHANGE_ARR, CHANGE_BAR } from './actions';
import { getParsedQuery, UrlQueryParamTypes, urlParseConfig } from '../../../lib';

const urlPropsQueryConfig = {
  arr: { type: UrlQueryParamTypes.array },
  bar: { type: UrlQueryParamTypes.string },
  foo: { type: UrlQueryParamTypes.object },
};

urlParseConfig.addConfig(urlPropsQueryConfig);

const parsedQuery = getParsedQuery();

const initialState = {
  ...parsedQuery,
};

/**
 */
export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_BAZ:
      return {
        ...state,
        baz: action.payload,
      };
    case CHANGE_FOO:
      return {
        ...state,
        foo: action.payload,
      };
    case CHANGE_BAR:
      return {
        ...state,
        bar: action.payload,
      };
    case CHANGE_ARR:
      return {
        ...state,
        arr: action.payload,
      };
    default:
      return state;
  }
}
