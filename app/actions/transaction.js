// @flow
import * as types from './types';
import eos from './helpers/eos';
import serialize from './helpers/ledgerserialize';

const Api = require('./helpers/eosledjer').default;

export function broadcastTransaction(tx) {
  return (dispatch: () => void, getState) => {
    dispatch({ type: types.BROADCAST_TRANSACTION_REQUEST });
    const {
      connection
    } = getState();
    eos(connection).pushTransaction(tx.transaction).then((response) => {
        console.log(response);
        dispatch({type: types.BROADCAST_TRANSACTION_SUCCESS});
        return response;
    }).catch((err) => {
        console.log(err);
        dispatch({ type: types.BROADCAST_TRANSACTION_FAILURE,
          err
        });
      });
  };
}

export function transfer(from, to, asset, memo = '') {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.TRANSFER_TOKEN_REQUEST
    });
    const {
      connection,
      ledger
    } = getState();

    const signProvider = async ({transaction}) => {
      const { fc } = eos(connection);
      const buffer = serialize(fc.types.config.chainId, transaction, fc.types);

      const api = new Api(ledger.transport);
      const result = await api.signTransaction(ledger.bip44Path, buffer.toString('hex'));
      const rawSig = result.v + result.r + result.s;
      return rawSig;
    };
    const promiseSigner = (args) => Promise.resolve(signProvider(args));
    

    const modified = {
      ...connection,
      signProvider: promiseSigner
      // sign: false
    };

    return eos(modified).transaction('eosio.token', contract => {
      contract.transfer(
        from,
        to,
        asset,
        memo
      );
    }).then((tx) => {
      const { fc } = eos(modified);
      const buffer = serialize(fc.types.config.chainId, tx.transaction.transaction, fc.types);
      dispatch({
        type: types.TRANSFER_TOKEN_SUCCESS,
        tx,
        raw: buffer.toString('hex')
      });
      return tx;
    }).catch((err) => {
      dispatch({
        type: types.TRANSFER_TOKEN_FAILURE,
        err
      })
    });
  };
}

export default {
  transfer
}