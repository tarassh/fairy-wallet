import * as types from "../actions/types";

const initialState = {
  accounts: [],
  tokens: {},
  nodes: []
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
    case types.CREATE_CONNECTION_SUCCESS: {
      const { nodes } = state;
      const { httpEndpoint } = action;
      const { host } = new URL(httpEndpoint);
      const index = nodes.findIndex((element) => element.text === httpEndpoint);
      const key = host.slice(0, 5);
      if (index === -1) {
        nodes.push({ key, value: key, text: httpEndpoint, accessdate: Date.now() });
      } else {
        nodes[index].accessdate = Date.now();
      }
      return Object.assign({}, state, {
        nodes: nodes.slice(0, 5).sort((a, b) => a.accessdate > b.accessdate)
      });
    }
    default: {
      return state;
    }
  }
}


