// @flow
import * as types from './types';
import eos from './helpers/eos';
import serialize from './helpers/ledgerserialize';

const Api = require('./helpers/eosledjer').default;

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
    };

    return eos(modified).transaction('eosio.token', contract => {
      contract.transfer(
        from,
        to,
        asset,
        memo
      );
      
    }).then((tx) => {
      dispatch({
        type: types.TRANSFER_TOKEN_SUCCESS,
        tx
      });
      return tx;
    }).catch((err) => {
      dispatch({
        type: types.TRANSFER_TOKEN_FAILURE,
        err: JSON.parse(err)
      })
    });
  };
}

export function delegate(from, receiver, net, cpu) {
  return (dispatch: () => void, getState) => {
    dispatch({ type: types.DELEGATE_REQUEST });

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
    };

    return eos(modified).transaction('eosio', contract => {
      contract.delegatebw(from, receiver, net, cpu);
    }).then((tx) => dispatch({
        type: types.DELEGATE_SUCCESS,
        tx
      })).catch((err) => {
      dispatch({ 
        type: types.DELEGATE_FAILURE,
        err: JSON.parse(err)
      });
    });
  };
}

export function undelegate(from, receiver, net, cpu) {
  return (dispatch: () => void, getState) => {
    dispatch({ type: types.UNDELEGATE_REQUEST });

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
    };

    return eos(modified).transaction('eosio', contract => {
      contract.undelegatebw(from, receiver, net, cpu);
    }).then((tx) => dispatch({
        type: types.UNDELEGATE_SUCCESS,
        tx
      })).catch((err) => {
      dispatch({ 
        type: types.UNDELEGATE_FAILURE,
        err: JSON.parse(err)
      });
    });
  };
}

export default {
  transfer,
  delegate,
  undelegate
}