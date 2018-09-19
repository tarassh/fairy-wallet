import * as types from '../actions/types';

const initialState = {
  tokens: [],
  exchangePairs: []
};

export default function currency(state = initialState, action) {
  switch (action.type) {
    case types.GET_CURRENCYSTATS_SUCCESS: {
      const { tokens } = state;
      const index = tokens.findIndex(
        item =>
          item.symbol === action.symbol && item.contract === action.contract
      );
      if (index === -1) {
        tokens.push({
          symbol: action.symbol,
          contract: action.contract,
          stats: action.stats
        });
      } else {
        tokens[index].stats = action.stats;
      }

      return Object.assign({}, state, {
        tokens
      });
    }

    case types.GET_CURRENCY_EXCHANGE_PRICE_SUCCESS: {
      const { exchangePairs } = state;
      const { from, to, exchange, value, symbol } = action;
      const index = exchangePairs.findIndex(
        el => el.from === from && el.to === to && el.exchange === exchange
      );
      if (index === -1) {
        exchangePairs.push({ from, to, exchange, value, symbol });
      } else {
        exchangePairs[index].value = value;
      }
      return Object.assign({}, state, {
        exchangePairs
      });
    }

    default: {
      return state;
    }
  }
}
