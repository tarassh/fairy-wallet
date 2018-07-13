// @flow
import * as types from './types';

import eos from './helpers/eos';
import serialize from './helpers/ledgerserialize';

export function broadcastTransaction(tx) {
  return (dispatch: () => void, getState) => {
    const {
      connection
    } = getState();
    eos(connection).pushTransaction(tx).then((response) => {
        console.log(response);
        return response;
    }).catch((err) => {
        console.log(err);
      });
  };
}

export function transfer(from, to, asset, memo = '') {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.CREATE_TRANSFER_TX_REQUEST
    });
    const {
      connection
    } = getState();

    const modified = {
      ...connection,
      sign: false
    };

    return eos(modified).transaction('eosio.token', contract => {
      contract.transfer(
        from,
        to,
        asset,
        memo
      );
    }, {
      broadcast: connection.broadcast,
      expireInSeconds: 60 * 60,
      sign: connection.sign
    }).then((tx) => {
      const { fc } = eos(modified);
      const buffer = serialize(fc.types.config.chainId, tx.transaction.transaction, fc.types);
      dispatch({
        type: types.CREATE_TRANSFER_TX_SUCCESS,
        tx,
        raw: buffer.toString('hex')
      });
      return tx;
    }).catch((err) => {
      dispatch({
        type: types.CREATE_TRANSFER_TX_FAILURE,
        err
      })
    });
  };
}

export default {
  transfer
}