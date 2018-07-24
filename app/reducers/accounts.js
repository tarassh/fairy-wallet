import * as types from '../actions/types';

const initialState = {
  publicKey: null,
  names: null,
  account: null,
  actions: null,
  balances: null,
  activeAccount: 0
};

export default function accounts(state = initialState, action) {
  switch (action.type) {
    case types.GET_ACCOUNTS_SUCCESS: {
      return Object.assign({}, state, {
        names: action.accounts
      });
    }

    case types.GET_ACCOUNTS_FAILURE: {
      return Object.assign({}, state, {
        names: null
      });
    }

    case types.GET_ACCOUNT_SUCCESS: {
      return Object.assign({}, state, {
        account: action.account
      });
    }

    case types.GET_ACCOUNT_FAILURE: {
      return Object.assign({}, state, {
        account: null
      });
    }

    case types.GET_ACTIONS_SUCCESS: {
      return Object.assign({}, state, {
        actions: action.actions
      });
    }

    case types.GET_ACTIONS_FAILURE: {
      return Object.assign({}, state, {
        actions: null
      });
    }

    case types.SET_ACTIVE_ACCOUNT: {
      return Object.assign({}, state, {
        activeAccount: action.index,
        actions: null
      });
    }

    case types.GET_PUBLIC_KEY_SUCCESS: {
      return Object.assign({}, state, {
        publicKey: action.publicKey
      });
    }

    case types.GET_PUBLIC_KEY_FAILURE: {
      return Object.assign({}, state, {
        publicKey: null
      });
    }

    case types.GET_CURRENCY_BALANCE_SUCCESS: {
      return Object.assign({}, state, {
        balances: action.balances
      });
    }

    case types.REMOVE_TOKEN: {
      const { token } = action;
      const { balances } = state;
      if (balances[token]) {
        delete balances[token];
      }
      return Object.assign({}, state, {
        balances
      });
    }

    default: {
      return state;
    }
  }
}
