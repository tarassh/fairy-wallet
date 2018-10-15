// @flow
import * as types from '../actions/types';

const initialState = {
  context: null,
  receipt: null,
  err: null,
  contructed: false,
  signed: false
};

export default function transaction(state = initialState, action) {
  switch (action.type) {
    case types.TRANSACTION_RESET_STATE: {
      return Object.assign({}, state, {
        context: null,
        receipt: null,
        err: null,
        contructed: false,
        signed: false
      });
    }

    case types.LINK_AUTH_SUCCESS:
    case types.UNLINK_AUTH_SUCCESS:
    case types.DELETE_AUTH_SUCCESS:
    case types.UPDATE_AUTH_SUCCESS:
    case types.BUYRAMBYTES_SUCCESS:
    case types.SELLRAM_SUCCESS:
    case types.BUYRAM_SUCCESS:
    case types.VOTEPRODUCER_SUCCESS:
    case types.UNDELEGATE_SUCCESS:
    case types.DELEGATE_SUCCESS:
    case types.TRANSFER_TOKEN_SUCCESS: {
      return Object.assign({}, state, {
        receipt: action.receipt
      });
    }

    case types.LINK_AUTH_REQUEST:
    case types.UNLINK_AUTH_REQUEST:
    case types.DELETE_AUTH_REQUEST:
    case types.UPDATE_AUTH_REQUEST:
    case types.BUYRAMBYTES_REQUEST:
    case types.SELLRAM_REQUEST:
    case types.BUYRAM_REQUEST:
    case types.VOTEPRODUCER_REQUEST:
    case types.UNDELEGATE_REQUEST:
    case types.DELEGATE_REQUEST:
    case types.TRANSFER_TOKEN_REQUEST: {
      return Object.assign({}, state, {
        context: action.context,
        constructed: false,
        signed: false
      });
    }

    case types.LINK_AUTH_FAILURE:
    case types.UNLINK_AUTH_FAILURE:
    case types.DELETE_AUTH_FAILURE:
    case types.UPDATE_AUTH_FAILURE:
    case types.BUYRAMBYTES_FAILURE:
    case types.SELLRAM_FAILURE:
    case types.BUYRAM_FAILURE:
    case types.VOTEPRODUCER_FAILURE:
    case types.UNDELEGATE_FAILURE:
    case types.DELEGATE_FAILURE:
    case types.TRANSFER_TOKEN_FAILURE: {
      return Object.assign({}, state, {
        err: action.err
      });
    }

    case types.LINK_AUTH_CONSTRUCTED:
    case types.UNLINK_AUTH_CONSTRUCTED:
    case types.DELETE_AUTH_CONSTRUCTED:
    case types.UPDATE_AUTH_CONSTRUCTED:
    case types.SELLRAM_CONSTRUCTED:
    case types.BUYRAMBYTES_CONSTRUCTED:
    case types.BUYRAM_CONSTRUCTED:
    case types.VOTEPRODUCER_CONSTRUCTED:
    case types.UNDELEGATE_CONSTRUCTED:
    case types.DELEGATE_CONSTRUCTED:
    case types.TRANSFER_TOKEN_CONSTRUCTED: {
      return Object.assign({}, state, {
        constructed: action.constructed
      });
    }

    case types.LINK_AUTH_SIGNED:
    case types.UNLINK_AUTH_SIGNED:
    case types.DELETE_AUTH_SIGNED:
    case types.UPDATE_AUTH_SIGNED:
    case types.SELLRAM_SIGNED:
    case types.BUYRAMBYTES_SIGNED:
    case types.BUYRAM_SIGNED:
    case types.VOTEPRODUCER_SIGNED:
    case types.UNDELEGATE_SIGNED:
    case types.DELEGATE_SIGNED:
    case types.TRANSFER_TOKEN_SIGNED: {
      return Object.assign({}, state, {
        signed: action.signed
      });
    }

    default: {
      return state;
    }
  }
}
