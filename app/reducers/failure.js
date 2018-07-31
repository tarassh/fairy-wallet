// @flow
import * as types from '../actions/types';

export default function failure(state = {}, action) {
  const { type } = action;

  if (type === types.RESET_FAILURE) return {};

  const matches = /(.*)_(FAILURE)/.exec(type);

  if (
    !matches ||
    type === types.GET_APP_STATS_FAILURE ||
    type === types.PUBLIC_KEY_DISPLAY_FAILURE ||
    type === types.TRANSFER_TOKEN_FAILURE ||
    type === types.DELEGATE_FAILURE ||
    type === types.UNDELEGATE_FAILURE
  )
    return state;

  const message =
    action.err && action.err.message ? action.err.message : 'Unexpected error';

  const [, requestName] = matches;
  return {
    ...state,
    [requestName]: message
  };
}
