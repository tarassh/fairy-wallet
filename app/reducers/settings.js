import * as types from "../actions/types";

const initialState = {
    acceptedConstitution: false,
    node: '',
    accounts: [],
    walletActive: false
}

export default function settings(state = initialState, action) {
  switch (action.type) {
    case types.RESET_SETTINGS: {
      return Object.assign({}, initialState);
    }
    case types.SET_SETTING: {
      return Object.assign({}, state, action.payload);
    }
    default: {
      return state;
    }
  }
}