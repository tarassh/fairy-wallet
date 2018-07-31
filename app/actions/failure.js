// @flow
import * as types from './types';

export function reset() {
  return (dispatch: () => void) => {
    dispatch({ type: types.RESET_FAILURE });
  };
}

export default {
  reset
};
