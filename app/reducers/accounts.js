import * as types from '../actions/types';

const initialState = {
  publicKey: null,
  names: null,
  account: null,
  actions: null,
  balances: [],
  activeAccount: 0,
  lastIrreversibleBlock: 0,
  delegates: [],
  refunds: [],
  delegatee: undefined,
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
      let block = state.lastIrreversibleBlock;
      if (action.lastIrreversibleBlock) {
        block = action.lastIrreversibleBlock;
      }
      return Object.assign({}, state, {
        actions: action.actions,
        lastIrreversibleBlock: block
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
        actions: null,
        balances: []
      });
    }

    case types.SET_ACTIVE_DELEGATE_ACCOUNT: {
      return Object.assign({}, state, {
        delegatee: action.delegatee,
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
      const { amount, symbol, contract } = action.balance;
      const { balances } = state;
      if (!amount || !symbol || !contract) {
        return Object.assign({}, state, {
          balances
        });
      }

      const index = balances.findIndex(
        el => el.contract === contract && el.symbol === symbol
      );
      if (index === -1) {
        balances.push({ amount, symbol, contract });
      } else {
        balances[index].amount = amount;
      }
      return Object.assign({}, state, {
        balances
      });
    }

    case types.REMOVE_TOKEN: {
      const { symbol, contract } = action;
      const { balances } = state;
      const index = balances.findIndex(
        el => el.contract === contract && el.symbol === symbol
      );
      if (index !== -1) {
        balances.splice(index, 1);
      }
      return Object.assign({}, state, {
        balances
      });
    }

    case types.GET_DELEGATION_SUCCESS: {
      return Object.assign({}, state, {
        delegates: action.delegates
      });
    }

    case types.GET_DELEGATION_FAILURE: {
      return Object.assign({}, state, {
        delegates: null
      });
    }

    case types.GET_REFUND_SUCCESS: {
      return Object.assign({}, state, {
        refunds: action.refunds
      });
    }

    case types.GET_REFUND_FAILURE: {
      return Object.assign({}, state, {
        refunds: null
      });
    }

    default: {
      return state;
    }
  }
}
