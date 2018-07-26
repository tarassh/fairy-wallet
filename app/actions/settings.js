// @flow
import * as types from './types';
import { getCurrencyBalance } from './accounts';

export function addToken(account, tokenSymbol, contract='eosio.token') {
  return (dispatch: () => void, getState) => {
    const symbol = tokenSymbol.toUpperCase();
    const { accounts } = getState();

    dispatch({
      type: types.ADD_TOKEN,
      account,
      symbol,
      contract
    });

    if (!accounts.balances[account] || !accounts.balances[account][symbol]) {
      dispatch(getCurrencyBalance(account));
    }
  }
}

export function removeToken(account, tokenSymbol, contract='eosio.token') {
  return (dispatch: () => void) => {
    const symbol = tokenSymbol.toUpperCase();

    dispatch({
      type: types.REMOVE_TOKEN,
      account,
      symbol,
      contract
    });
  }
}

export default {
  addToken,
  removeToken
};