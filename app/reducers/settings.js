import * as types from '../actions/types';

const initialState = {
  accounts: [],
  tokens: {},
  nodes: [],
  explorers: [
    {
      key: 'eosflare.io',
      path: 'https://eosflare.io/tx/'
    },
    {
      key: 'bloks.io',
      path: 'https://bloks.io/transaction/'
    },
    {
      key: 'myeoskit.com',
      path: 'https://www.myeoskit.com/#/tx/'
    }
  ],
  selectedTheme: '',
  exchangeCurrency: ''
};

export default function settings(state = initialState, action) {
  switch (action.type) {
    case types.RESET_SETTINGS: {
      return Object.assign({}, initialState);
    }
    case types.SET_SETTING: {
      return Object.assign({}, state, action.payload);
    }
    case types.ADD_TOKEN: {
      const { account, symbol, contract } = action;
      const { tokens } = state;
      if (!tokens[account]) {
        tokens[account] = [{ symbol, contract }];
      } else if (
        tokens[account].findIndex(
          el => el.symbol === symbol && el.contract === contract
        ) === -1
      ) {
        tokens[account].push({ symbol, contract });
      }
      return Object.assign({}, state, {
        tokens
      });
    }
    case types.REMOVE_TOKEN: {
      const { account, symbol, contract } = action;
      const { tokens } = state;
      if (tokens[account]) {
        const index = tokens[account].findIndex(
          el => el.symbol === symbol && el.contract === contract
        );
        if (index !== -1) {
          tokens[account].splice(index, 1);
        }
      }
      return Object.assign({}, state, {
        tokens
      });
    }
    case types.CREATE_CONNECTION_SUCCESS: {
      const { nodes } = state;
      const { httpEndpoint } = action;
      const { host } = new URL(httpEndpoint);
      const index = nodes.findIndex(element => element.text === httpEndpoint);
      const key = host.slice(0, 10);
      if (index === -1) {
        nodes.splice(0, 0, {
          key,
          value: key,
          text: httpEndpoint,
          accessdate: Date.now()
        });
      } else {
        nodes[index].accessdate = Date.now();
      }
      return Object.assign({}, state, {
        nodes: nodes.slice(0, 10).sort((a, b) => a.accessdate < b.accessdate)
      });
    }

    case types.SET_DEFAULT_EXPLORER: {
      return Object.assign({}, state, {
        explorers: action.explorers
      });
    }

    case types.SET_SELECTED_THEME: {
      return Object.assign({}, state, {
        selectedTheme: action.selectedTheme
      });
    }

    case types.SET_EXCHANGE_CURRENCY: {
      return Object.assign({}, state, {
        exchangeCurrency: action.exchangeCurrency
      });
    }

    default: {
      return state;
    }
  }
}
