// @flow
import * as types from '../actions/types';

const initialState = {
    isConnected: false,
    device: null,
    publicKey: null
};

export default function ledger(state = initialState, action) {
  switch (action.type) {
    
    case types.DEVICE_CONNECTED: {
      return Object.assign({}, state, {
        isConnected: true,
        device: action.device
      });
    }

    case types.DEVICE_DISCONNECTED: {
      return Object.assign({}, state, {
        isConnected: false,
        device: null,
        publicKey: null
      });
    }

    default: {
      return state;
    }
  }
}