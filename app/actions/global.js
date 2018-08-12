import _ from 'lodash';
import * as types from './types';
import eos from './helpers/eos';
import * as constants from './constants/constants';

export function getGlobal() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_GLOBAL_REQUEST
    });
    const { connection } = getState();
    eos(connection).getTableRows(true, constants.eos.eosio, constants.eos.eosio, constants.eos.global).then((results) => dispatch({
      type: types.GET_GLOBAL_SUCCESS,
      payload: { results }
    })).catch((err) => dispatch({
      type: types.GET_GLOBAL_FAILURE,
      payload: { err },
    }));
  };
}

export default {
  getGlobal
};
