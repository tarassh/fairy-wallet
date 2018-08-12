import * as types from '../actions/types';

const initialState = {
  current: {}
};

export default function global(state = initialState, action) {
  switch (action.type) {
    case types.GET_GLOBAL_SUCCESS: {
      return Object.assign({}, state, {
        current: action.payload.results.rows[0]
      });
    }

    default: {
      return state;
    }
  }
}
