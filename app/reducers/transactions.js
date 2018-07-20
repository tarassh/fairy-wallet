// @flow
import * as types from '../actions/types';

const transactionInitialState = {
  context: null,
  receipt: null,
  err: null
};

const initialState = {
  transfer: transactionInitialState,
  delegate: transactionInitialState,
  undelegate: transactionInitialState
};

export default function transactions(state = initialState, action) {
  switch (action.type) {
    case types.RESET_TRANSACTIONS_STATE: {
      const newState = { context: null, receipt: null, err: null };
      return Object.assign({}, state, {
        transfer: newState,
        delegate: newState,
        undelegate: newState
      });
    }

    case types.TRANSFER_TOKEN_SUCCESS: {
      const { transfer } = state;
      transfer.receipt = action.receipt;
      return Object.assign({}, state, {
        transfer
      });
    }

    case types.TRANSFER_TOKEN_REQUEST: {
      const { transfer } = state;
      transfer.context = action.context;
      return Object.assign({}, state, {
        transfer
      });
    }
    case types.TRANSFER_TOKEN_FAILURE: {
      const { transfer } = state;
      transfer.err = action.err;
      return Object.assign({}, state, {
        transfer
      });
    }

    default: {
      return state;
    }
  }
}
