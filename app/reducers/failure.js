// @flow
import * as types from '../actions/types';

const initialState = {
  accountRetrievalError: false
}

export default function failure(state = initialState, action) {
  switch (action.type) {

    case types.GET_ACCOUNT_FAILURE: {
      const message = "Connection error!" ;

      return Object.assign({}, state, {
        message,
        accountRetrievalError: true
      });
    }

    case types.RESET_FAILURE:
    case types.GET_ACCOUNT_SUCCESS:
      return Object.assign({}, state, {
        accountRetrievalError: false
      });

    default: {
      return state;
    }
  }
}
