// @flow
import * as types from '../actions/types';

const initialState = {
  bip44Path: "44'/194'/0'/0/0",
  subscriber: null,
  devicePath: null,
  transport: null,
  application: null
};

export default function wallet(state = initialState, action) {
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
        devicePath: action.devicePath
      });
    }

    case types.DEVICE_DISCONNECTED: {
      return Object.assign({}, state, {
        devicePath: null,
        transport: null,
        application: null
      });
    }

    case types.GET_APP_STATS_SUCCESS: {
      return Object.assign({}, state, {
        application: action.application,
        transport: action.transport
      });
    }

    case types.GET_APP_STATS_FAILED: {
      return Object.assign({}, state, {
        application: null,
        transport: null
      });
    }

    default: {
      return state;
    }
  }
}
