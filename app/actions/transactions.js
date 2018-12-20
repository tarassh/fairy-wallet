// @flow
import * as types from './types';
import eos from './helpers/eos';
import * as constants from './constants/constants';
import serialize from './helpers/ledgerserialize';
import { getPublicKey } from './ledger';

const Api = require('./helpers/eosledger').default;

export function checkAndRun(action, ...args) {
  return (dispatch: () => void) => {
    dispatch(getPublicKey())
      .then(() => action(...args))
      .catch(() => {});
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
  tokenContract = 'eosio.token',
  permission = ''
) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.TRANSFER_TOKEN_REQUEST,
      context: {
        contract: tokenContract,
        action: constants.eos.transfer,
        from,
        to,
        asset,
        memo
      }
    });
    const { connection, wallet, accounts } = getState();
    const withPermission =
      permission === ''
        ? accounts.account.permissions[0].perm_name
        : permission;

    const signProvider = async ({ transaction }) => {
      const { fc } = eos(connection);
      const buffer = serialize(fc.types.config.chainId, transaction, fc.types);
      dispatch({
        type: types.TRANSFER_TOKEN_CONSTRUCTED,
        constructed: true
      });

      const api = new Api(wallet.transport);
      const result = await api.signTransaction(
        wallet.bip44Path,
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
      authorization: `${from}@${withPermission}`,
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

export function delegate(from, receiver, net, cpu, permission = '') {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.DELEGATE_REQUEST,
      context: {
        contract: constants.eos.eosio,
        action: constants.eos.delegate,
        from,
        receiver,
        net,
        cpu
      }
    });

    const { connection, wallet, accounts } = getState();
    const withPermission =
      permission === ''
        ? accounts.account.permissions[0].perm_name
        : permission;

    const signProvider = async ({ transaction }) => {
      const { fc } = eos(connection);
      const buffer = serialize(fc.types.config.chainId, transaction, fc.types);
      dispatch({
        type: types.DELEGATE_CONSTRUCTED,
        constructed: true
      });

      const api = new Api(wallet.transport);
      const result = await api.signTransaction(
        wallet.bip44Path,
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
      signProvider: promiseSigner,
      authorization: `${from}@${withPermission}`
    };

    return eos(modified)
      .transaction(constants.eos.eosio, contract => {
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

export function undelegate(from, receiver, net, cpu, permission = '') {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.UNDELEGATE_REQUEST,
      context: {
        contract: constants.eos.eosio,
        action: constants.eos.undelegate,
        from,
        receiver,
        net,
        cpu
      }
    });

    const { connection, wallet, accounts } = getState();
    const withPermission =
      permission === ''
        ? accounts.account.permissions[0].perm_name
        : permission;

    const signProvider = async ({ transaction }) => {
      const { fc } = eos(connection);
      const buffer = serialize(fc.types.config.chainId, transaction, fc.types);
      dispatch({
        type: types.UNDELEGATE_CONSTRUCTED,
        constructed: true
      });

      const api = new Api(wallet.transport);
      const result = await api.signTransaction(
        wallet.bip44Path,
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
      signProvider: promiseSigner,
      authorization: `${from}@${withPermission}`
    };

    return eos(modified)
      .transaction(constants.eos.eosio, contract => {
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

export function voteProducer(producers = [], permission = '') {
  return (dispatch: () => void, getState) => {
    const { accounts, connection, wallet } = getState();
    const { account } = accounts;
    const proxy = '';

    dispatch({
      type: types.VOTEPRODUCER_REQUEST,
      context: {
        contract: constants.eos.eosio,
        action: constants.eos.voteproducer,
        account: account.account_name,
        producers
      }
    });
    const withPermission =
      permission === ''
        ? accounts.account.permissions[0].perm_name
        : permission;

    const signProvider = async ({ transaction }) => {
      const { fc } = eos(connection);
      const buffer = serialize(fc.types.config.chainId, transaction, fc.types);
      dispatch({
        type: types.VOTEPRODUCER_CONSTRUCTED,
        constructed: true
      });

      const api = new Api(wallet.transport);
      const result = await api.signTransaction(
        wallet.bip44Path,
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
      expireInSeconds: 300,
      authorization: `${account.account_name}@${withPermission}`
    };

    producers.sort();
    return eos(modified)
      .transaction(constants.eos.eosio, contract => {
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

export function buyram(recipient, tokens, permission = '') {
  return (dispatch: () => void, getState) => {
    const { accounts, connection, wallet } = getState();
    const { account } = accounts;

    dispatch({
      type: types.BUYRAM_REQUEST,
      context: {
        contract: constants.eos.eosio,
        action: constants.eos.buyram,
        buyer: account.account_name,
        recipient,
        tokens
      }
    });

    const withPermission =
      permission === ''
        ? accounts.account.permissions[0].perm_name
        : permission;

    const signProvider = async ({ transaction }) => {
      const { fc } = eos(connection);
      const buffer = serialize(fc.types.config.chainId, transaction, fc.types);
      dispatch({
        type: types.BUYRAM_CONSTRUCTED,
        constructed: true
      });

      const api = new Api(wallet.transport);
      const result = await api.signTransaction(
        wallet.bip44Path,
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
      signProvider: promiseSigner,
      authorization: `${account.account_name}@${withPermission}`
    };

    return eos(modified)
      .transaction(constants.eos.eosio, contract => {
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

export function sellram(bytes, permission = '') {
  return (dispatch: () => void, getState) => {
    const { accounts, connection, wallet } = getState();
    const { account } = accounts;

    dispatch({
      type: types.SELLRAM_REQUEST,
      context: {
        contract: constants.eos.eosio,
        action: constants.eos.sellram,
        receiver: account.account_name,
        bytes
      }
    });

    const withPermission =
      permission === ''
        ? accounts.account.permissions[0].perm_name
        : permission;

    const signProvider = async ({ transaction }) => {
      const { fc } = eos(connection);
      const buffer = serialize(fc.types.config.chainId, transaction, fc.types);
      dispatch({
        type: types.SELLRAM_CONSTRUCTED,
        constructed: true
      });

      const api = new Api(wallet.transport);
      const result = await api.signTransaction(
        wallet.bip44Path,
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
      signProvider: promiseSigner,
      authorization: `${account.account_name}@${withPermission}`
    };

    return eos(modified)
      .transaction(constants.eos.eosio, contract => {
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

export function buyrambytes(recipient, bytes, permission = '') {
  return (dispatch: () => void, getState) => {
    const { accounts, connection, wallet } = getState();
    const { account } = accounts;

    dispatch({
      type: types.BUYRAMBYTES_REQUEST,
      context: {
        contract: constants.eos.eosio,
        action: constants.eos.buyrambytes,
        buyer: account.account_name,
        recipient,
        bytes
      }
    });

    const withPermission =
      permission === ''
        ? accounts.account.permissions[0].perm_name
        : permission;

    const signProvider = async ({ transaction }) => {
      const { fc } = eos(connection);
      const buffer = serialize(fc.types.config.chainId, transaction, fc.types);
      dispatch({
        type: types.BUYRAMBYTES_CONSTRUCTED,
        constructed: true
      });

      const api = new Api(wallet.transport);
      const result = await api.signTransaction(
        wallet.bip44Path,
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
      signProvider: promiseSigner,
      authorization: `${account.account_name}@${withPermission}`
    };

    return eos(modified)
      .transaction(constants.eos.eosio, contract => {
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

export function updateauth(permission, parent, auth, authorization = '') {
  return (dispatch: () => void, getState) => {
    const { accounts, connection, wallet } = getState();
    const { account } = accounts;
    dispatch({
      type: types.UPDATE_AUTH_REQUEST,
      context: {
        contract: constants.eos.eosio,
        action: constants.eos.updateauth,
        account: account.account_name,
        permission,
        parent,
        auth
      }
    });

    const withPermission =
      authorization === ''
        ? accounts.account.permissions[0].perm_name
        : authorization;

    const signProvider = async ({ transaction }) => {
      const { fc } = eos(connection);
      const buffer = serialize(fc.types.config.chainId, transaction, fc.types);
      dispatch({
        type: types.UPDATE_AUTH_CONSTRUCTED,
        constructed: true
      });

      const api = new Api(wallet.transport);
      const result = await api.signTransaction(
        wallet.bip44Path,
        buffer.toString('hex')
      );
      const rawSig = result.v + result.r + result.s;

      dispatch({
        type: types.UPDATE_AUTH_SIGNED,
        signed: true
      });
      return rawSig;
    };

    const promiseSigner = args => Promise.resolve(signProvider(args));
    const modified = {
      ...connection,
      signProvider: promiseSigner,
      authorization: `${account.account_name}@${withPermission}`,
      expireInSeconds: 300
    };

    return eos(modified)
      .transaction(constants.eos.eosio, contract => {
        contract.updateauth(account.account_name, permission, parent, auth);
      })
      .then(receipt =>
        dispatch({
          type: types.UPDATE_AUTH_SUCCESS,
          receipt
        })
      )
      .catch(err => {
        dispatch({
          type: types.UPDATE_AUTH_FAILURE,
          err
        });
      });
  };
}

export function deleteauth(permission, authorization = '') {
  return (dispatch: () => void, getState) => {
    const { accounts, connection, wallet } = getState();
    const { account } = accounts;
    dispatch({
      type: types.DELETE_AUTH_REQUEST,
      context: {
        contract: constants.eos.eosio,
        action: constants.eos.deleteauth,
        permission
      }
    });

    const withPermission =
      authorization === ''
        ? accounts.account.permissions[0].perm_name
        : authorization;

    const signProvider = async ({ transaction }) => {
      const { fc } = eos(connection);
      const buffer = serialize(fc.types.config.chainId, transaction, fc.types);
      dispatch({
        type: types.UPDATE_AUTH_CONSTRUCTED,
        constructed: true
      });

      const api = new Api(wallet.transport);
      const result = await api.signTransaction(
        wallet.bip44Path,
        buffer.toString('hex')
      );
      const rawSig = result.v + result.r + result.s;

      dispatch({
        type: types.UPDATE_AUTH_SIGNED,
        signed: true
      });
      return rawSig;
    };

    const promiseSigner = args => Promise.resolve(signProvider(args));
    const modified = {
      ...connection,
      signProvider: promiseSigner,
      authorization: `${account.account_name}@${withPermission}`
    };

    return eos(modified)
      .transaction(constants.eos.eosio, contract => {
        contract.deleteauth(account.account_name, permission);
      })
      .then(receipt =>
        dispatch({
          type: types.UPDATE_AUTH_SUCCESS,
          receipt
        })
      )
      .catch(err => {
        dispatch({
          type: types.UPDATE_AUTH_FAILURE,
          err
        });
      });
  };
}

export function linkauth(code, action, permission, authorization = '') {
  return (dispatch: () => void, getState) => {
    const { accounts, connection, wallet } = getState();
    const { account } = accounts;
    dispatch({
      type: types.LINK_AUTH_REQUEST,
      context: {
        contract: constants.eos.eosio,
        action: constants.eos.linkauth,
        code,
        codeAction: action,
        permission
      }
    });

    const withPermission =
      authorization === ''
        ? accounts.account.permissions[0].perm_name
        : authorization;

    const signProvider = async ({ transaction }) => {
      const { fc } = eos(connection);
      const buffer = serialize(fc.types.config.chainId, transaction, fc.types);
      dispatch({
        type: types.LINK_AUTH_CONSTRUCTED,
        constructed: true
      });

      const api = new Api(wallet.transport);
      const result = await api.signTransaction(
        wallet.bip44Path,
        buffer.toString('hex')
      );
      const rawSig = result.v + result.r + result.s;

      dispatch({
        type: types.LINK_AUTH_SIGNED,
        signed: true
      });
      return rawSig;
    };

    const promiseSigner = args => Promise.resolve(signProvider(args));
    const modified = {
      ...connection,
      signProvider: promiseSigner,
      authorization: `${account.account_name}@${withPermission}`
    };

    return eos(modified)
      .transaction(constants.eos.eosio, contract => {
        contract.linkauth(account.account_name, code, action, permission);
      })
      .then(receipt =>
        dispatch({
          type: types.LINK_AUTH_SUCCESS,
          receipt
        })
      )
      .catch(err => {
        dispatch({
          type: types.LINK_AUTH_FAILURE,
          err
        });
      });
  };
}

export function unlinkauth(code, action, authorization = '') {
  return (dispatch: () => void, getState) => {
    const { accounts, connection, wallet } = getState();
    const { account } = accounts;
    dispatch({
      type: types.UNLINK_AUTH_REQUEST,
      context: {
        contract: constants.eos.eosio,
        action: constants.eos.unlinkauth,
        code,
        codeAction: action
      }
    });

    const withPermission =
      authorization === ''
        ? accounts.account.permissions[0].perm_name
        : authorization;

    const signProvider = async ({ transaction }) => {
      const { fc } = eos(connection);
      const buffer = serialize(fc.types.config.chainId, transaction, fc.types);
      dispatch({
        type: types.UNLINK_AUTH_CONSTRUCTED,
        constructed: true
      });

      const api = new Api(wallet.transport);
      const result = await api.signTransaction(
        wallet.bip44Path,
        buffer.toString('hex')
      );
      const rawSig = result.v + result.r + result.s;

      dispatch({
        type: types.UNLINK_AUTH_SIGNED,
        signed: true
      });
      return rawSig;
    };

    const promiseSigner = args => Promise.resolve(signProvider(args));
    const modified = {
      ...connection,
      signProvider: promiseSigner,
      authorization: `${account.account_name}@${withPermission}`
    };

    return eos(modified)
      .transaction(constants.eos.eosio, contract => {
        contract.unlinkauth(account.account_name, code, action);
      })
      .then(receipt =>
        dispatch({
          type: types.UNLINK_AUTH_SUCCESS,
          receipt
        })
      )
      .catch(err => {
        dispatch({
          type: types.UNLINK_AUTH_FAILURE,
          err
        });
      });
  };
}

export function refund(authorization = '') {
  return (dispatch: () => void, getState) => {
    const { accounts, connection, wallet } = getState();
    const { account } = accounts;
    dispatch({
      type: types.REFUND_REQUEST,
      context: {
        contract: constants.eos.eosio,
        action: constants.eos.refund,
        account: account.account_name
      }
    });

    const withPermission =
      authorization === ''
        ? accounts.account.permissions[0].perm_name
        : authorization;

    const signProvider = async ({ transaction }) => {
      const { fc } = eos(connection);
      const buffer = serialize(fc.types.config.chainId, transaction, fc.types);
      dispatch({
        type: types.REFUND_CONSTRUCTED,
        constructed: true
      });

      const api = new Api(wallet.transport);
      const result = await api.signTransaction(
        wallet.bip44Path,
        buffer.toString('hex')
      );
      const rawSig = result.v + result.r + result.s;

      dispatch({
        type: types.REFUND_SIGNED,
        signed: true
      });
      return rawSig;
    };

    const promiseSigner = args => Promise.resolve(signProvider(args));
    const modified = {
      ...connection,
      signProvider: promiseSigner,
      authorization: `${account.account_name}@${withPermission}`
    };

    return eos(modified)
      .transaction(constants.eos.eosio, contract => {
        contract.refund(account.account_name);
      })
      .then(receipt =>
        dispatch({
          type: types.REFUND_SUCCESS,
          receipt
        })
      )
      .catch(err => {
        dispatch({
          type: types.REFUND_FAILURE,
          err
        });
      });
  };
}

export default {
  resetState,
  transfer,
  delegate,
  undelegate,
  voteProducer,
  buyram,
  buyrambytes,
  sellram,
  updateauth,
  deleteauth,
  linkauth,
  unlinkauth,
  refund,
  checkAndRun
};
