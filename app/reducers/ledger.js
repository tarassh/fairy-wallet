// @flow
import * as types from '../actions/types';

const initialState = {
    ledger: {}
};

export default function ledger(state = initialState, action) {
  switch (action.type) {
    
    case types.DEVICE_CONNECTED: {
      return Object.assign({}, state, {
        device: action.device
      });
    }

    case types.DEVICE_DISCONNECTED: {
      return Object.assign({}, state, {
        device: {}
      });
    }

    default: {
      return state;
    }
  }
}