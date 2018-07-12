import * as types from "../actions/types";

const initialState = {
  node: '',
  accounts: [],
  tokens: {}
}

export default function settings(state = initialState, action) {
  switch (action.type) {
    case types.RESET_SETTINGS: {
      return Object.assign({}, initialState);
    }
    case types.SET_SETTING: {
      return Object.assign({}, state, action.payload);
    }
    case types.ADD_TOKEN: {
      const { account, token } = action;
      const { tokens } = state;
      if (!tokens[account]) {
        tokens[account] = [token];
      } else if (tokens[account].indexOf(token) === -1) {
        tokens[account].push(token);
      }
      return Object.assign({}, state, {
        tokens
      });
    }
    default: {
      return state;
    }
  }
}


