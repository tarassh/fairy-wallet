// @flow
import * as types from './types';
import { getCurrencyBalance } from './accounts';

export function addToken(account, tokenName) {
  return (dispatch: () => void, getState) => {
    if (!tokenName) return;
    const token = tokenName.toUpperCase();
    const { accounts } = getState();

    dispatch({
      type: types.ADD_TOKEN,
      account,
      token
    });

    if (!accounts.balances[account] || !accounts.balances[account][token]) {
      dispatch(getCurrencyBalance(account));
    }
  }
}

export function removeToken(account, tokenName) {
  return (dispatch: () => void) => {
    if (!tokenName) return;
    const token = tokenName.toUpperCase();

    dispatch({
      type: types.REMOVE_TOKEN,
      account,
      token
    });
  }
}

export default {
  addToken,
  removeToken
};