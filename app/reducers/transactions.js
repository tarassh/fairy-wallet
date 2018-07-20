// @flow
import * as types from '../actions/types';

const initialState = {
  tx: null,
  err: null
};

export default function transaction(state = initialState, action) {
  switch (action.type) {
    case types.TRANSFER_TOKEN_SUCCESS: {
      return Object.assign({}, state, {
        tx: action.tx
      });
    }

    case types.TRANSFER_TOKEN_REQUEST: {
      return Object.assign({}, state, {
        tx: null,
        err: null
      });
    }
    case types.TRANSFER_TOKEN_FAILURE: {
      return Object.assign({}, state, {
        err: action.err
      });
    }

    default: {
      return state;
    }
  }
}
