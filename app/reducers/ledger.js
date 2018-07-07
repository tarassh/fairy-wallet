// @flow
import * as types from '../actions/types';

const initialState = {
    subscriber: null,
    devicePath: null,
    publicKey: null
};

export default function ledger(state = initialState, action) {
  switch (action.type) {

    case types.START_LISTEN_DEVICE_EVENTS: {
      return Object.assign({}, state, {
        subscriber: action.subscriber
      });
    }

    case types.STOP_LISTEN_DEVICE_EVENTS: {
      return Object.assign({}, state, {
        subscriber: null
      });
    }

    case types.DEVICE_CONNECTED: {
      return Object.assign({}, state, {
        devicePath: action.devicePath,
      });
    }

    case types.DEVICE_DISCONNECTED: {
      return Object.assign({}, state, {
        devicePath: null,
        publicKey: null
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

    default: {
      return state;
    }
  }
}