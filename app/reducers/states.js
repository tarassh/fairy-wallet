import * as types from '../actions/types';

const initialState = {
    deviceConnected: false,
    nodeConnected: false,
    accountsRetrieved: false,
    accountInfoRetrieved: false 
};

export default function state(state = initialState, action){
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
        case types.CREATE_CONNECTION_PENDING:
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
        case types.GET_ACCOUNTS_REQUEST:
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
    default: {
        return state;
    }
  }
};

