import _ from 'lodash';
import * as types from './types';
import eos from './helpers/eos';

const https = require('https');

export function getCurrencyStats(
  contractName = 'eosio.token',
  symbolName = 'EOS'
) {
  const contract = contractName.toLowerCase();
  const symbol = symbolName.toUpperCase();
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_CURRENCYSTATS_REQUEST
    });
    const { connection } = getState();
    eos(connection)
      .getCurrencyStats(contract, symbol)
      .then(results => {
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
      })
      .catch(err =>
        dispatch({
          type: types.GET_CURRENCYSTATS_FAILURE,
          contract,
          err,
          symbol
        })
      );
  };
}

export function getCurrencyExchangePrice(
  from = 'EOS',
  to = 'USD',
  exchange = 'Bitfinex'
) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.GET_CURRENCY_EXCHANGE_PRICE_REQUEST
    });
    const crytoAsset = from.toUpperCase();
    const currency = to.toUpperCase();

    const symbols = {
      USD: '$',
      EUR: '€',
      GBP: '£'
    };

    const urlStr = `https://min-api.cryptocompare.com/data/price?fsym=${crytoAsset}&tsyms=${currency}&e=${exchange}`;

    https
      .get(urlStr, resp => {
        let data = '';

        resp.on('data', chunk => {
          data += chunk;
        });

        resp.on('end', () => {
          const result = JSON.parse(data);
          dispatch({
            type: types.GET_CURRENCY_EXCHANGE_PRICE_SUCCESS,
            from: crytoAsset,
            to: currency,
            exchange,
            value: result[currency],
            symbol: symbols[currency]
          });
        });
      })
      .on('error', err => {
        console.log(`Error: ${err.message}`);
      });
  };
}

export default {
  getCurrencyStats,
  getCurrencyExchangePrice
};
