// @flow
import * as types from '../actions/types';

const initialState = {
  isBackup: false,
  key: null,
  last_produced_block_time: null,
  owner: null,
  percent: null,
  producer_key: null,
  url: null,
  votes: {},
  list: []
};

export default function producers(state = initialState, action) {
  switch (action.type) {
    case types.GET_PRODUCERS_SUCCESS: {
      return Object.assign({}, state, {
        list: action.payload.list
      });
    }

    case types.GET_ACCOUNTS_FAILURE: {
      return Object.assign({}, state, {
        list: null
      });
    }

    default: {
      return state;
    }
  }
}