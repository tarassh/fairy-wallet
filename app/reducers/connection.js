import * as types from '../actions/types';


const initialState = {
  httpEndpoint: null,
  sign: false,
  bloadcast: false,
  err: null
};

export default function connection(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_CONNECTION_SUCCESS: {
      return Object.assign({}, state, {
        httpEndpoint: action.httpEndpoint,
        err: null
      });
    }

    case types.CREATE_CONNECTION_FAILURE: {
      return Object.assign({}, state, {
        httpEndpoint: null,
        err: action.err
      });
    }

    default: {
      return state;
    }
  }
}