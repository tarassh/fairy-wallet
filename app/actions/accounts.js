// @flow
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

    const modified = {
      ...connection,
      sign: false
    };

    eos(modified).getKeyAccounts(publicKey).then((result) => dispatch({
      type: types.GET_ACCOUNTS_SUCCESS,
      accounts: result.account_names
    })).catch((err) => dispatch({
      type: types.GET_ACCOUNTS_REQUEST,
      err
    }));
  };
}

export function getAccount(name) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_ACCOUNT_REQUEST
    });
    const { connection } = getState();

    const modified = {
      ...connection,
      sign: false
    };

    eos(modified).getAccount(name).then((result) => {
      dispatch({
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

// history 
export function getActions(name) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_ACTIONS_REQUEST
    });

    const { connection } = getState();

    const modified = {
      ...connection,
      sign: false
    };

    eos(modified).getActions(name).then((result) => {
      dispatch({
        type: types.GET_ACTIONS_SUCCESS,
        actions: result
      });
    }).catch((err) => {
      dispatch({
        type: types.GET_ACTIONS_FAILURE,
        err
      });
    });

  };
}

export default {
    getAccounts,
    getAccount,
    getActions
}