// @flow
import _ from 'lodash';
import * as types from './types';
import eos from './helpers/eos';

export function getAccounts(publicKey) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_ACCOUNTS_REQUEST
    });

    const {
      connection
    } = getState();

    eos(connection).getKeyAccounts(publicKey).then((result) => dispatch({
      type: types.GET_ACCOUNTS_SUCCESS,
      accounts: result.account_names
    })).catch((err) => dispatch({
      type: types.GET_ACCOUNTS_REQUEST,
      err
    }));
  };
}

export function setActiveAccount(index) {
  return (dispatch: () => void) => dispatch({ type: types.SET_ACTIVE_ACCOUNT, index });
}

export function getAccount(name) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_ACCOUNT_REQUEST
    });
    const { connection } = getState();

    eos(connection).getAccount(name).then((result) => {
      dispatch(getCurrencyBalance(name));
      return dispatch({
        type: types.GET_ACCOUNT_SUCCESS,
        account: result
      });
    }).catch((err) => {
      dispatch({
        type: types.GET_ACCOUNT_FAILURE,
        err
      });
    });
  };
}

export function getActions(name) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_ACTIONS_REQUEST
    });

    const { connection } = getState();

    eos(connection).getActions(name).then((result) => dispatch({
      type: types.GET_ACTIONS_SUCCESS,
      actions: result
    })).catch((err) => {
      dispatch({
        type: types.GET_ACTIONS_FAILURE,
        err
      });
    });

  };
}

export function getCurrencyBalance(account) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_CURRENCY_BALANCE_REQUEST
    });

    const {
      connection,
      settings
    } = getState();

    const { tokens } = settings;
    const selectedTokens = tokens[account];
    if (!selectedTokens) {
      return dispatch({ type: types.GET_CURRENCY_BALANCE_SUCCESS, balances: {} });
    }

    const promisses = [];
    selectedTokens.forEach(symbol => {
      promisses.push(eos(connection).getCurrencyBalance('eosio.token', account, symbol))
    });
    Promise.all(promisses).then(
      (values) => {
        const pairs = _.map(_.flatten(values), value => {
          const valueKey = value.split(' ');
          return valueKey.reverse();
        });
        const balancesObject = _.fromPairs(pairs);
        return dispatch({
          type: types.GET_CURRENCY_BALANCE_SUCCESS,
          balances: balancesObject
        });
      }).catch((error) => {
        dispatch({ type: types.GET_CURRENCY_BALANCE_FAILURE, error });
      });
  };
}

export default {
  getAccounts,
  getAccount,
  getActions,
  getCurrencyBalance
}