import * as types from '../actions/types';


const initialState = {
  names: null,
  account: null,
  actions: null
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

    default: {
      return state;
    }
  }
}