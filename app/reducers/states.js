import * as types from '../actions/types';

const initialState = {
  deviceConnected: false,
  nodeConnected: false,
  accountsRetrieved: false,
  accountsRequested: false,
  accountInfoRetrieved: false,
  displayPublicKey: false
};

export default function states(state = initialState, action) {
  switch (action.type) {
    case types.APP_LEDGER_CONNECTION_STATUS: {
      return Object.assign({}, state, {
        deviceConnected: action.deviceConnected
      });
    }

    case types.DEVICE_CONNECTING:
    case types.DEVICE_DISCONNECTED: {
      return Object.assign({}, state, {
        deviceConnected: false
      });
    }
    case types.CREATE_CONNECTION_SUCCESS: {
      return Object.assign({}, state, {
        nodeConnected: true
      });
    }
    case types.CLEAR_CONNECTION:
    case types.CREATE_CONNECTION_REQUEST:
    case types.CREATE_CONNECTION_FAILURE: {
      return Object.assign({}, state, {
        nodeConnected: false
      });
    }
    case types.GET_ACCOUNTS_SUCCESS: {
      return Object.assign({}, state, {
        accountsRetrieved: true
      });
    }
    case types.GET_ACCOUNTS_REQUEST: {
      return Object.assign({}, state, {
        accountsRequested: true,
        accountsRetrieved: false
      });
    }
    case types.GET_ACCOUNTS_FAILURE: {
      return Object.assign({}, state, {
        accountsRetrieved: false
      });
    }
    case types.GET_ACCOUNT_SUCCESS: {
      return Object.assign({}, state, {
        accountInfoRetrieved: true
      });
    }
    case types.GET_ACCOUNT_REQUEST:
    case types.GET_ACCOUNT_FAILURE: {
      return Object.assign({}, state, {
        accountInfoRetrieved: false
      });
    }
    case types.PUBLIC_KEY_DISPLAY_REQUEST:
    case types.PUBLIC_KEY_DISPLAY_FAILURE: {
      return Object.assign({}, state, {
        displayPublicKey: false
      });
    }
    case types.PUBLIC_KEY_DISPLAY_SUCCESS: {
      return Object.assign({}, state, {
        displayPublicKey: true
      });
    }

    default: {
      return state;
    }
  }
}
