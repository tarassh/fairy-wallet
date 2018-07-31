import * as types from '../actions/types';

const initialState = {
  httpEndpoint: null,
  chainId: '',
  err: null,
  expireInSeconds: 90
};

export default function connection(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_CONNECTION_SUCCESS: {
      return Object.assign({}, state, {
        httpEndpoint: action.httpEndpoint,
        chainId: action.chainId,
        err: null
      });
    }

    case types.CLEAR_CONNECTION:
    case types.CREATE_CONNECTION_FAILURE: {
      return Object.assign({}, state, {
        httpEndpoint: null,
        chainId: '',
        err: action.err
      });
    }

    case types.CREATE_CONNECTION_REQUEST: {
      return Object.assign({}, state, {
        err: null
      });
    }

    default: {
      return state;
    }
  }
}
