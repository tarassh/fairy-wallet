// @flow
import * as types from './types';
import eos from './helpers/eos';
import serialize from './helpers/ledgerserialize';
import { numberToAsset } from '../utils/asset';

const Api = require('./helpers/eosledjer').default;

const eosioContract = 'eosio';
const transferAction = 'transfer';
const delegateAction = 'delegatebw';
const undelegateAction = 'undelegatebw';
const voteProducerAction = 'voteproducer';
const buyramAction = 'buyram';

export function transfer(
  from,
  to,
  asset,
  memo = '',
  tokenContract = 'eosio.token'
) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.TRANSFER_TOKEN_REQUEST,
      context: {
        contract: tokenContract,
        action: transferAction,
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
      dispatch({
        type: types.TRANSFER_TOKEN_CONSTRUCTED,
        constructed: true
      });

      const api = new Api(ledger.transport);
      const result = await api.signTransaction(
        ledger.bip44Path,
        buffer.toString('hex')
      );
      const rawSig = result.v + result.r + result.s;

      dispatch({
        type: types.TRANSFER_TOKEN_SIGNED,
        signed: true
      });
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
        action: delegateAction,
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
      dispatch({
        type: types.DELEGATE_CONSTRUCTED,
        constructed: true
      });

      const api = new Api(ledger.transport);
      const result = await api.signTransaction(
        ledger.bip44Path,
        buffer.toString('hex')
      );
      const rawSig = result.v + result.r + result.s;

      dispatch({
        type: types.DELEGATE_SIGNED,
        signed: true
      });
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
        action: undelegateAction,
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
      dispatch({
        type: types.UNDELEGATE_CONSTRUCTED,
        constructed: true
      });

      const api = new Api(ledger.transport);
      const result = await api.signTransaction(
        ledger.bip44Path,
        buffer.toString('hex')
      );
      const rawSig = result.v + result.r + result.s;

      dispatch({
        type: types.UNDELEGATE_SIGNED,
        signed: true
      });
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
    const zero = numberToAsset(0);

    const { connection, ledger } = getState();

    const signProvider = async ({ transaction }) => {
      const { fc } = eos(connection);
      const buffer = serialize(fc.types.config.chainId, transaction, fc.types);
      const [action] = transaction.actions;
      const type =
        action.name === delegateAction
          ? types.DELEGATE_CONSTRUCTED
          : types.UNDELEGATE_CONSTRUCTED;
      dispatch({
        type,
        constructed: true
      });

      const api = new Api(ledger.transport);
      const result = await api.signTransaction(
        ledger.bip44Path,
        buffer.toString('hex')
      );
      const rawSig = result.v + result.r + result.s;

      dispatch({
        type:
          action.name === delegateAction
            ? types.DELEGATE_SIGNED
            : types.UNDELEGATE_SIGNED,
        signed: true
      });
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
          action: delegateAction,
          from,
          receiver,
          net,
          cpu: zero
        },
        undelegateContext: {
          contract: eosioContract,
          action: undelegateAction,
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
        action: delegateAction,
        from,
        receiver,
        net: zero,
        cpu
      },
      undelegateContext: {
        contract: eosioContract,
        action: undelegateAction,
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

export function voteProducer(producers = []) {
  return (dispatch: () => void, getState) => {
    const { accounts, connection, ledger } = getState();
    const { account } = accounts;
    const proxy = '';

    dispatch({
      type: types.VOTEPRODUCER_REQUEST,
      context: {
        contract: eosioContract,
        action: voteProducerAction,
        account: account.account_name,
        producers
      }
    });

    const signProvider = async ({ transaction }) => {
      const { fc } = eos(connection);
      const buffer = serialize(fc.types.config.chainId, transaction, fc.types);
      dispatch({
        type: types.VOTEPRODUCER_CONSTRUCTED,
        constructed: true
      });

      const api = new Api(ledger.transport);
      const result = await api.signTransaction(
        ledger.bip44Path,
        buffer.toString('hex')
      );
      const rawSig = result.v + result.r + result.s;

      dispatch({
        type: types.VOTEPRODUCER_SIGNED,
        signed: true
      });
      return rawSig;
    };
    const promiseSigner = args => Promise.resolve(signProvider(args));

    const modified = {
      ...connection,
      signProvider: promiseSigner,
      expireInSeconds: 300
    };

    producers.sort();
    return eos(modified)
      .transaction(eosioContract, contract => {
        contract.voteproducer(account.account_name, proxy, producers);
      })
      .then(receipt =>
        dispatch({
          type: types.VOTEPRODUCER_SUCCESS,
          receipt
        })
      )
      .catch(err => {
        dispatch({
          type: types.VOTEPRODUCER_FAILURE,
          err
        });
      });
  };
}

export function buyram(amount) {
  return (dispatch: () => void, getState) => {
    const { accounts, connection, ledger } = getState();
    const { account } = accounts;

    dispatch({
      type: types.BUYRAM_REQUEST,
      context: {
        contract: eosioContract,
        action: buyramAction,
        buyer: account.account_name,
        receiver: account.account_name,
        tokens: amount
      }
    });

    const signProvider = async ({ transaction }) => {
      const { fc } = eos(connection);
      const buffer = serialize(fc.types.config.chainId, transaction, fc.types);
      dispatch({
        type: types.BUYRAM_CONSTRUCTED,
        constructed: true
      });

      const api = new Api(ledger.transport);
      const result = await api.signTransaction(
        ledger.bip44Path,
        buffer.toString('hex')
      );
      const rawSig = result.v + result.r + result.s;

      dispatch({
        type: types.BUYRAM_SIGNED,
        signed: true
      });
      return rawSig;
    };

    const promiseSigner = args => Promise.resolve(signProvider(args));

    const modified = {
      ...connection,
      signProvider: promiseSigner
    };

    return eos(modified)
      .transaction(eosioContract, contract => {
        contract.buyram(account.account_name, account.account_name, amount);
      })
      .then(receipt =>
        dispatch({
          type: types.BUYRAM_SUCCESS,
          receipt
        })
      )
      .catch(err => {
        dispatch({
          type: types.BUYRAM_FAILURE,
          err
        });
      });
  };
}

export default {
  transfer,
  delegate,
  undelegate,
  voteProducer,
  buyram
};
