import * as types from "../actions/types";

const initialState = {
  node: '',
  accounts: [],
  tokens: []
}

export default function settings(state = initialState, action) {
  switch (action.type) {
    case types.RESET_SETTINGS: {
      return Object.assign({}, initialState);
    }
    case types.SET_SETTING: {
      return Object.assign({}, state, action.payload);
    }
    case types.BALANCE_ADD_TOKEN: {
      return Object.assign({}, state, {
        tokens: state.tokens.concat(action.token)
      });
    }
    default: {
      return state;
    }
  }
}

