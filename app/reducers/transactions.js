// @flow
import * as types from '../actions/types';

const initialState = {
  transfer: { context: null, receipt: null, err: null },
  delegate: { context: null, receipt: null, err: null },
  undelegate: { context: null, receipt: null, err: null }
};

export default function transactions(state = initialState, action) {
  switch (action.type) {
    case types.RESET_TRANSACTIONS_STATE: {
      return Object.assign({}, state, {
        transfer: { context: null, receipt: null, err: null },
        delegate: { context: null, receipt: null, err: null },
        undelegate: { context: null, receipt: null, err: null }
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
