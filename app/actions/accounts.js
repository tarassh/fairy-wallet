// @flow
import _ from 'lodash';
import * as types from './types';
import eos from './helpers/eos';
import { getCurrencyExchangePrice } from './currency';
import * as constants from './constants/constants';

export function getAccounts(publicKey) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_ACCOUNTS_REQUEST
    });

    const { connection } = getState();

    eos(connection)
      .getKeyAccounts(publicKey)
      .then(result =>
        dispatch({
          type: types.GET_ACCOUNTS_SUCCESS,
          accounts: result.account_names
        })
      )
      .catch(err =>
        dispatch({
          type: types.GET_ACCOUNTS_FAILURE,
          err
        })
      );
  };
}

export function setActiveAccount(index) {
  return (dispatch: () => void, getState) => {
    dispatch({ type: types.SET_ACTIVE_ACCOUNT, index });
    const { accounts } = getState();
    return dispatch(getAccount(accounts.names[index]));
  };
}

export function getAccount(name) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_ACCOUNT_REQUEST,
      name
    });
    const { connection } = getState();

    eos(connection)
      .getAccount(name)
      .then(result => {
        dispatch(getCurrencyBalance(name));
        dispatch(getActions(name));
        dispatch(getCurrencyExchangePrice());
        dispatch(getDelegationsFor(name));
        return dispatch({
          type: types.GET_ACCOUNT_SUCCESS,
          account: result
        });
      })
      .catch(err => {
        dispatch({
          type: types.GET_ACCOUNT_FAILURE,
          err
        });
      });
  };
}

export function getActions(name, position = -1, offset = -20) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_ACTIONS_REQUEST
    });

    const { connection, accounts } = getState();
    eos(connection)
      .getActions(name, position, offset)
      .then(result => {
        const { actions } = accounts;

        if (actions === null) {
          return dispatch({
            type: types.GET_ACTIONS_SUCCESS,
            actions: result.actions,
            lastIrreversibleBlock: result.last_irreversible_block
          });
        }

        const history = _.unionBy(
          result.actions,
          actions,
          'account_action_seq'
        );

        return dispatch({
          type: types.GET_ACTIONS_SUCCESS,
          actions: _.sortBy(history, ['account_action_seq']),
          lastIrreversibleBlock: result.last_irreversible_block
        });
      })
      .catch(err => {
        dispatch({
          type: types.GET_ACTIONS_FAILURE,
          err: JSON.parse(err)
        });
      });
  };
}

export function getCurrencyBalance(account) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_CURRENCY_BALANCE_REQUEST
    });

    const { connection, settings } = getState();

    const { tokens } = settings;
    const selectedTokens = tokens[account];
    if (!selectedTokens || selectedTokens.length === 0) {
      return dispatch({
        type: types.GET_CURRENCY_BALANCE_SUCCESS,
        balance: {}
      });
    }

    selectedTokens.forEach(({ symbol, contract }) => {
      eos(connection)
        .getCurrencyBalance(contract, account, symbol)
        .then(values => {
          const balance = { contract, symbol, amount: '0.0000' };
          if (values.length > 0) {
            [balance.amount] = values[0].split(' ');
          }
          return dispatch({
            type: types.GET_CURRENCY_BALANCE_SUCCESS,
            balance
          });
        })
        .catch(err => {
          dispatch({
            type: types.GET_CURRENCY_BALANCE_FAILURE,
            err
          });
        });
    });
  };
}

export function getDelegationsFor(account) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_DELEGATION_REQUEST
    });

    const { connection } = getState();
    eos(connection)
      .getTableRows(true, constants.eos.eosio, account, constants.eos.delband)
      .then(results =>
        dispatch({
          type: types.GET_DELEGATION_SUCCESS,
          account,
          delegates: results.rows
        })
      )
      .catch(err =>
        dispatch({
          type: types.GET_DELEGATION_FAILURE,
          err
        })
      );
  };
}

export function getRefundsFor(account) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_REFUND_REQUEST
    });

    const { connection } = getState();
    eos(connection)
      .getTableRows(true, constants.eos.eosio, account, constants.eos.refunds)
      .then(results =>
        dispatch({
          type: types.GET_REFUND_SUCCESS,
          account,
          refunds: results.rows
        })
      )
      .catch(err =>
        dispatch({
          type: types.GET_REFUND_FAILURE,
          err
        })
      );
  };
}

export default {
  getAccounts,
  getAccount,
  getActions,
  getCurrencyBalance,
  getDelegationsFor
};
