import * as types from '../actions/types';


const initialState = {
  tokens: []
};

export default function currency(state = initialState, action) {
  switch (action.type) {
    case types.GET_CURRENCYSTATS_SUCCESS: {
      const { tokens } = state;
      const index = tokens.findIndex((item) => item.symbol === action.symbol && item.contract === action.contract );
      if (index === -1) {
        tokens.push({ symbol: action.symbol, contract: action.contract, stats: action.stats });
      } else {
        tokens[index].stats = action.stats;
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