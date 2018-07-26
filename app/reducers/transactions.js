// @flow
import * as types from '../actions/types';

const initialState = {
  transfer: { context: null, receipt: null, err: null, contructed: false, signed: false },
  delegate: { context: null, receipt: null, err: null, contructed: false, signed: false },
  undelegate: { context: null, receipt: null, err: null, contructed: false, signed: false }
};

export default function transactions(state = initialState, action) {
  switch (action.type) {
    case types.RESET_TRANSACTIONS_STATE: {
      return Object.assign({}, state, {
        transfer: {
          context: null,
          receipt: null,
          err: null,
          contructed: false,
          signed: false
        },
        delegate: {
          context: null,
          receipt: null,
          err: null,
          contructed: false,
          signed: false
        },
        undelegate: {
          context: null,
          receipt: null,
          err: null,
          contructed: false,
          signed: false
        }
      });
    }

    case types.TRANSFER_TOKEN_SUCCESS: {
      const { transfer } = state;
      transfer.receipt = action.receipt;
      return Object.assign({}, state, {
        transfer
      });
    }

    case types.TRANSFER_TOKEN_REQUEST: {
      const { transfer } = state;
      transfer.context = action.context;
      transfer.constructed = false;
      transfer.signed = false;
      return Object.assign({}, state, {
        transfer
      });
    }
    case types.TRANSFER_TOKEN_FAILURE: {
      const { transfer } = state;
      transfer.err = action.err;
      return Object.assign({}, state, {
        transfer
      });
    }

    case types.DELEGATE_REQUEST: {
      const { delegate } = state;
      delegate.context = action.context;
      delegate.constructed = false;
      delegate.signed = false;
      return Object.assign({}, state, {
        delegate
      });
    }

    case types.DELEGATE_FAILURE: {
      const { delegate } = state;
      delegate.err = action.err;
      return Object.assign({}, state, {
        delegate
      });
    }

    case types.DELEGATE_SUCCESS: {
      const { delegate } = state;
      delegate.receipt = action.receipt;
      return Object.assign({}, state, {
        delegate
      });
    }

    case types.UNDELEGATE_REQUEST: {
      const { undelegate } = state;
      undelegate.context = action.context;
      undelegate.constructed = false;
      undelegate.signed = false;
      return Object.assign({}, state, {
        undelegate
      });
    }

    case types.UNDELEGATE_FAILURE: {
      const { undelegate } = state;
      undelegate.err = action.err;
      return Object.assign({}, state, {
        undelegate
      });
    }

    case types.UNDELEGATE_SUCCESS: {
      const { undelegate } = state;
      undelegate.receipt = action.receipt;
      return Object.assign({}, state, {
        undelegate
      });
    }

    case types.DELEGATE_UNDELEGATE_REQUEST: {
      const { delegate, undelegate } = state;
      delegate.context = action.delegateContext;
      delegate.constructed = false;
      delegate.signed = false;
      undelegate.context = action.undelegateContext;
      undelegate.constructed = false;
      undelegate.signed = false;
      return Object.assign({}, state, {
        delegate,
        undelegate
      });
    }

    case types.TRANSFER_TOKEN_CONSTRUCTED: {
      const { transfer } = state;
      transfer.constructed = action.constructed;
      return Object.assign({}, state, {
        transfer
      });
    }

    case types.DELEGATE_CONSTRUCTED: {
      const { delegate } = state;
      delegate.constructed = action.constructed;
      return Object.assign({}, state, {
        delegate
      });
    }

    case types.UNDELEGATE_CONSTRUCTED: {
      const { undelegate } = state;
      undelegate.constructed = action.constructed;
      return Object.assign({}, state, {
        undelegate
      });
    }

    case types.TRANSFER_TOKEN_SIGNED: {
      const { transfer } = state;
      transfer.signed = action.signed;
      return Object.assign({}, state, {
        transfer
      });
    }

    case types.DELEGATE_SIGNED: {
      const { delegate } = state;
      delegate.signed = action.signed;
      return Object.assign({}, state, {
        delegate
      });
    }

    case types.UNDELEGATE_SIGNED: {
      const { undelegate } = state;
      undelegate.signed = action.signed;
      return Object.assign({}, state, {
        undelegate
      });
    }

    default: {
      return state;
    }
  }
}
