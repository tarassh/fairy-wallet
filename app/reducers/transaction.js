// @flow
import * as types from '../actions/types';

const { Signature } = require('eosjs-ecc');

const initialState = {
  tx: null,
  raw: null
};

export default function transaction(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_TRANSFER_TX_SUCCESS: {
      return Object.assign({}, state, {
        tx: action.tx,
        raw: action.raw
      });
    }

    case types.CREATE_TRANSFER_TX_REQUEST:
    case types.CREATE_TRANSFER_TX_FAILURE: {
      return Object.assign({}, state, {
        tx: null,
        raw: null
      });
    }

    case types.SIGN_TRANSACTION_SUCCESS: {
      const signature = Signature.from(action.rawSignature);
      const { tx } = state;
      tx.transaction.signatures.push(signature.toString());
      return Object.assign({}, state, {
        tx
      });
    }

    default: {
      return state;
    }
  }
}