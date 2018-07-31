// @flow
import * as types from '../actions/types';

export default function failure(state = {}, action) {
  const { type } = action;

  if (type === types.RESET_FAILURE) return {};

  const matches = /(.*)_(FAILURE)/.exec(type);

  if (!matches) return state;

  const message =
    action.err && action.err.message ? action.err.message : 'Unexpected error';

  const [, requestName] = matches;
  return {
    ...state,
    [requestName]: message
  };
}
