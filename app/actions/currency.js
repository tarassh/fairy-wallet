import _ from 'lodash';
import * as types from './types';
import eos from './helpers/eos';

export function getCurrencyStats(contractName = "eosio.token", symbolName = "EOS") {
  const contract = contractName.toLowerCase();
  const symbol = symbolName.toUpperCase();
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_CURRENCYSTATS_REQUEST
    });
    const { connection } = getState();
    eos(connection).getCurrencyStats(contract, symbol).then((results) => {
      if (_.isEmpty(results)) {
        return dispatch({
          type: types.GET_CURRENCYSTATS_FAILURE,
          contract,
          symbol
        });
      }
      return dispatch({
        type: types.GET_CURRENCYSTATS_SUCCESS,
        contract,
        stats: results,
        symbol
      });
    }).catch((err) => dispatch({
      type: types.GET_CURRENCYSTATS_FAILURE,
      contract,
      err,
      symbol
    }));
  };
}

export default {
  getCurrencyStats
}