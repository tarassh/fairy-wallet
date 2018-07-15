// @flow
import * as types from '../actions/types';

const initialState = {
  tx: null
};

export default function transaction(state = initialState, action) {
  switch (action.type) {
    case types.TRANSFER_TOKEN_SUCCESS: {
      return Object.assign({}, state, {
        tx: action.tx
      });
    }

    case types.BROADCAST_TRANSACTION_FAILURE:
    case types.TRANSFER_TOKEN_REQUEST:
    case types.TRANSFER_TOKEN_FAILURE: {
      return Object.assign({}, state, {
        tx: null
      });
    }

    default: {
      return state;
    }
  }
}