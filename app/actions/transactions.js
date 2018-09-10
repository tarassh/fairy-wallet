// @flow
import * as types from './types';
import eos from './helpers/eos';
import serialize from './helpers/ledgerserialize';

const Api = require('./helpers/eosledjer').default;

const eosioContract = 'eosio';
const buyramAction = 'buyram';
const buyrambytesAction = 'buyrambytes';
const sellramAction = 'sellram';

export function setContext(context) {
  return (dispatch: () => void) => {
    dispatch({ type: types.TRANSACTION_SET_CONTEXT, context})
  };
}

export function resetState() {
  return (dispatch: () => void) => {
    dispatch({ type: types.TRANSACTION_RESET_STATE });
  };
}

export function transfer(
  from,
  to,
  asset,
  memo = '',
  tokenContract = 'eosio.token'
) {
  return (dispatch: () => void, getState) => {
    dispatch({ type: types.TRANSFER_TOKEN_REQUEST });
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

export function delegate(from, receiver, net, cpu) {
  return (dispatch: () => void, getState) => {
    dispatch({ type: types.DELEGATE_REQUEST });

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
    dispatch({ type: types.UNDELEGATE_REQUEST });

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

export function voteProducer(producers = []) {
  return (dispatch: () => void, getState) => {
    const { accounts, connection, ledger } = getState();
    const { account } = accounts;
    const proxy = '';

    dispatch({ type: types.VOTEPRODUCER_REQUEST });

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

export function buyram(recipient, tokens) {
  return (dispatch: () => void, getState) => {
    const { accounts, connection, ledger } = getState();
    const { account } = accounts;

    dispatch({
      type: types.BUYRAM_REQUEST,
      context: {
        contract: eosioContract,
        action: buyramAction,
        buyer: account.account_name,
        recipient,
        tokens
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
        contract.buyram(account.account_name, recipient, tokens);
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

export function sellram(bytes) {
  return (dispatch: () => void, getState) => {
    const { accounts, connection, ledger } = getState();
    const { account } = accounts;

    dispatch({
      type: types.SELLRAM_REQUEST,
      context: {
        contract: eosioContract,
        action: sellramAction,
        receiver: account.account_name,
        bytes
      }
    });

    const signProvider = async ({ transaction }) => {
      const { fc } = eos(connection);
      const buffer = serialize(fc.types.config.chainId, transaction, fc.types);
      dispatch({
        type: types.SELLRAM_CONSTRUCTED,
        constructed: true
      });

      const api = new Api(ledger.transport);
      const result = await api.signTransaction(
        ledger.bip44Path,
        buffer.toString('hex')
      );
      const rawSig = result.v + result.r + result.s;

      dispatch({
        type: types.SELLRAM_SIGNED,
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
        contract.sellram(account.account_name, bytes);
      })
      .then(receipt =>
        dispatch({
          type: types.SELLRAM_SUCCESS,
          receipt
        })
      )
      .catch(err => {
        dispatch({
          type: types.SELLRAM_FAILURE,
          err
        });
      });
  };
}

export function buyrambytes(recipient, bytes) {
  return (dispatch: () => void, getState) => {
    const { accounts, connection, ledger } = getState();
    const { account } = accounts;

    dispatch({
      type: types.BUYRAMBYTES_REQUEST,
      context: {
        contract: eosioContract,
        action: buyrambytesAction,
        buyer: account.account_name,
        recipient,
        bytes
      }
    });

    const signProvider = async ({ transaction }) => {
      const { fc } = eos(connection);
      const buffer = serialize(fc.types.config.chainId, transaction, fc.types);
      dispatch({
        type: types.BUYRAMBYTES_CONSTRUCTED,
        constructed: true
      });

      const api = new Api(ledger.transport);
      const result = await api.signTransaction(
        ledger.bip44Path,
        buffer.toString('hex')
      );
      const rawSig = result.v + result.r + result.s;

      dispatch({
        type: types.BUYRAMBYTES_SIGNED,
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
        contract.buyrambytes(account.account_name, recipient, bytes);
      })
      .then(receipt =>
        dispatch({
          type: types.BUYRAMBYTES_SUCCESS,
          receipt
        })
      )
      .catch(err => {
        dispatch({
          type: types.BUYRAMBYTES_FAILURE,
          err
        });
      });
  };
}

export default {
  setContext,
  resetState,
  transfer,
  delegate,
  undelegate,
  voteProducer,
  buyram,
  buyrambytes,
  sellram
};
