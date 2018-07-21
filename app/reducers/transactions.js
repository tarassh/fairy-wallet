// @flow
import * as types from '../actions/types';

const initialState = {
  transfer: { context: null, receipt: null, err: null },
  delegate: { context: null, receipt: null, err: null },
  undelegate: { context: null, receipt: null, err: null }
};

export default function transactions(state = initialState, action) {
  switch (action.type) {
    case types.RESET_TRANSACTIONS_STATE: {
      return Object.assign({}, state, {
        transfer: { context: null, receipt: null, err: null },
        delegate: { context: null, receipt: null, err: null },
        undelegate: { context: null, receipt: null, err: null }
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
      undelegate.context = action.undelegateContext;
      return Object.assign({}, state, {
        delegate,
        undelegate
      });
    }

    default: {
      return state;
    }
  }
}
