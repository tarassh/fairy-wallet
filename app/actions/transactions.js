// @flow
import * as types from './types';
import eos from './helpers/eos';
import serialize from './helpers/ledgerserialize';

const Api = require('./helpers/eosledjer').default;

const tokenContract = 'eosio.token';
const eosioContract = 'eosio';

export function transfer(from, to, asset, memo = '') {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.TRANSFER_TOKEN_REQUEST,
      context: {
        contract: tokenContract,
        action: 'transfer',
        from,
        to,
        asset,
        memo
      }
    });
    const { connection, ledger } = getState();

    const signProvider = async ({ transaction }) => {
      const { fc } = eos(connection);
      const buffer = serialize(fc.types.config.chainId, transaction, fc.types);

      const api = new Api(ledger.transport);
      const result = await api.signTransaction(
        ledger.bip44Path,
        buffer.toString('hex')
      );
      const rawSig = result.v + result.r + result.s;
      return rawSig;
    };
    const promiseSigner = args => Promise.resolve(signProvider(args));

    const modified = {
      ...connection,
      signProvider: promiseSigner
    };

    return eos(modified)
      .transaction(tokenContract, contract => {
        contract.transfer(from, to, asset, memo);
      })
      .then(receipt => {
        dispatch({
          type: types.TRANSFER_TOKEN_SUCCESS,
          receipt
        });
        return receipt;
      })
      .catch(err => {
        dispatch({
          type: types.TRANSFER_TOKEN_FAILURE,
          err
        });
      });
  };
}

export function resetState() {
  return (dispatch: () => void) => {
    dispatch({ type: types.RESET_TRANSACTIONS_STATE });
  };
}

export function delegate(from, receiver, net, cpu) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.DELEGATE_REQUEST,
      context: {
        contract: eosioContract,
        action: 'delegatebw',
        from,
        receiver,
        net,
        cpu
      }
    });

    const { connection, ledger } = getState();

    const signProvider = async ({ transaction }) => {
      const { fc } = eos(connection);
      const buffer = serialize(fc.types.config.chainId, transaction, fc.types);

      const api = new Api(ledger.transport);
      const result = await api.signTransaction(
        ledger.bip44Path,
        buffer.toString('hex')
      );
      const rawSig = result.v + result.r + result.s;
      return rawSig;
    };
    const promiseSigner = args => Promise.resolve(signProvider(args));

    const modified = {
      ...connection,
      signProvider: promiseSigner
    };

    return eos(modified)
      .transaction(eosioContract, contract => {
        contract.delegatebw(from, receiver, net, cpu, 0);
      })
      .then(receipt =>
        dispatch({
          type: types.DELEGATE_SUCCESS,
          receipt
        })
      )
      .catch(err => {
        dispatch({
          type: types.DELEGATE_FAILURE,
          err
        });
      });
  };
}

export function undelegate(from, receiver, net, cpu) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.UNDELEGATE_REQUEST,
      context: {
        contract: eosioContract,
        action: 'undelegatebw',
        from,
        receiver,
        net,
        cpu
      }
    });

    const { connection, ledger } = getState();

    const signProvider = async ({ transaction }) => {
      const { fc } = eos(connection);
      const buffer = serialize(fc.types.config.chainId, transaction, fc.types);

      const api = new Api(ledger.transport);
      const result = await api.signTransaction(
        ledger.bip44Path,
        buffer.toString('hex')
      );
      const rawSig = result.v + result.r + result.s;
      return rawSig;
    };
    const promiseSigner = args => Promise.resolve(signProvider(args));

    const modified = {
      ...connection,
      signProvider: promiseSigner
    };

    return eos(modified)
      .transaction(eosioContract, contract => {
        contract.undelegatebw(from, receiver, net, cpu);
      })
      .then(receipt =>
        dispatch({
          type: types.UNDELEGATE_SUCCESS,
          receipt
        })
      )
      .catch(err => {
        dispatch({
          type: types.UNDELEGATE_FAILURE,
          err
        });
      });
  };
}

export function delegateUndelegate(netFist, from, receiver, net, cpu) {
  return (dispatch: () => void, getState) => {
    const zero = `${parseFloat(0).toFixed(4)} EOS`;

    const { connection, ledger } = getState();

    const signProvider = async ({ transaction }) => {
      const { fc } = eos(connection);
      const buffer = serialize(fc.types.config.chainId, transaction, fc.types);

      const api = new Api(ledger.transport);
      const result = await api.signTransaction(
        ledger.bip44Path,
        buffer.toString('hex')
      );
      const rawSig = result.v + result.r + result.s;
      return rawSig;
    };
    const promiseSigner = args => Promise.resolve(signProvider(args));

    const modified = {
      ...connection,
      signProvider: promiseSigner
    };

    if (netFist) {
      dispatch({
        type: types.DELEGATE_UNDELEGATE_REQUEST,
        delegateContext: {
          contract: eosioContract,
          action: 'delegatebw',
          from,
          receiver,
          net,
          cpu: zero
        },
        undelegateContext: {
          contract: eosioContract,
          action: 'undelegatebw',
          from,
          receiver,
          net: zero,
          cpu
        }
      });

      return eos(modified)
        .transaction(eosioContract, contract => {
          contract.delegatebw(from, receiver, net, zero, 0);
        })
        .then(delegateReceipt => {
          dispatch({ type: types.DELEGATE_SUCCESS, receipt: delegateReceipt });
          return eos(modified)
            .transaction(eosioContract, contract => {
              contract.undelegatebw(from, receiver, zero, cpu);
            })
            .then(undelegateReceipt => {
              dispatch({
                type: types.UNDELEGATE_SUCCESS,
                receipt: undelegateReceipt
              });
              return dispatch({ type: types.DELEGATE_UNDELEGATE_SUCCESS });
            })
            .catch(err => {
              dispatch({ type: types.UNDELEGATE_FAILURE, err });
              dispatch({ type: types.DELEGATE_UNDELEGATE_FAILURE });
            });
        })
        .catch(err => {
          dispatch({ type: types.DELEGATE_FAILURE, err });
          dispatch({ type: types.DELEGATE_UNDELEGATE_FAILURE });
        });
    }
    dispatch({
      type: types.DELEGATE_UNDELEGATE_REQUEST,
      delegateContext: {
        contract: eosioContract,
        action: 'delegatebw',
        from,
        receiver,
        net: zero,
        cpu
      },
      undelegateContext: {
        contract: eosioContract,
        action: 'undelegatebw',
        from,
        receiver,
        net,
        cpu: zero
      }
    });

    return eos(modified)
      .transaction(eosioContract, contract => {
        contract.delegatebw(from, receiver, zero, cpu, 0);
      })
      .then(delegateReceipt => {
        dispatch({ type: types.DELEGATE_SUCCESS, receipt: delegateReceipt });
        return eos(modified)
          .transaction(eosioContract, contract => {
            contract.undelegatebw(from, receiver, net, zero);
          })
          .then(undelegateReceipt => {
            dispatch({
              type: types.UNDELEGATE_SUCCESS,
              receipt: undelegateReceipt
            });
            return dispatch({ type: types.DELEGATE_UNDELEGATE_SUCCESS });
          })
          .catch(err => {
            dispatch({ type: types.UNDELEGATE_FAILURE, err });
            dispatch({ type: types.DELEGATE_UNDELEGATE_FAILURE });
          });
      })
      .catch(err => {
        dispatch({ type: types.DELEGATE_FAILURE, err });
        dispatch({ type: types.DELEGATE_UNDELEGATE_FAILURE });
      });
  };
}

export default {
  transfer,
  delegate,
  undelegate
};
